"use client";

import { UserButton } from "@clerk/nextjs";
import { useMutation, useQuery } from "convex/react";
import Link from "next/link";
import React, { useState } from "react";
import { api } from "../../../convex/_generated/api";
import { CHOOSE_INVITEES_DATA, PERSONAL_DETAILS_DATA } from "../../data/mockData";

export interface ChooseInviteesProps { className?: string; }

const ROLE_MAP: Record<string, "EXECUTOR" | "CO_EXECUTOR" | "VIEW_ONLY" | "MEMORIAL"> = {
  executor: "EXECUTOR",
  "co-executor": "CO_EXECUTOR",
  "view-only": "VIEW_ONLY",
  memorial: "MEMORIAL",
};

export const ChooseInvitees: React.FC<ChooseInviteesProps> = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [selectedRole, setSelectedRole] = useState("executor");
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);

  const owner = useQuery(api.owners.getOwner);
  const invitees = useQuery(api.invitees.getOwnerInvitees);
  const addInvitee = useMutation(api.invitees.addInvitee);

  const handleAddInvitee = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;
    setSaving(true);
    try {
      await addInvitee({
        nameEnc: name.trim(),
        emailEnc: email.trim(),
        role: ROLE_MAP[selectedRole] || "EXECUTOR",
      });
      setName("");
      setEmail("");
      setMessage("");
      setSelectedRole("executor");
    } catch (err) {
      console.error("Failed to add invitee:", err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 min-h-screen flex flex-col overflow-hidden">
      {/* Top Header matching Landing Page */}
      <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/95 backdrop-blur dark:bg-background-dark/95 dark:border-slate-800">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded bg-primary text-background-dark">
              <span className="material-symbols-outlined">shield_lock</span>
            </div>
            <span className="text-xl font-serif font-bold tracking-tight text-slate-900 dark:text-white">
              Afterword
            </span>
          </div>
          <div className="flex items-center gap-4">
            <UserButton afterSignOutUrl="/" />
          </div>
        </div>
      </header>

      <div className="flex flex-1 flex-col md:flex-row overflow-hidden">
        {/* Left Sidebar (35%) */}
        <aside className="hidden md:flex flex-col justify-between w-[35%] bg-[#0d1b1e] text-white p-12 relative overflow-hidden">
          {/* Abstract Background Pattern */}
          <div 
            className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none" 
            style={{ background: "radial-gradient(circle at 10% 20%, rgba(19, 218, 236, 0.4) 0%, transparent 20%), radial-gradient(circle at 90% 80%, rgba(19, 218, 236, 0.2) 0%, transparent 20%)" }}
          ></div>
          
          <div className="relative z-10">
            <div className="flex flex-col gap-8">
              <div>
                <h1 className="text-3xl font-bold leading-tight mb-2">Executor Selection</h1>
                <p className="text-slate-400 text-sm font-medium">Step 4 of 4</p>
              </div>
              
              <nav className="flex flex-col gap-1">
                {PERSONAL_DETAILS_DATA.sidebarSteps.map((step: any, i: number) => {
                  const isActive = step.label === "Executor Selection";
                  return (
                    <div key={i} className={`flex items-center gap-4 px-3 py-3 rounded-lg cursor-pointer ${isActive ? 'bg-white/10 text-primary border-l-4 border-primary' : 'opacity-60 hover:opacity-100 transition-opacity'}`}>
                      <span className="material-symbols-outlined text-xl">{step.icon}</span>
                      <span className="text-sm font-medium">{step.label}</span>
                    </div>
                  );
                })}
              </nav>
            </div>
          </div>
          
          <div className="relative z-10 mt-8">
            <div className="flex flex-col gap-2 relative">
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-primary mt-1">security</span>
                <div>
                  <h4 className="font-bold text-sm mb-1 text-white">{CHOOSE_INVITEES_DATA.whyMattersTitle}</h4>
                  <p className="text-[#9db7b9] text-sm leading-relaxed">{CHOOSE_INVITEES_DATA.whyMattersDesc}</p>
                </div>
              </div>
            </div>
            <div className="text-xs text-slate-500 mt-8">
              <p>{PERSONAL_DETAILS_DATA.copyright}</p>
            </div>
          </div>
        </aside>

        {/* Right Content Area (65%) */}
        <main className="w-full md:w-[65%] flex flex-col items-center p-4 md:p-8 overflow-y-auto">
          <div className="w-full max-w-2xl pt-8 md:pt-16">
            
            {/* Header */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">{CHOOSE_INVITEES_DATA.headerTitle}</h2>
              <p className="text-slate-500 dark:text-slate-400">{CHOOSE_INVITEES_DATA.headerDesc}</p>
            </div>
            
            {/* Main Form Card */}
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 p-8 md:p-10 mb-6">
              <form className="flex flex-col gap-6" onSubmit={handleAddInvitee}>
                {/* Personal Details */}
                <div className="flex flex-col md:flex-row gap-6">
                  <label className="flex flex-col flex-1">
                    <span className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">{CHOOSE_INVITEES_DATA.form.nameLabel}</span>
                    <input 
                      className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 focus:ring-2 focus:ring-primary focus:border-primary transition-all text-slate-900 dark:text-white placeholder:text-slate-400" 
                      placeholder={CHOOSE_INVITEES_DATA.form.namePlaceholder} 
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      suppressHydrationWarning
                    />
                  </label>
                  <label className="flex flex-col flex-1">
                    <span className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">{CHOOSE_INVITEES_DATA.form.emailLabel}</span>
                    <input 
                      className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 focus:ring-2 focus:ring-primary focus:border-primary transition-all text-slate-900 dark:text-white placeholder:text-slate-400" 
                      placeholder={CHOOSE_INVITEES_DATA.form.emailPlaceholder} 
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      suppressHydrationWarning
                    />
                  </label>
                </div>
                
                {/* Role Selection */}
                <div className="space-y-4">
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">{CHOOSE_INVITEES_DATA.form.roleLabel}</label>
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                    {CHOOSE_INVITEES_DATA.form.roles.map((role: any, i: number) => (
                      <label key={i} className="cursor-pointer group relative">
                        <input 
                          className="peer sr-only" 
                          name="role" 
                          type="radio" 
                          checked={selectedRole === role.id}
                          onChange={() => setSelectedRole(role.id)}
                          suppressHydrationWarning 
                        />
                        <div className="h-full flex flex-col items-center justify-center p-4 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 hover:border-primary/50 peer-checked:bg-primary/20 peer-checked:text-primary peer-checked:border-primary transition-all text-center gap-2">
                          <span className="material-symbols-outlined text-2xl mb-1 text-slate-500 peer-checked:text-primary">{role.icon}</span>
                          <span className="text-sm font-semibold text-slate-700 dark:text-slate-300 peer-checked:text-primary">{role.label}</span>
                        </div>
                        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <span className="material-symbols-outlined text-xs text-slate-400 dark:text-slate-500" title={role.tooltip}>info</span>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
                
                {/* Personal Message */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">{CHOOSE_INVITEES_DATA.form.messageLabel}</label>
                    <button 
                      type="button" 
                      className="text-xs text-primary hover:underline" 
                      onClick={() => setMessage(CHOOSE_INVITEES_DATA.form.messagePlaceholder)}
                      suppressHydrationWarning
                    >
                      {CHOOSE_INVITEES_DATA.form.messageTemplateText}
                    </button>
                  </div>
                  <textarea 
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 focus:ring-2 focus:ring-primary focus:border-primary transition-all text-slate-900 dark:text-white placeholder:text-slate-400 resize-none" 
                    placeholder={CHOOSE_INVITEES_DATA.form.messagePlaceholder} 
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={4}
                    suppressHydrationWarning
                  ></textarea>
                  <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">lock</span>
                    {CHOOSE_INVITEES_DATA.form.privacyNote}
                  </p>
                </div>
                
                {/* Add Invitee Button */}
                <div className="pt-2">
                  <button 
                    type="submit" 
                    disabled={saving || !name.trim() || !email.trim()}
                    className="w-full bg-primary hover:bg-[#0fbccb] disabled:opacity-50 text-slate-900 px-8 py-3.5 rounded-lg font-bold shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
                    suppressHydrationWarning
                  >
                    <span className="material-symbols-outlined text-[20px]">person_add</span>
                    <span>{saving ? "Adding..." : "Add Invitee"}</span>
                  </button>
                </div>
              </form>
            </div>

            {/* Saved Invitees List */}
            {invitees && invitees.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Added Invitees ({invitees.length})</h3>
                <div className="flex flex-col gap-3">
                  {invitees.map((inv: any, idx: number) => (
                    <div key={idx} className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-4 flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm shrink-0">
                        {inv.nameEnc.charAt(0).toUpperCase()}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-bold text-slate-900 dark:text-white truncate">{inv.nameEnc}</h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{inv.emailEnc}</p>
                      </div>
                      <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary ring-1 ring-inset ring-primary/20">
                        {inv.role.replace("_", " ")}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Footer Actions */}
            <div className="pt-4 pb-8 flex items-center justify-between">
              <Link href="/setup/accounts" className="px-6 py-3 rounded-lg text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white font-medium transition-colors flex items-center gap-2" suppressHydrationWarning>
                <span className="material-symbols-outlined">arrow_back</span>
                {CHOOSE_INVITEES_DATA.actions.back}
              </Link>
              <Link href="/setup/guardian" className="bg-primary hover:bg-[#0fbccb] disabled:opacity-50 text-slate-900 px-8 py-3.5 rounded-lg font-bold shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all transform hover:-translate-y-0.5 flex items-center gap-2" suppressHydrationWarning>
                <span>{CHOOSE_INVITEES_DATA.actions.continue}</span>
                <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
              </Link>
            </div>
            
            {/* Privacy Note */}
            <div className="bg-blue-50 dark:bg-blue-500/5 border border-blue-200 dark:border-blue-500/10 rounded-lg p-4 mb-8">
              <div className="flex gap-3">
                <span className="material-symbols-outlined text-primary text-xl shrink-0">privacy_tip</span>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  <span className="text-slate-900 dark:text-slate-200 font-medium">{CHOOSE_INVITEES_DATA.privacyAssurance.title} </span> 
                  {CHOOSE_INVITEES_DATA.privacyAssurance.desc}
                </p>
              </div>
            </div>
            
          </div>
        </main>
      </div>
    </div>
  );
};
