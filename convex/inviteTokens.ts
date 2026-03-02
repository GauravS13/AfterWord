import { v } from "convex/values";
import CryptoJS from "crypto-js";
import { query } from "./_generated/server";

/**
 * Look up an invite token and return the invitee + owner info.
 * The raw token from the URL is hashed with SHA-256 and matched
 * against the inviteTokens table.
 */
export const validateInviteToken = query({
  args: { rawToken: v.string() },
  handler: async (ctx, args) => {
    const tokenHash = CryptoJS.SHA256(args.rawToken).toString(CryptoJS.enc.Hex);

    const tokenRecord = await ctx.db
      .query("inviteTokens")
      .withIndex("by_token", (q) => q.eq("token", tokenHash))
      .first();

    if (!tokenRecord) {
      return { valid: false, error: "INVALID_TOKEN" } as const;
    }

    if (tokenRecord.used) {
      return { valid: false, error: "TOKEN_USED" } as const;
    }

    if (tokenRecord.expiresAt < Date.now()) {
      return { valid: false, error: "TOKEN_EXPIRED" } as const;
    }

    // Fetch invitee record
    const invitee = await ctx.db.get(tokenRecord.inviteeId);
    if (!invitee) {
      return { valid: false, error: "INVITEE_NOT_FOUND" } as const;
    }

    // Fetch owner record
    const owner = await ctx.db.get(tokenRecord.ownerId);
    if (!owner) {
      return { valid: false, error: "OWNER_NOT_FOUND" } as const;
    }

    return {
      valid: true,
      inviteeName: invitee.nameEnc,   // encrypted name (displayed as-is for hackathon)
      role: invitee.role,
      ownerName: owner.fullNameEnc,    // encrypted name (displayed as-is for hackathon)
      ownerId: owner._id,
      tokenId: tokenRecord._id,
    } as const;
  },
});
