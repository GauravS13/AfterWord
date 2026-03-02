import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getById = query({
  args: { id: v.id("accounts") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  }
});

export const listByTier = query({
  args: { estateId: v.id("estates") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("accounts")
      .withIndex("by_estate", q => q.eq("estateId", args.estateId))
      .order("asc")
      .collect();
  },
});

export const listAll = query({
  args: { estateId: v.id("estates") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("accounts")
      .withIndex("by_estate", q => q.eq("estateId", args.estateId))
      .collect();
  }
});

export const updateStatus = mutation({
  args: {
    accountId: v.id("accounts"),
    status:    v.union(v.literal("TODO"), v.literal("IN_PROGRESS"),
                       v.literal("AWAITING"), v.literal("CLOSED")),
  },
  handler: async (ctx, args) => {
    const account = await ctx.db.get(args.accountId);
    if (!account) throw new Error("Account not found");

    // Log the change
    await ctx.db.insert("statusUpdates", {
      accountId:  args.accountId,
      estateId:   account.estateId,
      fromStatus: account.status,
      toStatus:   args.status,
      createdAt:  Date.now(),
    });

    return await ctx.db.patch(args.accountId, { status: args.status });
  },
});

export const create = mutation({
  args: {
    estateId: v.id("estates"),
    serviceName: v.string(),
    platformId: v.optional(v.id("platforms")),
    tier: v.union(v.literal("CHARGING"), v.literal("IDENTITY"), v.literal("SENTIMENTAL"), v.literal("ADMIN")),
    discoveryMethod: v.union(v.literal("GMAIL_SCAN"), v.literal("MANUAL"), v.literal("OWNER_ADDED"), v.literal("MBOX_SCAN")),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("accounts", {
      ...args,
      status: "TODO",
      createdAt: Date.now()
    });
  }
});
