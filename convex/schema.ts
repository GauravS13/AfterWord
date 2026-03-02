import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({

  authVerifications: defineTable({
    emailHash: v.string(), // To lookup OTP requests
    otpCodeRaw: v.string(), // Plaintext OTP (usually sent to email, simple for hackathon)
    expiresAt: v.number(),
    verified: v.boolean(),
  }).index("by_emailHash", ["emailHash"]),

  // ── OWNER SIDE ────────────────────────────────────────────────
  owners: defineTable({
    emailHash:                 v.string(),  // SHA-256 — never plaintext
    passphraseHash:            v.string(),  // bcrypt
    fullNameEnc:               v.string(),  // AES-256 encrypted
    dob:                       v.optional(v.string()),  // YYYY-MM-DD
    state:                     v.string(),  // 2-letter state code
    verificationNameStateHash: v.string(),  // hash(name+state) — date added at unlock
    guardianNameEnc:           v.optional(v.string()),
    guardianEmailEnc:          v.optional(v.string()),
    personalMessageEnc:        v.optional(v.string()),
    setupComplete:             v.boolean(),
    lastLogin:                 v.number(),
    createdAt:                 v.number(),
  }).index("by_email_hash", ["emailHash"]),

  ownerAccounts: defineTable({
    ownerId:         v.id("owners"),
    platformId:      v.optional(v.id("platforms")),
    serviceName:     v.string(),
    accountEmailEnc: v.optional(v.string()),
    tier:            v.union(
      v.literal("FINANCIAL"), v.literal("IDENTITY"),
      v.literal("SENTIMENTAL"), v.literal("ADMIN")
    ),
    notesEnc:        v.optional(v.string()),
    order:           v.number(),
    createdAt:       v.number(),
  }).index("by_owner", ["ownerId"]),

  invitees: defineTable({
    ownerId:           v.id("owners"),
    nameEnc:           v.string(),
    emailEnc:          v.string(),
    role:              v.union(
      v.literal("EXECUTOR"), v.literal("CO_EXECUTOR"),
      v.literal("VIEW_ONLY"), v.literal("MEMORIAL")
    ),
    invitationSent:    v.boolean(),
    createdAt:         v.number(),
  }).index("by_owner", ["ownerId"]),

  // ── UNLOCK + INVITE SYSTEM ────────────────────────────────────
  unlockAttempts: defineTable({
    ipHash:             v.string(),
    verificationHash:   v.string(),  // hash(name+date+state) — what was submitted
    matched:            v.boolean(),
    ownerId:            v.optional(v.id("owners")),
    relationship:       v.string(),
    otpSent:            v.boolean(),
    otpCode:            v.optional(v.string()),   // hashed — never plaintext
    otpExpiry:          v.optional(v.number()),
    otpUsed:            v.boolean(),
    otpAttempts:        v.number(),
    createdAt:          v.number(),
  }).index("by_ip", ["ipHash"]).index("by_owner", ["ownerId"]),

  inviteTokens: defineTable({
    ownerId:      v.id("owners"),
    inviteeId:    v.id("invitees"),
    token:        v.string(),  // SHA-256 hashed one-time token
    role:         v.string(),
    used:         v.boolean(),
    expiresAt:    v.number(),  // 30 days from creation
    createdAt:    v.number(),
  }).index("by_token", ["token"]).index("by_owner", ["ownerId"]),

  // ── EXECUTOR SIDE ─────────────────────────────────────────────
  estates: defineTable({
    sessionTokenHash: v.string(),  // SHA-256 of session token
    ownerId:          v.optional(v.id("owners")),  // null = standalone scan
    deceasedNameEnc:  v.string(),
    deceasedDod:      v.string(),
    state:            v.string(),
    executorNameEnc:  v.string(),
    relationship:     v.string(),
    scanStatus:       v.union(
      v.literal("NOT_STARTED"), v.literal("SCANNING"),
      v.literal("COMPLETE"), v.literal("FAILED")
    ),
    gmailTokenEnc:    v.optional(v.string()),  // cleared after scan
    totalAccounts:    v.number(),
    closedAccounts:   v.number(),
    expiresAt:        v.number(),  // 90 days from creation
    createdAt:        v.number(),
  }).index("by_token_hash", ["sessionTokenHash"]),

  accounts: defineTable({
    estateId:          v.id("estates"),
    platformId:        v.optional(v.id("platforms")),
    serviceName:       v.string(),
    tier:              v.union(
      v.literal("CHARGING"), v.literal("IDENTITY"),
      v.literal("SENTIMENTAL"), v.literal("ADMIN")
    ),
    status:            v.union(
      v.literal("TODO"), v.literal("IN_PROGRESS"),
      v.literal("AWAITING"), v.literal("CLOSED")
    ),
    notesEnc:          v.optional(v.string()),  // owner notes (from owner side)
    executorNotesEnc:  v.optional(v.string()),  // executor's own notes
    confirmationNum:   v.optional(v.string()),
    lastBilled:        v.optional(v.string()),
    discoveryMethod:   v.union(
      v.literal("GMAIL_SCAN"), v.literal("MANUAL"),
      v.literal("OWNER_ADDED"), v.literal("MBOX_SCAN")
    ),
    createdAt:         v.number(),
  }).index("by_estate", ["estateId"]).index("by_estate_tier", ["estateId", "tier"]),

  platforms: defineTable({
    name:         v.string(),
    domain:       v.string(),
    category:     v.string(),
    closureUrl:   v.optional(v.string()),
    bereavement:  v.optional(v.string()),
    docsRequired: v.array(v.string()),
    playbook:     v.array(v.object({
      step: v.number(), text: v.string(), url: v.optional(v.string())
    })),
    letterTone:   v.string(),
    avgCloseDays: v.optional(v.number()),
    lastVerified: v.string(),
  }).index("by_domain", ["domain"]).index("by_category", ["category"]),

  letters: defineTable({
    accountId:   v.id("accounts"),
    estateId:    v.id("estates"),
    bodyEnc:     v.string(),  // encrypted letter text
    model:       v.string(),  // e.g. "Equall/Saul-Instruct-v1"
    reviewed:    v.boolean(),
    sentAt:      v.optional(v.number()),
    createdAt:   v.number(),
  }).index("by_account", ["accountId"]),

  ownerLetters: defineTable({
    ownerAccountId: v.id("ownerAccounts"),
    ownerId:        v.id("owners"),
    bodyEnc:        v.string(),
    model:          v.string(),
    reviewed:       v.boolean(),
    createdAt:      v.number(),
  }).index("by_ownerAccount", ["ownerAccountId"]).index("by_owner", ["ownerId"]),

  statusUpdates: defineTable({
    accountId:   v.id("accounts"),
    estateId:    v.id("estates"),
    fromStatus:  v.string(),
    toStatus:    v.string(),
    note:        v.optional(v.string()),
    createdAt:   v.number(),
  }).index("by_account", ["accountId"]),
});
