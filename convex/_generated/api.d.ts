/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type * as accounts from "../accounts.js";
import type * as ai_generateLetter from "../ai/generateLetter.js";
import type * as ai_generateOwnerLetter from "../ai/generateOwnerLetter.js";
import type * as ai_letterPdf from "../ai/letterPdf.js";
import type * as crons from "../crons.js";
import type * as discovery_gmailScan from "../discovery/gmailScan.js";
import type * as discovery_patterns from "../discovery/patterns.js";
import type * as emailHelpers from "../emailHelpers.js";
import type * as emails from "../emails.js";
import type * as estates from "../estates.js";
import type * as export_evidenceBundle from "../export/evidenceBundle.js";
import type * as export_generateBundle from "../export/generateBundle.js";
import type * as inviteTokens from "../inviteTokens.js";
import type * as invitees from "../invitees.js";
import type * as letters from "../letters.js";
import type * as ownerLetters from "../ownerLetters.js";
import type * as owners from "../owners.js";
import type * as platforms from "../platforms.js";
import type * as scripts from "../scripts.js";

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";

declare const fullApi: ApiFromModules<{
  accounts: typeof accounts;
  "ai/generateLetter": typeof ai_generateLetter;
  "ai/generateOwnerLetter": typeof ai_generateOwnerLetter;
  "ai/letterPdf": typeof ai_letterPdf;
  crons: typeof crons;
  "discovery/gmailScan": typeof discovery_gmailScan;
  "discovery/patterns": typeof discovery_patterns;
  emailHelpers: typeof emailHelpers;
  emails: typeof emails;
  estates: typeof estates;
  "export/evidenceBundle": typeof export_evidenceBundle;
  "export/generateBundle": typeof export_generateBundle;
  inviteTokens: typeof inviteTokens;
  invitees: typeof invitees;
  letters: typeof letters;
  ownerLetters: typeof ownerLetters;
  owners: typeof owners;
  platforms: typeof platforms;
  scripts: typeof scripts;
}>;

/**
 * A utility for referencing Convex functions in your app's public API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;

/**
 * A utility for referencing Convex functions in your app's internal API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = internal.myModule.myFunction;
 * ```
 */
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;

export declare const components: {};
