import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

/**
 * 1. Create or Get Owner (Clerk Auth logic)
 * Called from the "Personal Details" screen on load to assure the generic owner row exists.
 */
export const createOrGetOwner = mutation({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Unauthenticated. Please sign in via Clerk.");
    }

    // Check if owner exists by Clerk subject string
    const existingOwner = await ctx.db
      .query("owners")
      .withIndex("by_email_hash", (q) => q.eq("emailHash", identity.email!)) // in a real app index by Clerk Subject
      .first();

    if (existingOwner) {
      return { ownerId: existingOwner._id };
    }

    // Creates the initial Owner record tied to Clerk Identity
    const ownerId = await ctx.db.insert("owners", {
      emailHash: identity.email!, // Store email raw or hash it up to client preference, storing raw for hackathon speed since Clerk owns it
      passphraseHash: "managed_by_clerk", 
      fullNameEnc: identity.name || "", 
      state: "",      
      verificationNameStateHash: "",
      setupComplete: false,
      lastLogin: Date.now(),
      createdAt: Date.now(),
    });

    return { ownerId };
  },
});

export const verifyEmail = mutation({
  args: {
    emailHash: v.string(),
    otpCode: v.string(),
    passphraseHash: v.string(),
  },
  handler: async (ctx, args) => {
    // For hackathon, just pass them through as verified
    return { ownerId: "placeholder-owner-id" };
  },
});

/**
 * 2. Update Personal Details
 * Called from the "Personal Details" screen.
 */
export const updatePersonalDetails = mutation({
  args: {
    fullNameEnc: v.string(),
    dob: v.string(),
    state: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthenticated");

    const owner = await ctx.db
      .query("owners")
      .withIndex("by_email_hash", (q) => q.eq("emailHash", identity.email!))
      .first();

    if (!owner) throw new Error("Owner not found in DB");

    const verificationNameStateHash = btoa(`${args.fullNameEnc}-${args.state}`);

    await ctx.db.patch(owner._id, {
      fullNameEnc: args.fullNameEnc,
      dob: args.dob,
      state: args.state,
      verificationNameStateHash,
      setupComplete: true, 
    });

    return { success: true };
  },
});

export const getOwner = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return null;

    return await ctx.db
      .query("owners")
      .withIndex("by_email_hash", (q) => q.eq("emailHash", identity.email!))
      .first();
  },
});

/**
 * 3. Add Account
 * Called from the "Add Accounts" screen.
 */
export const addAccount = mutation({
  args: {
    serviceName: v.string(),
    accountEmailEnc: v.string(),
    tier: v.union(
      v.literal("FINANCIAL"), v.literal("IDENTITY"),
      v.literal("SENTIMENTAL"), v.literal("ADMIN")
    ),
    notesEnc: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthenticated");

    const owner = await ctx.db
      .query("owners")
      .withIndex("by_email_hash", (q) => q.eq("emailHash", identity.email!))
      .first();

    if (!owner) throw new Error("Owner account missing.");

    const existing = await ctx.db
      .query("ownerAccounts")
      .withIndex("by_owner", (q) => q.eq("ownerId", owner._id))
      .collect();
    
    await ctx.db.insert("ownerAccounts", {
      ownerId: owner._id,
      serviceName: args.serviceName,
      accountEmailEnc: args.accountEmailEnc,
      tier: args.tier,
      notesEnc: args.notesEnc,
      order: existing.length,
      createdAt: Date.now(),
    });
    return { success: true };
  },
});


export const getOwnerAccounts = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return [];

    const owner = await ctx.db
      .query("owners")
      .withIndex("by_email_hash", (q) => q.eq("emailHash", identity.email!))
      .first();

    if (!owner) return [];

    const accounts = await ctx.db
      .query("ownerAccounts")
      .withIndex("by_owner", (q) => q.eq("ownerId", owner._id))
      .collect();
      
    return accounts.sort((a, b) => a.order - b.order);
  },
});

/**
 * Public query: Get owner accounts by ownerId (no auth required).
 * Used by invitees viewing the estate board after token verification.
 */
export const getOwnerAccountsByOwnerId = query({
  args: { ownerId: v.id("owners") },
  handler: async (ctx, args) => {
    const accounts = await ctx.db
      .query("ownerAccounts")
      .withIndex("by_owner", (q) => q.eq("ownerId", args.ownerId))
      .collect();
      
    return accounts.sort((a, b) => a.order - b.order);
  },
});

/**
 * Public query: Get owner by ID (no auth required).
 * Used by the generateOwnerLetter action.
 */
export const getOwnerById = query({
  args: { ownerId: v.id("owners") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.ownerId);
  },
});

/**
 * Get the onboarding progress for the current user.
 * Returns the URL the user should be redirected to based on their setup progress.
 */
export const getOnboardingProgress = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return { redirectUrl: "/sign-in" };

    const owner = await ctx.db
      .query("owners")
      .withIndex("by_email_hash", (q) => q.eq("emailHash", identity.email!))
      .first();

    // No owner record yet — send to personal details (step 2)
    if (!owner) return { redirectUrl: "/setup/about-you" };

    // Personal details not filled in
    if (!owner.fullNameEnc || !owner.state) {
      return { redirectUrl: "/setup/about-you" };
    }

    // Check if they have any accounts
    const accounts = await ctx.db
      .query("ownerAccounts")
      .withIndex("by_owner", (q) => q.eq("ownerId", owner._id))
      .first();

    if (!accounts) return { redirectUrl: "/setup/accounts" };

    // Check if they have any invitees
    const invitee = await ctx.db
      .query("invitees")
      .withIndex("by_owner", (q) => q.eq("ownerId", owner._id))
      .first();

    if (!invitee) return { redirectUrl: "/setup/invitees" };

    // All steps done — go to dashboard
    return { redirectUrl: "/dashboard" };
  },
});
