"use client";

import { useQuery } from "convex/react";
import Link from "next/link";
import React, { useState } from "react";
import { api } from "../../../convex/_generated/api";
import { NAME_GUARDIAN_DATA } from "../../data/mockData";

export interface NameTrustedGuardianProps { className?: string; }

export const NameTrustedGuardian: React.FC<NameTrustedGuardianProps> = () => {
  const [useInvitee, setUseInvitee] = useState(false);
  const [selectedInvitee, setSelectedInvitee] = useState("");

  const owner = useQuery(api.owners.getOwner);
  const invitees = useQuery(api.invitees.getOwnerInvitees);

  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 min-h-screen flex flex-col md:flex-row overflow-hidden">
      {/* Left Sidebar (35%) */}
      <aside className="hidden md:flex flex-col justify-between w-[35%] bg-[#0b1517] dark:bg-black border-r border-slate-800 p-8 md:p-12 relative overflow-hidden text-white">
        {/* Abstract Background Pattern */}
        <div 
          className="absolute inset-0 opacity-10 pointer-events-none" 
          style={{ backgroundImage: "radial-gradient(circle at 10% 20%, rgba(19, 218, 236, 0.4) 0%, transparent 20%), radial-gradient(circle at 90% 80%, rgba(19, 218, 236, 0.2) 0%, transparent 30%)" }}
        ></div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-12">
            <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-[#0b1517] font-bold text-xl">
              {NAME_GUARDIAN_DATA.sidebarAvatarChar}
            </div>
            <div>
              <h1 className="text-white text-lg font-bold leading-tight">{NAME_GUARDIAN_DATA.sidebarTitle}</h1>
              <p className="text-slate-400 text-sm">{NAME_GUARDIAN_DATA.sidebarSubtitle}</p>
            </div>
          </div>
          
          <nav className="flex flex-col gap-6">
            {NAME_GUARDIAN_DATA.steps.map((step, i) => (
              <React.Fragment key={i}>
                <div className={`flex items-center gap-4 transition-colors ${step.current ? 'text-primary bg-primary/10 -mx-4 px-4 py-3 rounded-lg border-l-4 border-primary' : 'text-slate-400'}`}>
                  <span className="material-symbols-outlined text-2xl">{step.icon}</span>
                  <div className="flex flex-col">
                    <span className={`text-base font-${step.current ? 'bold' : 'medium'}`}>{step.label}</span>
                    {step.subLabel && <span className="text-xs opacity-80">{step.subLabel}</span>}
                  </div>
                </div>
                {i === NAME_GUARDIAN_DATA.steps.length - 2 && (
                  <div className="h-8 border-l border-dashed border-slate-700 ml-7 my-1"></div>
                )}
              </React.Fragment>
            ))}
          </nav>
        </div>
        
        <div className="relative z-10 mt-auto">
          <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
            <div className="flex items-center gap-3 mb-2">
              <span className="material-symbols-outlined text-yellow-500">lightbulb</span>
              <h3 className="text-white font-medium text-sm">Did you know?</h3>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              {NAME_GUARDIAN_DATA.didYouKnow}
            </p>
          </div>
          <p className="text-slate-600 text-xs mt-6">{NAME_GUARDIAN_DATA.copyright}</p>
        </div>
      </aside>

      {/* Main Content (65%) */}
      <main className="w-full md:w-[65%] h-full overflow-y-auto bg-background-light dark:bg-background-dark p-6 md:p-12 lg:p-16">
        <div className="max-w-3xl mx-auto flex flex-col gap-8 pb-20">
          
          {/* Header */}
          <div className="flex flex-col gap-2">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">{NAME_GUARDIAN_DATA.headerTitle}</h2>
            <p className="text-slate-500 dark:text-slate-400 text-lg">{NAME_GUARDIAN_DATA.headerDesc}</p>
          </div>
          
          {/* Top Callout */}
          <div className="bg-primary/5 dark:bg-primary/10 border-l-4 border-primary p-6 rounded-r-lg shadow-sm">
            <div className="flex gap-4">
              <span className="material-symbols-outlined text-primary text-3xl shrink-0">verified_user</span>
              <div className="flex flex-col gap-2">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{NAME_GUARDIAN_DATA.calloutTitle}</h3>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm md:text-base">
                  {NAME_GUARDIAN_DATA.calloutDesc}
                </p>
              </div>
            </div>
          </div>
          
          {/* Form Area */}
          <form className="flex flex-col gap-8 bg-white dark:bg-slate-800/50 p-8 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm" onSubmit={(e) => e.preventDefault()}>
            {/* Toggle */}
            <label className="flex items-center justify-between p-4 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 cursor-pointer hover:border-primary transition-colors group">
              <div className="flex flex-col">
                <span className="text-sm font-medium text-slate-900 dark:text-white group-hover:text-primary transition-colors">{NAME_GUARDIAN_DATA.form.toggleTitle}</span>
                <span className="text-xs text-slate-500">{NAME_GUARDIAN_DATA.form.toggleDesc}</span>
              </div>
              <div className="relative inline-flex items-center cursor-pointer">
                <input 
                  className="sr-only peer" 
                  type="checkbox" 
                  checked={useInvitee}
                  onChange={(e) => setUseInvitee(e.target.checked)}
                />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </div>
            </label>
            
            {/* Inputs */}
            {useInvitee ? (
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Select previously added Invitee</label>
                <div className="relative">
                  <select 
                    className="w-full h-12 px-4 appearance-none rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                    value={selectedInvitee}
                    onChange={(e) => setSelectedInvitee(e.target.value)}
                  >
                    <option value="" disabled>Select an invitee...</option>
                    {invitees?.map((inv, idx) => (
                      <option key={idx} value={inv.emailEnc}>{inv.nameEnc} ({inv.emailEnc})</option>
                    ))}
                  </select>
                  <span className="material-symbols-outlined absolute right-4 top-3 text-slate-400 pointer-events-none">expand_more</span>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">{NAME_GUARDIAN_DATA.form.nameLabel}</label>
                  <div className="relative">
                    <input 
                      className="w-full h-12 px-4 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none" 
                      placeholder={NAME_GUARDIAN_DATA.form.namePlaceholder} 
                      type="text"
                    />
                    <span className="material-symbols-outlined absolute right-4 top-3 text-slate-400 pointer-events-none">person</span>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">{NAME_GUARDIAN_DATA.form.emailLabel}</label>
                  <div className="relative">
                    <input 
                      className="w-full h-12 px-4 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none" 
                      placeholder={NAME_GUARDIAN_DATA.form.emailPlaceholder} 
                      type="email"
                    />
                    <span className="material-symbols-outlined absolute right-4 top-3 text-slate-400 pointer-events-none">mail</span>
                  </div>
                </div>
              </div>
            )}
            
            {/* Email Preview Component */}
            <div className="flex flex-col gap-3">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2">
                <span className="material-symbols-outlined text-lg">visibility</span>
                {NAME_GUARDIAN_DATA.form.previewLabel}
              </label>
              <div className="rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden bg-slate-50 dark:bg-black/20">
                {/* Fake Browser Chrome */}
                <div className="bg-slate-100 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 px-4 py-2 flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-400"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-green-400"></div>
                  </div>
                  <div className="ml-4 bg-white dark:bg-slate-900 rounded px-2 py-0.5 text-[10px] text-slate-400 flex-1 text-center font-mono">
                    {NAME_GUARDIAN_DATA.form.previewBrowserChrome}
                  </div>
                </div>
                {/* Email Body */}
                <div className="p-6 md:p-8 bg-white dark:bg-slate-900 flex flex-col gap-4">
                  <div className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
                    <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center text-primary">
                      <span className="material-symbols-outlined text-xl">lock_open</span>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white">{NAME_GUARDIAN_DATA.form.previewSubject}</h4>
                      <p className="text-xs text-slate-500">{NAME_GUARDIAN_DATA.form.previewSender}</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      {NAME_GUARDIAN_DATA.form.previewBody1} <span className="bg-yellow-100 dark:bg-yellow-900/30 px-1 rounded text-slate-800 dark:text-yellow-200 font-medium">{NAME_GUARDIAN_DATA.form.previewBodyNamePlaceholder}</span>,
                    </p>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      {NAME_GUARDIAN_DATA.form.previewBody2} <span className="font-medium text-slate-900 dark:text-white">{NAME_GUARDIAN_DATA.form.previewBodyOwnerPlaceholder}</span>{NAME_GUARDIAN_DATA.form.previewBody3}
                    </p>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      {NAME_GUARDIAN_DATA.form.previewBody4}
                    </p>
                    <div className="pt-2">
                      <button className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs px-4 py-2 rounded font-medium pointer-events-none opacity-50" type="button">{NAME_GUARDIAN_DATA.form.previewButton}</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
          
          {/* Warning Callout */}
          <div className="flex items-start gap-3 p-4 bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800/50 rounded-lg">
            <span className="material-symbols-outlined text-orange-600 dark:text-orange-400 shrink-0">warning</span>
            <div className="flex flex-col gap-1">
              <h4 className="text-sm font-bold text-orange-800 dark:text-orange-300">{NAME_GUARDIAN_DATA.warningTitle}</h4>
              <p className="text-xs text-orange-700 dark:text-orange-400/80 leading-relaxed">
                {NAME_GUARDIAN_DATA.warningDesc}
              </p>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
            <Link href="/dashboard" className="w-full sm:w-auto bg-primary hover:bg-[#0bc5d6] text-[#0b1517] font-bold py-3.5 px-8 rounded-lg shadow-lg hover:shadow-primary/20 transition-all flex items-center justify-center gap-2 group">
              {NAME_GUARDIAN_DATA.actions.save}
              <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform text-lg">arrow_forward</span>
            </Link>
            <Link href="/dashboard" className="w-full sm:w-auto text-slate-500 dark:text-slate-400 font-medium py-3 px-6 hover:text-slate-700 dark:hover:text-slate-200 transition-colors text-center">
              {NAME_GUARDIAN_DATA.actions.skip}
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

