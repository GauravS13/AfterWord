import { v } from "convex/values";
import { internalMutation, mutation, query } from "./_generated/server";

export const getById = query({
  args: { id: v.id("estates") },
  handler: async (ctx, args) => {
    const estate = await ctx.db.get(args.id);
    if (!estate) throw new Error("Estate not found");
    return estate;
  },
});

export const updateScanStatus = mutation({
  args: { id: v.id("estates"), status: v.union(v.literal("NOT_STARTED"), v.literal("SCANNING"), v.literal("COMPLETE"), v.literal("FAILED")) },
  handler: async (ctx, args) => {
    return await ctx.db.patch(args.id, { scanStatus: args.status });
  }
});

export const clearGmailToken = mutation({
  args: { id: v.id("estates") },
  handler: async (ctx, args) => {
    return await ctx.db.patch(args.id, { gmailTokenEnc: undefined });
  }
});

export const updateScanProgress = mutation({
  args: { id: v.id("estates"), scannedCount: v.number() },
  handler: async (ctx, args) => {
    // We could store scannedCount on estate, but for now we just log
    console.log(`Estate ${args.id} scanned ${args.scannedCount} messages`);
  }
});

export const deleteExpired = internalMutation({
  args: {},
  handler: async (ctx) => {
    const now = Date.now();
    const expired = await ctx.db.query("estates").filter(q => q.lt(q.field("expiresAt"), now)).collect();
    for (const estate of expired) {
      // Cascade deletions would go here
      await ctx.db.delete(estate._id);
    }
  }
});
