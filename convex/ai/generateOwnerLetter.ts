import { v } from "convex/values";
import { api } from "../_generated/api";
import { action } from "../_generated/server";

const HF_URL = "https://api-inference.huggingface.co/models/Equall/Saul-Instruct-v1";
const MAX_RETRIES = 3;
const RETRY_DELAY_MS = 3000;

const RUFADAA_STATES = [
  "AL","AZ","AR","CA","CO","CT","DE","FL","GA","HI","ID","IL","IN","IA",
  "KS","ME","MD","MI","MN","MO","MT","NE","NV","NH","NJ","NM","NY","NC",
  "ND","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VT","VA","WA",
  "WV","WI","WY","DC"
];

// Map ownerAccount tiers to letter prompt tiers
const TIER_MAP: Record<string, string> = {
  FINANCIAL: "CHARGING",
  IDENTITY: "IDENTITY",
  SENTIMENTAL: "SENTIMENTAL",
  ADMIN: "ADMIN",
};

interface LetterArgs {
  deceasedName: string;
  dateOfDeath: string;
  state: string;
  serviceName: string;
  executorName: string;
  relationship: string;
  rufadaaAdopted: boolean;
}

function buildPrompt(instruction: string): string {
  return `[INST] ${instruction.trim()} [/INST]`;
}

function chargingPrompt(args: LetterArgs): string {
  return buildPrompt(`
You are drafting a formal letter on behalf of an estate executor.

Context:
- Deceased: ${args.deceasedName} — passed away on ${args.dateOfDeath}
- State: ${args.state}
- Service: ${args.serviceName}
- Executor: ${args.executorName}, ${args.relationship}
- RUFADAA adopted in ${args.state}: ${args.rufadaaAdopted ? "Yes" : "No"}

Write a formal estate closure and account cancellation letter. The account is actively billing the estate. Request: (1) immediate cancellation effective the date of death, (2) refund of any charges after the date of death, (3) written confirmation of closure.

Tone: Professional, firm but respectful. No more than 4 paragraphs.
Include: RE line, formal salutation, body, closing. Do NOT include placeholders.
`);
}

function identityPrompt(args: LetterArgs): string {
  return buildPrompt(`
You are drafting a formal letter on behalf of an estate executor.

Context:
- Deceased: ${args.deceasedName} — passed away on ${args.dateOfDeath}
- State: ${args.state}
- Service: ${args.serviceName} (financial/identity account)
- Executor: ${args.executorName}, ${args.relationship}

Write a formal account closure letter. Request: (1) immediate account closure, (2) deletion of all personal data pursuant to applicable privacy law, (3) cessation of all data sharing, (4) written confirmation.

Tone: Formal and assertive. Cite RUFADAA if applicable. No more than 4 paragraphs.
`);
}

function sentimentalPrompt(args: LetterArgs): string {
  return buildPrompt(`
You are drafting a formal letter on behalf of an estate executor.

Context:
- Deceased: ${args.deceasedName} — passed away on ${args.dateOfDeath}
- State: ${args.state}
- Service: ${args.serviceName} (contains personal media/content)
- Executor: ${args.executorName}, ${args.relationship}

Write a formal account closure letter. PRIMARY request: data export/download access before closure — photos, videos, posts, or other content. SECONDARY: account memorialisation or closure per the platform's bereavement policy. Request written confirmation of any data export provided.

Tone: Respectful and human. Acknowledge sentimental value. No more than 4 paragraphs.
`);
}

function adminPrompt(args: LetterArgs): string {
  return buildPrompt(`
You are drafting a formal letter on behalf of an estate executor.

Context:
- Deceased: ${args.deceasedName} — passed away on ${args.dateOfDeath}
- State: ${args.state}
- Service: ${args.serviceName}
- Executor: ${args.executorName}, ${args.relationship}

Write a standard account closure notification letter. Request closure of the account and removal of the deceased from all mailing lists and databases. Request written confirmation.

Tone: Professional, concise. No more than 3 paragraphs.
`);
}

function getFallbackTemplate(tier: string, args: LetterArgs): string {
  const date = new Date().toLocaleDateString("en-US", {
    year: "numeric", month: "long", day: "numeric"
  });

  const tierIntros: Record<string, string> = {
    CHARGING: `I am writing to request the immediate cancellation of ${args.deceasedName}'s account with ${args.serviceName}, effective as of the date of death (${args.dateOfDeath}). This account may still be accruing charges against the estate. I respectfully request: (1) immediate account cancellation, (2) a refund of any charges incurred after the date of death, and (3) written confirmation of closure.`,
    IDENTITY: `I am writing to request the immediate and permanent closure of ${args.deceasedName}'s account with ${args.serviceName}. Given the identity-sensitive nature of this account, I further request: (1) deletion of all personal data pursuant to applicable privacy law, (2) cessation of all data sharing, and (3) written confirmation of both closure and data deletion.`,
    SENTIMENTAL: `I am writing regarding ${args.deceasedName}'s account with ${args.serviceName}. This account may contain personal content of significant sentimental value to the family. I respectfully request: (1) data export or download access for all photos, videos, posts, or content before any closure, (2) account memorialisation or closure per your bereavement policy, and (3) written confirmation.`,
    ADMIN: `I am writing to request the closure of ${args.deceasedName}'s account with ${args.serviceName}. Please process this closure request, remove the deceased from all mailing lists and databases, and provide written confirmation of account closure.`,
  };

  const intro = tierIntros[tier] || tierIntros.ADMIN;
  const rufadaa = args.rufadaaAdopted
    ? `\n\nPlease note that ${args.state} has adopted the Revised Uniform Fiduciary Access to Digital Assets Act (RUFADAA), which grants me, as the estate executor, legal authority to manage the deceased's digital assets.`
    : "";

  return `${date}

Re: Account Closure — Estate of ${args.deceasedName}

Dear Customer Service Team,

I am writing as the ${args.relationship} and executor of the estate of ${args.deceasedName}, who passed away on ${args.dateOfDeath}.

${intro}${rufadaa}

I am prepared to provide documentation including a certified death certificate and letters testamentary upon request. Please direct all correspondence and confirmation to the address below.

Sincerely,

${args.executorName}
Executor, Estate of ${args.deceasedName}`;
}

function cleanOutput(raw: string): string {
  return raw
    .replace(/^\s*(Here is|Here's|Below is|The following is)[^:\n]*[:]\s*/i, "")
    .replace(/\[\/INST\]/g, "")
    .replace(/\[INST\]/g, "")
    .replace(/^(Sure|Certainly|Of course)[,!.][^\n]*\n/i, "")
    .trim();
}

async function callSaul(prompt: string): Promise<string> {
  for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
    const response = await fetch(HF_URL, {
      method: "POST",
      headers: {
        "Authorization":    `Bearer ${process.env.HF_TOKEN}`,
        "Content-Type":     "application/json",
        "x-wait-for-model": "true",
      },
      body: JSON.stringify({
        inputs: prompt,
        parameters: {
          max_new_tokens:   600,
          temperature:      0.3,
          top_p:            0.9,
          return_full_text: false,
        },
      }),
    });

    if (response.status === 429) {
      await new Promise(r => setTimeout(r, RETRY_DELAY_MS * (attempt + 1)));
      continue;
    }

    if (!response.ok) {
      if (attempt === MAX_RETRIES - 1) throw new Error(`HF API error: ${response.status}`);
      await new Promise(r => setTimeout(r, RETRY_DELAY_MS));
      continue;
    }

    const result = await response.json();
    return cleanOutput(result[0]?.generated_text ?? "");
  }
  throw new Error("HF API failed after retries");
}

/**
 * Generate a legal closure letter for an owner's account.
 * Uses the owner's profile data + account info to build a tier-appropriate letter.
 * Falls back to a professional template if HF API is unavailable.
 */
export const generateOwnerLetter = action({
  args: {
    ownerAccountId: v.id("ownerAccounts"),
    ownerId:        v.id("owners"),
  },
  handler: async (ctx, args): Promise<{ success: boolean; alreadyExists: boolean; letterBody: string }> => {
    // Fetch owner + account data
    const owner = await ctx.runQuery(api.owners.getOwnerById, { ownerId: args.ownerId });
    const accounts = await ctx.runQuery(api.owners.getOwnerAccountsByOwnerId, { ownerId: args.ownerId });
    const account = accounts.find((a: any) => a._id === args.ownerAccountId);

    if (!owner || !account) throw new Error("Owner or account not found");

    // Check if letter already exists
    const existing: any = await ctx.runQuery(api.ownerLetters.getByOwnerAccount, {
      ownerAccountId: args.ownerAccountId,
    });
    if (existing) {
      return { success: true, alreadyExists: true, letterBody: existing.bodyEnc };
    }

    // Map owner tiers to letter prompt tiers  
    const promptTier = TIER_MAP[account.tier] || "ADMIN";

    const letterArgs: LetterArgs = {
      deceasedName:   owner.fullNameEnc || "the deceased",
      dateOfDeath:    new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
      state:          owner.state || "CA",
      serviceName:    account.serviceName,
      executorName:   "Estate Executor",
      relationship:   "designated executor",
      rufadaaAdopted: RUFADAA_STATES.includes(owner.state || ""),
    };

    const promptBuilders: Record<string, (args: LetterArgs) => string> = {
      CHARGING:    chargingPrompt,
      IDENTITY:    identityPrompt,
      SENTIMENTAL: sentimentalPrompt,
      ADMIN:       adminPrompt,
    };

    const builder = promptBuilders[promptTier] || adminPrompt;
    const prompt = builder(letterArgs);

    let letterBody: string;
    try {
      letterBody = await callSaul(prompt);
    } catch {
      // Fallback to template if HF is unavailable
      letterBody = getFallbackTemplate(promptTier, letterArgs);
    }

    // Store the letter
    await ctx.runMutation(api.ownerLetters.create, {
      ownerAccountId: args.ownerAccountId,
      ownerId:        args.ownerId,
      body:           letterBody,
      model:          "Equall/Saul-Instruct-v1",
    });

    return { success: true, alreadyExists: false, letterBody };
  },
});
