import { api } from "../_generated/api";

// Extract domain from "Name <email@domain.com>" or "email@domain.com"
export function extractDomain(fromHeader: string): string {
  const emailMatch = fromHeader.match(/<([^>]+)>/) || fromHeader.match(/(\S+@\S+)/);
  const email = emailMatch?.[1] || "";
  return email.split("@")[1]?.toLowerCase().replace(/^www\./, "") || "";
}

// Discovery Tier 1: Direct domain match in platforms DB
export async function matchToPlatform(
  ctx: any,
  domain: string
): Promise<{ platformId: string; serviceName: string } | null> {
  const platform = await ctx.runQuery(api.platforms.getByDomain, { domain });
  return platform ? { platformId: platform._id, serviceName: platform.name } : null;
}

// Discovery Tier 2: Regex patterns for common service types
const SERVICE_PATTERNS = [
  { pattern: /receipt|order|purchase|invoice|payment/i, tier: "CHARGING" as const },
  { pattern: /noreply|no-reply|donotreply/i,            tier: "ADMIN"    as const },
  { pattern: /newsletter|unsubscribe/i,                  tier: "ADMIN"    as const },
  { pattern: /bank|credit|loan|account statement/i,      tier: "IDENTITY" as const },
  { pattern: /photo|memory|remember|anniversary/i,       tier: "SENTIMENTAL" as const },
];

export function inferTierFromSubject(subject: string): "CHARGING" | "IDENTITY" | "SENTIMENTAL" | "ADMIN" {
  for (const { pattern, tier } of SERVICE_PATTERNS) {
    if (pattern.test(subject)) return tier;
  }
  return "ADMIN";
}
