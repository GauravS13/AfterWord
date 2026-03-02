"use client";

import React from "react";
import { UNLOCK_FLOW_DATA } from "../../data/mockData";

export interface MatchFoundOtpWaitingProps {
  onConfirm: () => void;
}

export const MatchFoundOtpWaiting: React.FC<MatchFoundOtpWaitingProps> = ({ onConfirm }) => {
  return (
    <div className="bg-background-light dark:bg-[#111818] min-h-screen flex flex-col font-display text-slate-900 dark:text-slate-100 antialiased overflow-x-hidden">
      {/* TopNavBar */}
      <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-slate-200 dark:border-slate-800 px-10 py-4 bg-background-light dark:bg-background-dark relative z-10">
        <div className="flex items-center gap-4">
          <div className="size-8 text-[#13ecec]">
            <span className="material-symbols-outlined text-3xl">{UNLOCK_FLOW_DATA.otpWaiting.headerLogo}</span>
          </div>
          <h2 className="text-slate-900 dark:text-white text-lg font-bold leading-tight tracking-[-0.015em]">{UNLOCK_FLOW_DATA.otpWaiting.headerTitle}</h2>
        </div>
        <div className="flex flex-1 justify-end gap-8">
          <div className="hidden md:flex items-center gap-9">
            {UNLOCK_FLOW_DATA.otpWaiting.nav.map((item, i) => (
              <a key={i} className="text-slate-600 dark:text-slate-300 hover:text-[#13ecec] transition-colors text-sm font-medium leading-normal" href="#">{item}</a>
            ))}
          </div>
          <button className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-6 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-900 dark:text-white text-sm font-bold leading-normal transition-colors">
            <span className="truncate">{UNLOCK_FLOW_DATA.otpWaiting.loginText}</span>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-grow flex items-center justify-center p-4 sm:p-8 relative z-10">
        <div className="w-full max-w-lg flex flex-col gap-8 animate-fade-in">
          
          {/* Status Header */}
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="flex items-center justify-center size-16 rounded-full bg-[#13ecec]/10 text-[#13ecec] mb-2">
              <span className="material-symbols-outlined text-4xl">{UNLOCK_FLOW_DATA.otpWaiting.statusIcon}</span>
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              {UNLOCK_FLOW_DATA.otpWaiting.statusTitle}
            </h1>
            <p className="text-slate-500 dark:text-slate-400 max-w-sm">
              {UNLOCK_FLOW_DATA.otpWaiting.statusDesc}
            </p>
          </div>

          {/* Notification Card */}
          <div className="relative overflow-hidden rounded-xl border border-amber-500/30 bg-amber-500/5 p-6">
            <div className="absolute top-0 left-0 w-1 h-full bg-amber-500"></div>
            <div className="flex gap-4">
              <div className="text-amber-500 mt-1 shrink-0">
                <span className="material-symbols-outlined">gpp_maybe</span>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-amber-600 dark:text-amber-400 font-bold text-sm uppercase tracking-wider">{UNLOCK_FLOW_DATA.otpWaiting.alertTitle}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {UNLOCK_FLOW_DATA.otpWaiting.alertDesc}
                </p>
              </div>
            </div>
          </div>

          {/* OTP Section */}
          <div className="flex flex-col gap-8 bg-white dark:bg-[#192525] p-8 rounded-2xl shadow-xl shadow-slate-900/5 dark:shadow-black/20 border border-slate-100 dark:border-slate-800">
            <div className="flex flex-col items-center gap-6">
              <label className="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-widest">{UNLOCK_FLOW_DATA.otpWaiting.otpLabel}</label>
              
              <div className="flex gap-2 sm:gap-3 justify-center w-full">
                {/* OTP Inputs */}
                {[...Array(6)].map((_, i) => (
                  <input 
                    key={i}
                    autoFocus={i === 0} 
                    className="w-10 h-14 sm:w-12 sm:h-16 text-center text-2xl font-mono font-bold bg-slate-50 dark:bg-background-dark border border-slate-200 dark:border-slate-700 rounded-lg focus:border-[#13ecec] focus:ring-2 focus:ring-[#13ecec]/20 outline-none transition-all text-slate-900 dark:text-white placeholder-slate-400" 
                    maxLength={1} 
                    placeholder="-" 
                    type="text" 
                  />
                ))}
              </div>
              
              {/* Countdown Timer */}
              <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800/50 py-1.5 px-4 rounded-full text-sm font-medium">
                <span className="material-symbols-outlined text-lg">timer</span>
                <span className="font-mono">{UNLOCK_FLOW_DATA.otpWaiting.timerText}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-4 mt-2">
              <button onClick={onConfirm} className="w-full flex items-center justify-center gap-2 bg-[#13ecec] hover:bg-[#13ecec]/90 text-background-dark font-bold py-4 px-6 rounded-xl transition-all shadow-lg shadow-[#13ecec]/20 transform hover:-translate-y-0.5">
                {UNLOCK_FLOW_DATA.otpWaiting.confirmButton}
                <span className="material-symbols-outlined text-xl font-bold">arrow_forward</span>
              </button>
              <button className="text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-[#13ecec] transition-colors">
                {UNLOCK_FLOW_DATA.otpWaiting.resendTextPart1} <span className="underline underline-offset-4 decoration-slate-400 dark:decoration-slate-600">{UNLOCK_FLOW_DATA.otpWaiting.resendTextPart2}</span>
              </button>
            </div>
          </div>

          {/* Help Link */}
          <div className="text-center">
            <a className="inline-flex items-center gap-1 text-xs text-slate-400 hover:text-slate-300 transition-colors" href="#">
              {UNLOCK_FLOW_DATA.otpWaiting.helpLink}
              <span className="material-symbols-outlined text-sm">chevron_right</span>
            </a>
          </div>
        </div>
      </main>

      {/* Background Decorative Element (Abstract) */}
      <div aria-hidden="true" className="fixed inset-0 pointer-events-none z-0 opacity-20" style={{ background: "radial-gradient(circle at 50% 10%, rgba(19, 236, 236, 0.15) 0%, transparent 40%)" }}></div>
    </div>
  );
};

