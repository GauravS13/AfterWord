import { internalMutation } from "./_generated/server";

export const resetDemo = internalMutation({
  args: {},
  handler: async (ctx) => {
    // Demo reset logic
    console.log("Resetting demo estate");
  },
});
