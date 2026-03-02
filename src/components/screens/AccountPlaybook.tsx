"use client";

import Link from "next/link";
import React from "react";
import { ACCOUNT_PLAYBOOK_DATA } from "../../data/mockData";

export interface AccountPlaybookProps {
  id?: string;
  accountId?: string;
}

export const AccountPlaybook: React.FC<AccountPlaybookProps> = ({ /* id, accountId */ }) => {
  return (
    <div className="bg-[#f6f8f8] dark:bg-[#102222] font-[system-ui] min-h-screen flex flex-col overflow-x-hidden text-slate-900 dark:text-slate-100 antialiased selection:bg-[#13ecec] selection:text-[#102222]">
      {/* Top Navigation */}
      <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-slate-200 dark:border-[#283939] px-6 py-3 bg-white dark:bg-[#111818]">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-4">
            <div className="size-8 text-[#13ecec] flex items-center justify-center">
              <svg className="w-full h-full" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <path d="M36.7273 44C33.9891 44 31.6043 39.8386 30.3636 33.69C29.123 39.8386 26.7382 44 24 44C21.2618 44 18.877 39.8386 17.6364 33.69C16.3957 39.8386 14.0109 44 11.2727 44C7.25611 44 4 35.0457 4 24C4 12.9543 7.25611 4 11.2727 4C14.0109 4 16.3957 8.16144 17.6364 14.31C18.877 8.16144 21.2618 4 24 4C26.7382 4 29.123 8.16144 30.3636 14.31C31.6043 8.16144 33.9891 4 36.7273 4C40.7439 4 44 12.9543 44 24C44 35.0457 40.7439 44 36.7273 44Z" fill="currentColor"></path>
              </svg>
            </div>
            <h2 className="text-slate-900 dark:text-white text-lg font-bold leading-tight tracking-tight">{ACCOUNT_PLAYBOOK_DATA.header.logoText}</h2>
          </div>
          <nav className="hidden md:flex items-center gap-9">
            {ACCOUNT_PLAYBOOK_DATA.header.nav.map((item, i) => (
              <a key={i} className="text-slate-600 dark:text-[#9db9b9] hover:text-[#13ecec] text-sm font-medium transition-colors" href="#">{item}</a>
            ))}
          </nav>
        </div>
        <div className="flex flex-1 justify-end gap-6 items-center">
          <label className="hidden sm:flex flex-col min-w-40 h-10 max-w-64 relative group">
            <div className="flex w-full flex-1 items-stretch rounded-lg h-full border border-slate-200 dark:border-[#283939] bg-slate-50 dark:bg-[#1c2727] group-focus-within:border-[#13ecec]">
              <div className="text-slate-400 dark:text-[#9db9b9] flex items-center justify-center pl-3">
                <span className="material-symbols-outlined text-[20px]">search</span>
              </div>
              <input className="w-full bg-transparent border-none text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-[#9db9b9] focus:ring-0 text-sm font-normal py-0" placeholder={ACCOUNT_PLAYBOOK_DATA.header.searchPlaceholder} />
            </div>
          </label>
          <button className="bg-center bg-no-repeat bg-cover rounded-full size-10 border border-slate-200 dark:border-[#283939]" style={{backgroundImage: `url("${ACCOUNT_PLAYBOOK_DATA.header.avatarUrl}")`}}></button>
        </div>
      </header>

      {/* Main Content Container */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-8 py-6">
        
        {/* Breadcrumbs & Header */}
        <div className="flex flex-col gap-6 mb-8">
          <div className="flex flex-wrap gap-2 items-center text-sm">
            {ACCOUNT_PLAYBOOK_DATA.breadcrumbs.map((crumb, idx) => (
              <React.Fragment key={idx}>
                {crumb.active ? (
                  <span className="text-slate-900 dark:text-white font-semibold">{crumb.label}</span>
                ) : (
                  <Link href={crumb.href} className="text-slate-500 dark:text-[#9db9b9] font-medium hover:text-[#13ecec] transition-colors">{crumb.label}</Link>
                )}
                {idx < ACCOUNT_PLAYBOOK_DATA.breadcrumbs.length - 1 && (
                  <span className="text-slate-400 dark:text-[#586e6e] material-symbols-outlined text-[16px]">chevron_right</span>
                )}
              </React.Fragment>
            ))}
          </div>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pb-6 border-b border-slate-200 dark:border-[#283939]">
            <div className="flex items-center gap-5">
              <div className="size-16 rounded-xl bg-white dark:bg-[#1c2727] p-2 flex items-center justify-center shadow-sm border border-slate-200 dark:border-[#3b5454]">
                <div className="w-full h-full bg-contain bg-center bg-no-repeat" style={{backgroundImage: `url('${ACCOUNT_PLAYBOOK_DATA.titleSection.serviceLogoUrl}')`}}></div>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight mb-1">{ACCOUNT_PLAYBOOK_DATA.titleSection.serviceName}</h1>
                <div className="flex items-center gap-3">
                  <span className="bg-[#13ecec]/10 text-[#13ecec] border border-[#13ecec]/20 px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wider">{ACCOUNT_PLAYBOOK_DATA.titleSection.tier}</span>
                  <span className="text-slate-500 dark:text-[#9db9b9] text-sm">{ACCOUNT_PLAYBOOK_DATA.titleSection.id}</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-slate-500 dark:text-[#9db9b9]">Status:</span>
              <div className="relative inline-flex items-center">
                <select defaultValue={ACCOUNT_PLAYBOOK_DATA.titleSection.statusDefault} className="appearance-none bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20 hover:border-green-500/40 pr-8 pl-3 py-1.5 rounded-lg text-sm font-semibold cursor-pointer focus:outline-none focus:ring-2 focus:ring-green-500/50">
                  {ACCOUNT_PLAYBOOK_DATA.titleSection.statusOptions.map((opt, i) => (
                    <option key={i}>{opt}</option>
                  ))}
                </select>
                <span className="material-symbols-outlined absolute right-2 pointer-events-none text-green-600 dark:text-green-400 text-[18px]">expand_more</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Facts */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {ACCOUNT_PLAYBOOK_DATA.quickFacts.map((fact, i) => (
            <div key={i} className="flex flex-col gap-1 p-4 rounded-xl bg-white dark:bg-[#1c2727] border border-slate-200 dark:border-[#283939]">
              <div className="flex items-center gap-2 mb-1">
                <span className={`material-symbols-outlined text-[20px] ${fact.iconColor || 'text-slate-400 dark:text-[#9db9b9]'}`}>{fact.icon}</span>
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-[#9db9b9]">{fact.label}</span>
              </div>
              <p className="text-lg font-bold text-slate-900 dark:text-white">{fact.value}</p>
            </div>
          ))}
        </div>

        {/* Main Layout Split */}
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Left Column: Playbook (60%) */}
          <div className="flex-1 lg:basis-3/5 flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span className="material-symbols-outlined text-[#13ecec]">list_alt</span>
                {ACCOUNT_PLAYBOOK_DATA.playbook.title}
              </h2>
              <span className="text-sm font-medium text-slate-500 dark:text-[#9db9b9]">{ACCOUNT_PLAYBOOK_DATA.playbook.progressText}</span>
            </div>
            
            {/* Progress Bar */}
            <div className="w-full bg-slate-200 dark:bg-[#283939] rounded-full h-1.5 overflow-hidden">
              <div className="bg-[#13ecec] h-1.5 rounded-full" style={{ width: ACCOUNT_PLAYBOOK_DATA.playbook.progressPercent }}></div>
            </div>
            
            <div className="space-y-4">
              {ACCOUNT_PLAYBOOK_DATA.playbook.steps.map((step, i) => {
                if (step.status === "done") {
                  return (
                    <div key={i} className="group relative flex gap-4 p-5 rounded-xl bg-slate-50 dark:bg-[#162020] border border-slate-200 dark:border-[#283939] opacity-60">
                      <div className="flex-none">
                        <div className="size-8 rounded-full bg-[#13ecec]/20 text-[#13ecec] flex items-center justify-center border border-[#13ecec]/30">
                          <span className="material-symbols-outlined text-[18px]">check</span>
                        </div>
                      </div>
                      <div className="flex-1 flex flex-col">
                        <h3 className="text-base font-semibold text-slate-900 dark:text-white line-through decoration-slate-400 dark:decoration-slate-500">{step.title}</h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 line-through">{step.desc}</p>
                      </div>
                    </div>
                  );
                } else if (step.status === "active") {
                  return (
                    <div key={i} className="group relative flex gap-4 p-5 rounded-xl bg-white dark:bg-[#1c2727] border border-[#13ecec] shadow-[0_0_15px_rgba(19,236,236,0.1)]">
                      <div className="flex-none">
                        <div className="size-8 rounded-full bg-[#13ecec] text-[#102222] flex items-center justify-center font-bold text-sm shadow-md">{step.num}</div>
                      </div>
                      <div className="flex-1 flex flex-col gap-3">
                        <div>
                          <h3 className="text-lg font-bold text-slate-900 dark:text-white">{step.title}</h3>
                          <p className="text-sm text-slate-600 dark:text-[#9db9b9] mt-1">{step.desc}</p>
                        </div>
                        {step.fileLink && (
                          <div className="bg-slate-50 dark:bg-[#162020] rounded-lg p-3 border border-slate-200 dark:border-[#283939] flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <span className="material-symbols-outlined text-slate-400 dark:text-[#586e6e]">folder_zip</span>
                              <div className="flex flex-col">
                                <span className="text-sm font-medium text-slate-900 dark:text-white">{step.fileLink.name}</span>
                                <span className="text-xs text-slate-500 dark:text-[#586e6e]">{step.fileLink.meta}</span>
                              </div>
                            </div>
                            <button className="text-[#13ecec] hover:text-[#13ecec]/80 font-semibold text-sm">Download</button>
                          </div>
                        )}
                        <label className="flex items-center gap-3 mt-2 cursor-pointer group/check">
                          <input className="form-checkbox size-5 rounded border-slate-300 dark:border-[#3b5454] bg-white dark:bg-[#111818] text-[#13ecec] focus:ring-[#13ecec] focus:ring-offset-0" type="checkbox" />
                          <span className="text-sm font-medium text-slate-700 dark:text-slate-200 group-hover/check:text-[#13ecec] transition-colors hover:cursor-pointer">Mark as completed</span>
                        </label>
                      </div>
                    </div>
                  );
                } else {
                  return (
                    <div key={i} className="group relative flex gap-4 p-5 rounded-xl bg-white dark:bg-[#1c2727] border border-slate-200 dark:border-[#283939]">
                      <div className="flex-none">
                        <div className="size-8 rounded-full border-2 border-slate-300 dark:border-[#3b5454] text-slate-400 dark:text-[#586e6e] flex items-center justify-center font-bold text-sm">{step.num}</div>
                      </div>
                      <div className="flex-1 flex flex-col">
                        <h3 className="text-base font-semibold text-slate-700 dark:text-slate-300">{step.title}</h3>
                        <p className="text-sm text-slate-500 dark:text-[#9db9b9] mt-1">{step.desc}</p>
                        {step.num === 4 && (
                          <Link href={ACCOUNT_PLAYBOOK_DATA.playbook.nextHref} className="self-start mt-4 bg-[#13ecec] hover:bg-[#0fd6d6] text-[#102222] text-sm font-bold py-2 px-4 rounded transition-colors uppercase tracking-wide">Generate Letter</Link>
                        )}
                      </div>
                    </div>
                  );
                }
              })}
            </div>
          </div>

          {/* Right Column: Context & Letter (40%) */}
          <div className="flex-1 lg:basis-2/5 flex flex-col gap-6">
            
            {/* Owner's Note */}
            <div className="relative overflow-hidden rounded-xl bg-[#1c2727] border-l-4 border-l-[#13ecec] shadow-lg p-6">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <span className="material-symbols-outlined text-white text-[120px]">format_quote</span>
              </div>
              <div className="relative z-10 flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <div className="size-10 rounded-full bg-cover bg-center border-2 border-[#13ecec]" style={{backgroundImage: `url("${ACCOUNT_PLAYBOOK_DATA.ownerNote.avatarUrl}")`}}></div>
                  <div>
                    <p className="text-white text-base font-bold leading-tight">{ACCOUNT_PLAYBOOK_DATA.ownerNote.title}</p>
                    <p className="text-[#13ecec]/80 text-xs font-medium uppercase tracking-wider">{ACCOUNT_PLAYBOOK_DATA.ownerNote.subtitle}</p>
                  </div>
                </div>
                <div className="bg-black/20 rounded-lg p-4 backdrop-blur-sm">
                  <p className="text-slate-200 text-sm leading-relaxed italic">
                    {ACCOUNT_PLAYBOOK_DATA.ownerNote.content}
                  </p>
                </div>
              </div>
            </div>

            {/* Documents Needed */}
            <div className="rounded-xl bg-amber-500/10 border border-amber-500/30 p-5">
              <h3 className="text-amber-500 dark:text-amber-400 font-bold flex items-center gap-2 mb-3">
                <span className="material-symbols-outlined">folder_open</span>
                {ACCOUNT_PLAYBOOK_DATA.documents.title}
              </h3>
              <ul className="space-y-2">
                {ACCOUNT_PLAYBOOK_DATA.documents.items.map((doc, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-amber-500/70 text-[18px] mt-0.5">{doc.hasIt ? 'check_circle' : 'radio_button_unchecked'}</span>
                    <span className="text-sm text-slate-700 dark:text-slate-300">{doc.label}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Helper Section */}
            <div className="rounded-xl bg-white dark:bg-[#1c2727] border border-slate-200 dark:border-[#283939] p-5">
              <h3 className="text-slate-900 dark:text-white font-bold text-sm mb-4">{ACCOUNT_PLAYBOOK_DATA.help.title}</h3>
              <button className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-[#283939] hover:bg-[#3b5454] text-white text-sm font-medium transition-colors">
                <span className="material-symbols-outlined text-[18px]">mail</span>
                {ACCOUNT_PLAYBOOK_DATA.help.primaryBtn}
              </button>
              <button className="w-full mt-3 flex items-center justify-center gap-2 py-2.5 rounded-lg border border-slate-200 dark:border-[#3b5454] text-slate-600 dark:text-[#9db9b9] hover:text-[#13ecec] hover:border-[#13ecec] text-sm font-medium transition-colors">
                <span className="material-symbols-outlined text-[18px]">help</span>
                {ACCOUNT_PLAYBOOK_DATA.help.secondaryBtn}
              </button>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
};

