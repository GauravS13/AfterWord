"use client";

import Link from "next/link";
import React from "react";
import { US_STATES } from "../../lib/constants";

// Type for the token validation result
type TokenData =
  | { valid: false; error: string }
  | { valid: true; inviteeName: string; role: string; ownerName: string; ownerId: string; tokenId: string };

export interface VerificationGateProps {
  token?: string;
  tokenData: TokenData;
}

export const VerificationGate: React.FC<VerificationGateProps> = ({ token, tokenData }) => {
  // Error states
  if (!tokenData.valid) {
    const errorMessages: Record<string, { title: string; desc: string }> = {
      INVALID_TOKEN: { title: "Invalid Invitation", desc: "This invitation link is not valid. Please check the link from your email." },
      TOKEN_USED: { title: "Invitation Already Used", desc: "This invitation has already been accepted. If you need a new one, please contact the estate owner." },
      TOKEN_EXPIRED: { title: "Invitation Expired", desc: "This invitation has expired. Please request a new invitation link." },
      INVITEE_NOT_FOUND: { title: "Invitee Not Found", desc: "The invitee record associated with this token could not be found." },
      OWNER_NOT_FOUND: { title: "Estate Not Found", desc: "The estate associated with this invitation could not be found." },
    };
    const err = errorMessages[tokenData.error] || { title: "Error", desc: "Something went wrong." };

    return (
      <div className="font-[system-ui] bg-[#f6f8f8] dark:bg-[#102222] text-slate-900 dark:text-slate-100 antialiased min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md p-8">
          <span className="material-symbols-outlined text-red-400 text-5xl mb-4 block">error</span>
          <h1 className="text-2xl font-bold text-white mb-3">{err.title}</h1>
          <p className="text-slate-400 mb-6">{err.desc}</p>
          <Link href="/" className="px-6 py-3 bg-[#13ecec] hover:bg-[#0fd6d6] text-[#111818] font-bold rounded-lg transition-all">
            Go Home
          </Link>
        </div>
      </div>
    );
  }

  // Extract real data
  const inviteeName = tokenData.inviteeName;
  const ownerName = tokenData.ownerName;
  const role = tokenData.role.replace("_", " ");
  const ownerFirstName = ownerName.split(" ")[0];

  return (
    <div className="font-[system-ui] bg-[#f6f8f8] dark:bg-[#102222] text-slate-900 dark:text-slate-100 antialiased min-h-screen flex flex-col">
      {/* Navbar */}
      <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-slate-200 dark:border-slate-800 px-10 py-4 bg-[#f6f8f8] dark:bg-[#102222] w-full z-10">
        <div className="flex items-center gap-4">
          <div className="size-8 text-[#13ecec]">
            <svg className="w-full h-full" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
              <path d="M13.8261 30.5736C16.7203 29.8826 20.2244 29.4783 24 29.4783C27.7756 29.4783 31.2797 29.8826 34.1739 30.5736C36.9144 31.2278 39.9967 32.7669 41.3563 33.8352L24.8486 7.36089C24.4571 6.73303 23.5429 6.73303 23.1514 7.36089L6.64374 33.8352C8.00331 32.7669 11.0856 31.2278 13.8261 30.5736Z" fill="currentColor"></path>
              <path clipRule="evenodd" d="M39.998 35.764C39.9944 35.7463 39.9875 35.7155 39.9748 35.6706C39.9436 35.5601 39.8949 35.4259 39.8346 35.2825C39.8168 35.2403 39.7989 35.1993 39.7813 35.1602C38.5103 34.2887 35.9788 33.0607 33.7095 32.5189C30.9875 31.8691 27.6413 31.4783 24 31.4783C20.3587 31.4783 17.0125 31.8691 14.2905 32.5189C12.0012 33.0654 9.44505 34.3104 8.18538 35.1832C8.17384 35.2075 8.16216 35.233 8.15052 35.2592C8.09919 35.3751 8.05721 35.4886 8.02977 35.589C8.00356 35.6848 8.00039 35.7333 8.00004 35.7388C8.00004 35.739 8 35.7393 8.00004 35.7388C8.00004 35.7641 8.0104 36.0767 8.68485 36.6314C9.34546 37.1746 10.4222 37.7531 11.9291 38.2772C14.9242 39.319 19.1919 40 24 40C28.8081 40 33.0758 39.319 36.0709 38.2772C37.5778 37.7531 38.6545 37.1746 39.3151 36.6314C39.9006 36.1499 39.9857 35.8511 39.998 35.764ZM4.95178 32.7688L21.4543 6.30267C22.6288 4.4191 25.3712 4.41909 26.5457 6.30267L43.0534 32.777C43.0709 32.8052 43.0878 32.8338 43.104 32.8629L41.3563 33.8352C43.104 32.8629 43.1038 32.8626 43.104 32.8629L43.1051 32.865L43.1065 32.8675L43.1101 32.8739L43.1199 32.8918C43.1276 32.906 43.1377 32.9246 43.1497 32.9473C43.1738 32.9925 43.2062 33.0545 43.244 33.1299C43.319 33.2792 43.4196 33.489 43.5217 33.7317C43.6901 34.1321 44 34.9311 44 35.7391C44 37.4427 43.003 38.7775 41.8558 39.7209C40.6947 40.6757 39.1354 41.4464 37.385 42.0552C33.8654 43.2794 29.133 44 24 44C18.867 44 14.1346 43.2794 10.615 42.0552C8.86463 41.4464 7.30529 40.6757 6.14419 39.7209C4.99695 38.7775 3.99999 37.4427 3.99999 35.7391C3.99999 34.8725 4.29264 34.0922 4.49321 33.6393C4.60375 33.3898 4.71348 33.1804 4.79687 33.0311C4.83898 32.9556 4.87547 32.8935 4.9035 32.8471C4.91754 32.8238 4.92954 32.8043 4.93916 32.7889L4.94662 32.777L4.95178 32.7688ZM35.9868 29.004L24 9.77997L12.0131 29.004C12.4661 28.8609 12.9179 28.7342 13.3617 28.6282C16.4281 27.8961 20.0901 27.4783 24 27.4783C27.9099 27.4783 31.5719 27.8961 34.6383 28.6282C35.082 28.7342 35.5339 28.8609 35.9868 29.004Z" fillRule="evenodd"></path>
            </svg>
          </div>
          <h2 className="text-slate-900 dark:text-slate-100 text-lg font-bold leading-tight tracking-[-0.015em]">Afterword</h2>
        </div>
        <button className="flex items-center gap-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200 transition-colors">
          <span className="material-symbols-outlined text-xl">help</span>
          <span className="text-sm font-medium">Need Help?</span>
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center p-4">
        <div className="w-full max-w-[640px] flex flex-col items-center">
          
          {/* Header Section */}
          <div className="text-center mb-10 w-full animate-fade-in-up">
            <div className="inline-flex items-center justify-center p-3 mb-6 bg-slate-800/50 rounded-full border border-slate-700/50">
              <span className="material-symbols-outlined text-[#13ecec] text-3xl">lock</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-3 tracking-tight">
              {ownerFirstName} set this up for you.
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-lg">
              To protect {ownerFirstName}&apos;s estate, we need to verify your identity.
            </p>
          </div>

          {/* Card Container */}
          <div className="w-full bg-white dark:bg-[#1a2c2c] rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
            
            {/* Identity Section (Top) */}
            <div className="p-6 md:p-8 border-b border-slate-200 dark:border-slate-700/50 bg-slate-50 dark:bg-[#152626]">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
                <h4 className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider">Who are you</h4>
                <div className="hidden md:block h-px flex-grow bg-slate-200 dark:bg-slate-700/50 mx-4"></div>
              </div>
              
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div className="flex-grow w-full">
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Full Name</label>
                  <div className="relative group">
                    <input className="w-full bg-white dark:bg-[#283939] border border-slate-300 dark:border-slate-600 rounded-lg px-4 py-3 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-[#13ecec] focus:border-transparent outline-none cursor-not-allowed opacity-90" readOnly type="text" value={inviteeName} />
                    <span className="material-symbols-outlined absolute right-3 top-3.5 text-[#13ecec]">check_circle</span>
                  </div>
                </div>
                
                <div className="mt-6 sm:mt-0 flex-shrink-0">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-[#13ecec]/10 text-[#13ecec] border border-[#13ecec]/20 tracking-wide uppercase">
                    <span className="material-symbols-outlined text-sm">badge</span>
                    Role: {role}
                  </span>
                </div>
              </div>
            </div>

            {/* Verification Section (Bottom) */}
            <div className="p-6 md:p-8 space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <h4 className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider">About {ownerFirstName}</h4>
                <div className="hidden md:block h-px flex-grow bg-slate-200 dark:bg-slate-700/50 mx-4"></div>
                <div className="text-xs font-medium text-orange-400 dark:text-orange-300 bg-orange-400/10 dark:bg-orange-900/20 px-2 py-1 rounded">
                  5 attempts available
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Legal Name</label>
                  <input className="w-full bg-slate-50 dark:bg-[#111818] border border-slate-300 dark:border-slate-600 rounded-lg px-4 py-3 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#13ecec] focus:border-[#13ecec] outline-none transition-all placeholder:text-slate-400 dark:placeholder:text-slate-500" placeholder={`Enter ${ownerFirstName}'s full legal name`} type="text" />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Date of Passing</label>
                  <div className="relative">
                    <input className="w-full bg-slate-50 dark:bg-[#111818] border border-slate-300 dark:border-slate-600 rounded-lg px-4 py-3 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#13ecec] focus:border-[#13ecec] outline-none transition-all placeholder:text-slate-400 dark:placeholder:text-slate-500 [color-scheme:dark]" type="date" />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">State of Residence</label>
                  <div className="relative">
                    <select defaultValue="" className="w-full bg-slate-50 dark:bg-[#111818] border border-slate-300 dark:border-slate-600 rounded-lg px-4 py-3 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#13ecec] focus:border-[#13ecec] outline-none transition-all appearance-none cursor-pointer">
                      <option disabled value="">Select State</option>
                      {US_STATES.map((st, i) => (
                        <option key={i} value={st.value}>{st.label}</option>
                      ))}
                    </select>
                    <span className="material-symbols-outlined absolute right-3 top-3.5 text-slate-400 pointer-events-none">expand_more</span>
                  </div>
                </div>
              </div>
              
              <div className="pt-4">
                <Link href={`/estate/${tokenData.ownerId}`} className="w-full group relative flex items-center justify-center gap-2 bg-[#13ecec] hover:bg-[#0fd6d6] text-[#111818] text-base font-bold py-4 px-6 rounded-lg transition-all duration-200 transform hover:-translate-y-0.5 shadow-lg shadow-[#13ecec]/20">
                  <span>Verify and access estate</span>
                  <span className="material-symbols-outlined transition-transform group-hover:translate-x-1">arrow_forward</span>
                </Link>
              </div>
            </div>
          </div>
          
          <p className="mt-8 text-center text-sm text-slate-500 dark:text-slate-500 max-w-md">
            This verification is secure and encrypted. <br /> Your information is only used to confirm your authorization.
          </p>
        </div>
      </main>
    </div>
  );
};
