"use client";

import { useAction } from "convex/react";
import React, { useState } from "react";
import { api } from "../../../convex/_generated/api";
import { Id } from "../../../convex/_generated/dataModel";
import { EVIDENCE_BUNDLE_DATA } from "../../data/mockData";

export interface EvidenceBundleProps {
  id?: string;
}



export const EvidenceBundle: React.FC<EvidenceBundleProps> = ({ id }) => {
  const generateBundle = useAction(api.export.generateBundle.generateBundle);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleDownload = async () => {
    if (!id) return;
    try {
      setIsGenerating(true);
      const base64 = await generateBundle({ estateId: id as Id<"estates"> });
      const bytes  = Uint8Array.from(atob(base64), c => c.charCodeAt(0));
      const blob   = new Blob([bytes], { type: "application/pdf" });
      const url    = URL.createObjectURL(blob);
      const a      = document.createElement("a");
      a.href       = url;
      a.download   = "Afterword_Evidence_Bundle.pdf";
      a.click();
      URL.revokeObjectURL(url);
    } catch (e) {
      console.error(e);
      alert("Bundle generation failed.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="bg-[#f6f8f8] dark:bg-[#102222] font-[system-ui] text-slate-900 dark:text-slate-100 min-h-screen flex flex-col">
      {/* Top Navigation */}
      <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-slate-200 dark:border-[#283939] px-10 py-4 bg-white dark:bg-[#0c1818]">
        <div className="flex items-center gap-4 text-slate-900 dark:text-white">
          <div className="size-8 text-[#13ecec]">
            <span className="material-symbols-outlined text-3xl">{EVIDENCE_BUNDLE_DATA.header.logoIcon}</span>
          </div>
          <h2 className="text-slate-900 dark:text-white text-lg font-bold leading-tight tracking-[-0.015em]">{EVIDENCE_BUNDLE_DATA.header.logoText}</h2>
        </div>
        <div className="flex flex-1 justify-end gap-8">
          <div className="hidden md:flex items-center gap-9">
            {EVIDENCE_BUNDLE_DATA.header.nav.map((item, i) => (
              <a key={i} className="text-slate-600 hover:text-[#13ecec] dark:text-slate-300 dark:hover:text-white text-sm font-medium transition-colors" href="#">{item}</a>
            ))}
          </div>
          <button className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 bg-[#13ecec]/10 hover:bg-[#13ecec]/20 text-[#0fbdbd] dark:text-[#13ecec] text-sm font-bold transition-colors">
            <span className="truncate">{EVIDENCE_BUNDLE_DATA.header.logoutText}</span>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-grow flex flex-col items-center justify-center p-6 sm:p-10 relative overflow-hidden">
        
        {/* Subtle Ambient Background Gradient */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#13ecec]/10 via-transparent to-transparent"></div>
        
        <div className="w-full max-w-3xl z-10 flex flex-col items-center text-center space-y-10">
          
          {/* Header Section */}
          <div className="flex flex-col items-center space-y-6">
            <div className="w-20 h-20 rounded-full bg-[#13ecec]/10 flex items-center justify-center mb-2 shadow-[0_0_15px_rgba(19,236,236,0.3)]">
              <span className="material-symbols-outlined text-[#13ecec] text-5xl">{EVIDENCE_BUNDLE_DATA.hero.icon}</span>
            </div>
            <h1 className="font-serif italic text-4xl sm:text-5xl md:text-6xl text-slate-900 dark:text-white leading-tight">
              {EVIDENCE_BUNDLE_DATA.hero.title}
            </h1>
            <p className="text-slate-500 dark:text-slate-400 max-w-lg text-lg">
              {EVIDENCE_BUNDLE_DATA.hero.subtitle}
            </p>
          </div>

          {/* Content Preview Card */}
          <div className="w-full bg-white dark:bg-[#162a2a] rounded-xl shadow-xl border border-slate-200 dark:border-[#283939] overflow-hidden transform transition-all hover:scale-[1.01]">
            <div className="bg-slate-50 dark:bg-[#1c3535] p-6 border-b border-slate-200 dark:border-[#283939] flex justify-between items-center">
              <div className="flex flex-col items-start gap-1 text-left">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">{EVIDENCE_BUNDLE_DATA.bundleCard.title}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">{EVIDENCE_BUNDLE_DATA.bundleCard.subtitle}</p>
              </div>
              <div className="size-10 rounded-full bg-[#13ecec]/10 flex items-center justify-center text-[#13ecec]">
                <span className="material-symbols-outlined">{EVIDENCE_BUNDLE_DATA.bundleCard.icon}</span>
              </div>
            </div>
            
            <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 text-left">
              {EVIDENCE_BUNDLE_DATA.bundleCard.items.map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-[#13ecec]">check_box</span>
                  <span className="text-slate-700 dark:text-slate-200 font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Primary Action */}
          <button 
            onClick={handleDownload}
            disabled={isGenerating}
            className="relative group w-full md:w-auto min-w-[300px] flex items-center justify-center gap-3 bg-[#13ecec] hover:bg-[#0fbdbd] text-[#102222] font-bold text-lg py-4 px-8 rounded-full shadow-[0_0_20px_rgba(19,236,236,0.4)] transition-all hover:shadow-[0_0_30px_rgba(19,236,236,0.6)] disabled:opacity-50 disabled:cursor-not-allowed">
            <span className="material-symbols-outlined">{EVIDENCE_BUNDLE_DATA.actions.primaryIcon}</span>
            <span>{isGenerating ? "Generating..." : EVIDENCE_BUNDLE_DATA.actions.primaryBtn}</span>
            {!isGenerating && (
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
              </span>
            )}
          </button>

          {/* Secondary Actions */}
          <div className="flex flex-wrap justify-center gap-3 w-full">
            {EVIDENCE_BUNDLE_DATA.actions.secondaryBtns.map((btn) => (
              <button key={btn.id} className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-200 dark:bg-[#1c3535] hover:bg-slate-300 dark:hover:bg-[#254242] text-slate-700 dark:text-slate-200 text-sm font-semibold transition-colors">
                <span className="material-symbols-outlined text-[18px]">{btn.icon}</span>
                {btn.label}
              </button>
            ))}
          </div>

          {/* Legal Note & Safety */}
          <div className="flex flex-col items-center gap-6 pt-6">
            <p className="text-xs text-slate-400 italic max-w-md">
              {EVIDENCE_BUNDLE_DATA.footer.legalNote}
            </p>
            <button className="text-xs font-medium text-red-400 hover:text-red-300 transition-colors border-b border-transparent hover:border-red-400 pb-0.5">
              {EVIDENCE_BUNDLE_DATA.footer.dangerAction}
            </button>
          </div>

        </div>
      </main>
    </div>
  );
};

