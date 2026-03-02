import { v } from "convex/values";
import { api } from "../_generated/api";
import { action } from "../_generated/server";
import { generateEvidenceBundle } from "./evidenceBundle";

export const generateBundle = action({
  args: { estateId: v.id("estates") },
  handler: async (ctx, args): Promise<string> => {
    // Fetch all data
    const estate   = await ctx.runQuery(api.estates.getById,    { id: args.estateId });
    const accounts = await ctx.runQuery(api.accounts.listAll,   { estateId: args.estateId });
    const letters  = await ctx.runQuery(api.letters.listAll,    { estateId: args.estateId });

    if (!estate) throw new Error("Estate not found");

    // Generate PDF
    const pdfBytes = await generateEvidenceBundle({
      deceasedName:  estate.deceasedNameEnc,  // pre-decrypted in future versions
      executorName:  estate.executorNameEnc,
      state:         estate.state,
      accounts,
      letters,
      dateGenerated: new Date().toLocaleDateString("en-US", { dateStyle: "long" }),
    });

    // Convert to base64 for transport to client
    return Buffer.from(pdfBytes).toString("base64");
  },
});
