"use client";

import Link from "next/link";
import React from "react";
import { UNLOCK_FLOW_DATA } from "../../data/mockData";

export interface UnlockConfirmedProps { className?: string; }

export const UnlockConfirmed: React.FC<UnlockConfirmedProps> = () => {
  return (
    <div className="bg-background-light dark:bg-[#102222] font-body min-h-screen flex flex-col text-slate-900 dark:text-slate-100">
      <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
        {/* Header */}
        <header className="flex items-center justify-between whitespace-nowrap border-b border-slate-200 dark:border-slate-800 px-10 py-4 bg-background-light dark:bg-background-dark">
          <div className="flex items-center gap-3">
            <div className="size-8 text-[#13ecec] flex items-center justify-center">
              <span className="material-symbols-outlined text-3xl">account_balance</span>
            </div>
            <h2 className="text-xl font-bold leading-tight tracking-[-0.015em] font-display">{UNLOCK_FLOW_DATA.confirmed.headerTitle}</h2>
          </div>
          <div className="flex flex-1 justify-end gap-8 items-center">
            <div className="hidden md:flex items-center gap-8">
              {UNLOCK_FLOW_DATA.confirmed.nav.map((item, i) => (
                <a key={i} className="text-slate-600 dark:text-slate-300 hover:text-[#13ecec] text-sm font-medium leading-normal transition-colors" href="#">{item}</a>
              ))}
            </div>
            <div className="bg-center bg-no-repeat bg-cover rounded-full size-10 border-2 border-slate-200 dark:border-slate-700" style={{ backgroundImage: `url("${UNLOCK_FLOW_DATA.confirmed.avatarUrl}")` }}></div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-grow flex items-center justify-center p-6">
          <div className="flex flex-col items-center justify-center max-w-[600px] w-full gap-8 animate-fade-in-up">
            
            {/* Success Visual */}
            <div className="relative flex items-center justify-center">
              {/* Outer glow/ring */}
              <div className="absolute size-32 rounded-full bg-[#13ecec]/10 animate-pulse"></div>
              <div className="absolute size-24 rounded-full bg-[#13ecec]/20"></div>
              {/* Checkmark Circle */}
              <div className="relative flex items-center justify-center size-20 rounded-full bg-[#13ecec] text-background-dark shadow-[0_0_20px_rgba(19,236,236,0.4)]">
                <span className="material-symbols-outlined text-5xl font-bold">check</span>
              </div>
            </div>

            <div className="text-center space-y-4">
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight font-display text-slate-900 dark:text-white">
                {UNLOCK_FLOW_DATA.confirmed.title}
              </h1>
              <p className="text-slate-600 dark:text-slate-400 text-base md:text-lg leading-relaxed max-w-md mx-auto">
                {UNLOCK_FLOW_DATA.confirmed.desc}
              </p>
            </div>

            {/* Email Dispatch Illustration Area */}
            <div className="flex items-center justify-center gap-4 py-4 opacity-80">
              <div className="flex items-center gap-3 px-6 py-3 rounded-xl bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                <span className="material-symbols-outlined text-[#13ecec]">mark_email_read</span>
                <div className="flex flex-col">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">{UNLOCK_FLOW_DATA.confirmed.statusLabel}</span>
                  <span className="text-sm font-medium text-slate-800 dark:text-slate-200">{UNLOCK_FLOW_DATA.confirmed.statusText}</span>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="w-full flex justify-center pt-2">
              <Link href="/start" className="group flex items-center justify-center gap-2 h-12 px-8 rounded-lg bg-[#13ecec] hover:bg-[#13ecec]/90 text-background-dark font-bold text-base transition-all duration-200 shadow-[0_4px_14px_0_rgba(19,236,236,0.39)] hover:shadow-[0_6px_20px_rgba(19,236,236,0.23)] hover:-translate-y-0.5 w-full sm:w-auto">
                <span>{UNLOCK_FLOW_DATA.confirmed.continueButton}</span>
                <span className="material-symbols-outlined text-lg group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </Link>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="flex flex-col gap-6 px-5 py-8 text-center border-t border-slate-200 dark:border-slate-800">
          <div className="flex flex-wrap items-center justify-center gap-6">
            <a className="text-slate-500 dark:text-slate-400 hover:text-[#13ecec] text-sm transition-colors" href="#">Privacy Policy</a>
            <a className="text-slate-500 dark:text-slate-400 hover:text-[#13ecec] text-sm transition-colors" href="#">Terms of Service</a>
            <a className="text-slate-500 dark:text-slate-400 hover:text-[#13ecec] text-sm transition-colors" href="#">Help Center</a>
          </div>
          <p className="text-slate-400 dark:text-slate-500 text-sm">© 2023 EstateLegacy. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

