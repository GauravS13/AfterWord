import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const create = mutation({
  args: {
    accountId: v.id("accounts"),
    estateId: v.id("estates"),
    body: v.string(),
    model: v.string()
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("letters", {
      accountId: args.accountId,
      estateId: args.estateId,
      bodyEnc: args.body, // In a real app we would encrypt this here
      model: args.model,
      reviewed: false,
      createdAt: Date.now()
    });
  }
});

export const listAll = query({
  args: { estateId: v.id("estates") },
  handler: async (ctx, args) => {
    return await ctx.db.query("letters").filter(q => q.eq(q.field("estateId"), args.estateId)).collect();
  }
});
