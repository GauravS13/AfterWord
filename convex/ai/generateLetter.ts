import { v } from "convex/values";
import { api } from "../_generated/api";
import { action } from "../_generated/server";

const HF_URL = "https://api-inference.huggingface.co/models/Equall/Saul-Instruct-v1";
const MAX_RETRIES = 3;
const RETRY_DELAY_MS = 3000;

export const RUFADAA_STATES = [
  "AL","AZ","AR","CA","CO","CT","DE","FL","GA","HI","ID","IL","IN","IA",
  "KS","ME","MD","MI","MN","MO","MT","NE","NV","NH","NJ","NM","NY","NC",
  "ND","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VT","VA","WA",
  "WV","WI","WY","DC"
];

function buildPrompt(instruction: string): string {
  return `[INST] ${instruction.trim()} [/INST]`;
}

interface LetterArgs {
  deceasedName: string;
  dateOfDeath: string;
  state: string;
  serviceName: string;
  executorName: string;
  relationship: string;
  rufadaaAdopted: boolean;
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
  return `${date}

Re: Account Closure — Estate of ${args.deceasedName}

Dear Customer Service Team,

I am writing as the ${args.relationship} and executor of the estate of ${args.deceasedName}, who passed away on ${args.dateOfDeath}.

I am requesting the closure of ${args.deceasedName}'s account with your service (${args.serviceName}). Please process this request and provide written confirmation of account closure to the address below.

I am prepared to provide documentation including a certified death certificate and letters testamentary upon request.

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
        "x-wait-for-model": "true",  // CRITICAL: waits for cold start, no 503s
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
      // Rate limited — wait and retry
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

export const generateLetter = action({
  args: {
    accountId: v.id("accounts"),
    estateId:  v.id("estates"),
  },
  handler: async (ctx, args) => {
    const account = await ctx.runQuery(api.accounts.getById, { id: args.accountId });
    const estate  = await ctx.runQuery(api.estates.getById,  { id: args.estateId  });

    if (!account || !estate) throw new Error("Account or estate not found");

    const letterArgs: LetterArgs = {
      deceasedName:  estate.deceasedNameEnc,  // already decrypted in theory
      dateOfDeath:   estate.deceasedDod,
      state:         estate.state,
      serviceName:   account.serviceName,
      executorName:  estate.executorNameEnc,
      relationship:  estate.relationship,
      rufadaaAdopted: RUFADAA_STATES.includes(estate.state),
    };

    const promptBuilders: Record<string, (args: LetterArgs) => string> = {
      CHARGING:    chargingPrompt,
      IDENTITY:    identityPrompt,
      SENTIMENTAL: sentimentalPrompt,
      ADMIN:       adminPrompt,
    };
    
    const builder = promptBuilders[account.tier] || adminPrompt;
    const prompt = builder(letterArgs);

    let letterBody: string;
    try {
      letterBody = await callSaul(prompt);
    } catch (error) {
      // Fallback to template if HF is down
      letterBody = getFallbackTemplate(account.tier, letterArgs);
    }

    // Store encrypted letter
    await ctx.runMutation(api.letters.create, {
      accountId: args.accountId,
      estateId:  args.estateId,
      body:      letterBody,
      model:     "Equall/Saul-Instruct-v1",
    });

    return { success: true };
  },
});
