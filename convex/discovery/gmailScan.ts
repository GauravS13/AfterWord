import { v } from "convex/values";
import { api } from "../_generated/api";
import { action } from "../_generated/server";
import { extractDomain, inferTierFromSubject, matchToPlatform } from "./patterns";

const GMAIL_API = "https://www.googleapis.com/gmail/v1";
const BATCH_SIZE = 100;  // Gmail API max per page

async function listMessageIds(accessToken: string): Promise<string[]> {
  const ids: string[] = [];
  let pageToken: string | undefined;

  do {
    const params = new URLSearchParams({
      maxResults: String(BATCH_SIZE),
      ...(pageToken ? { pageToken } : {}),
    });

    const res = await fetch(`${GMAIL_API}/users/me/messages?${params}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    if (!res.ok) break;
    const data = await res.json();
    ids.push(...(data.messages || []).map((m: any) => m.id));
    pageToken = data.nextPageToken;
  } while (pageToken && ids.length < 5000);  // Cap at 5000 messages

  return ids;
}

async function getMessageMetadata(accessToken: string, messageId: string) {
  const res = await fetch(
    `${GMAIL_API}/users/me/messages/${messageId}?format=metadata&metadataHeaders=From&metadataHeaders=Subject&metadataHeaders=Date`,
    { headers: { Authorization: `Bearer ${accessToken}` } }
  );
  if (!res.ok) return null;
  const data = await res.json();

  // Extract headers
  const headers = data.payload?.headers || [];
  const get = (name: string) =>
    headers.find((h: any) => h.name.toLowerCase() === name.toLowerCase())?.value || "";

  return {
    id:      data.id,
    from:    get("From"),
    subject: get("Subject"),
    date:    get("Date"),
  };
}

export async function revokeGmailToken(token: string): Promise<void> {
  await fetch(`https://oauth2.googleapis.com/revoke?token=${token}`, {
    method: "POST",
  });
}

export const scanInbox = action({
  args: {
    estateId:    v.id("estates"),
    accessToken: v.string(),
  },
  handler: async (ctx, args) => {
    try {
      // Update scan status
      await ctx.runMutation(api.estates.updateScanStatus, {
        id: args.estateId, status: "SCANNING"
      });

      const messageIds = await listMessageIds(args.accessToken);
      const discovered = new Map<string, { count: number; subjects: string[]; tier: string }>();

      // Process in batches of 20 (avoid rate limits)
      for (let i = 0; i < Math.min(messageIds.length, 2000); i += 20) {
        const batch = messageIds.slice(i, i + 20);
        const messages = await Promise.all(
          batch.map(id => getMessageMetadata(args.accessToken, id))
        );

        for (const msg of messages) {
          if (!msg) continue;
          const domain = extractDomain(msg.from);
          if (!domain || domain.includes("google.com")) continue;

          if (!discovered.has(domain)) {
            discovered.set(domain, { count: 0, subjects: [], tier: "ADMIN" });
          }
          const entry = discovered.get(domain)!;
          entry.count++;
          entry.subjects.push(msg.subject);
          entry.tier = inferTierFromSubject(msg.subject);
        }

        // Update progress after each batch
        await ctx.runMutation(api.estates.updateScanProgress, {
          id: args.estateId, scannedCount: i + 20
        });
      }

      // Match domains to platforms + create account records
      for (const [domain, data] of discovered.entries()) {
        if (data.count < 2) continue;  // Skip one-off emails

        const platform = await matchToPlatform(ctx, domain);
        await ctx.runMutation(api.accounts.create, {
          estateId:        args.estateId,
          serviceName:     platform?.serviceName || domain,
          platformId:      platform?.platformId as any,
          tier:            data.tier as any,
          discoveryMethod: "GMAIL_SCAN",
        });
      }

      // Revoke token immediately
      await revokeGmailToken(args.accessToken);
      await ctx.runMutation(api.estates.clearGmailToken, { id: args.estateId });
      await ctx.runMutation(api.estates.updateScanStatus, {
        id: args.estateId, status: "COMPLETE"
      });

    } catch (error) {
      await revokeGmailToken(args.accessToken).catch(() => {});
      await ctx.runMutation(api.estates.updateScanStatus, {
        id: args.estateId, status: "FAILED"
      });
      throw error;
    }
  },
});
