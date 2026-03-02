import { v } from "convex/values";
import CryptoJS from "crypto-js";
import { v4 as uuidv4 } from "uuid";
import { api } from "./_generated/api";
import { mutation, query } from "./_generated/server";

export const addInvitee = mutation({
  args: {
    nameEnc: v.string(),
    emailEnc: v.string(),
    role: v.union(
      v.literal("EXECUTOR"), v.literal("CO_EXECUTOR"),
      v.literal("VIEW_ONLY"), v.literal("MEMORIAL")
    ),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthenticated");

    const owner = await ctx.db
      .query("owners")
      .withIndex("by_email_hash", (q) => q.eq("emailHash", identity.email!))
      .first();

    if (!owner) throw new Error("Owner not found");

    const id = await ctx.db.insert("invitees", {
      ownerId: owner._id,
      nameEnc: args.nameEnc,
      emailEnc: args.emailEnc,
      role: args.role,
      invitationSent: false,
      createdAt: Date.now(),
    });

    // Generate a secure, URL-safe random token
    const rawToken = uuidv4() + uuidv4().replace(/-/g, "");
    const tokenHash = CryptoJS.SHA256(rawToken).toString(CryptoJS.enc.Hex);

    // Save token securely with expiration 30 days from now
    await ctx.db.insert("inviteTokens", {
      ownerId: owner._id,
      inviteeId: id,
      token: tokenHash,
      role: args.role,
      used: false,
      expiresAt: Date.now() + 30 * 24 * 60 * 60 * 1000, 
      createdAt: Date.now(),
    });

    // Schedule email sending action
    await ctx.scheduler.runAfter(0, (api as any).emails.sendInvitationEmail, {
      inviteeId: id,
      nameEnc: args.nameEnc,
      email: args.emailEnc, // In a real system, you would decrypt this before sending. For the hackathon, we assume plain text is passed for testing purposes, or we send a generic email without revealing it.
      role: args.role,
      rawToken: rawToken,
    });

    return { id };
  },
});

export const getOwnerInvitees = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return [];

    const owner = await ctx.db
      .query("owners")
      .withIndex("by_email_hash", (q) => q.eq("emailHash", identity.email!))
      .first();

    if (!owner) return [];

    return await ctx.db
      .query("invitees")
      .withIndex("by_owner", (q) => q.eq("ownerId", owner._id))
      .collect();
  },
});

export const deleteInvitee = mutation({
  args: { inviteeId: v.id("invitees") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthenticated");

    const invitee = await ctx.db.get(args.inviteeId);
    if (!invitee) throw new Error("Invitee not found");

    // Delete associated invite tokens
    const tokens = await ctx.db
      .query("inviteTokens")
      .withIndex("by_owner", (q) => q.eq("ownerId", invitee.ownerId))
      .collect();
    
    for (const token of tokens) {
      if (token.inviteeId === args.inviteeId) {
        await ctx.db.delete(token._id);
      }
    }

    // Delete the invitee
    await ctx.db.delete(args.inviteeId);
    return { success: true };
  },
});
