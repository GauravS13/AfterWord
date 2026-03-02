import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const create = mutation({
  args: {
    ownerAccountId: v.id("ownerAccounts"),
    ownerId: v.id("owners"),
    body: v.string(),
    model: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("ownerLetters", {
      ownerAccountId: args.ownerAccountId,
      ownerId: args.ownerId,
      bodyEnc: args.body,
      model: args.model,
      reviewed: false,
      createdAt: Date.now(),
    });
  },
});

export const getByOwnerAccount = query({
  args: { ownerAccountId: v.id("ownerAccounts") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("ownerLetters")
      .withIndex("by_ownerAccount", (q) => q.eq("ownerAccountId", args.ownerAccountId))
      .first();
  },
});

export const listByOwner = query({
  args: { ownerId: v.id("owners") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("ownerLetters")
      .withIndex("by_owner", (q) => q.eq("ownerId", args.ownerId))
      .collect();
  },
});
