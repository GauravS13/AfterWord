import { v } from "convex/values";
import { query } from "./_generated/server";

export const getByDomain = query({
  args: { domain: v.string() },
  handler: async (ctx, args) => {
    const platform = await ctx.db.query("platforms").withIndex("by_domain", q => q.eq("domain", args.domain)).first();
    return platform;
  },
});

export const getById = query({
  args: { id: v.id("platforms") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  }
});
