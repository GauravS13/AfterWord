import { v } from "convex/values";
import { internalMutation } from "./_generated/server";

export const markInvitationSent = internalMutation({
  args: {
    inviteeId: v.id("invitees"),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.inviteeId, {
      invitationSent: true,
    });
  },
});
