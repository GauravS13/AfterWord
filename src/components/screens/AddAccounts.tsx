"use client";

import { UserButton } from "@clerk/nextjs";
import { useMutation, useQuery } from "convex/react";
import Link from "next/link";
import React, { useState } from "react";
import { api } from "../../../convex/_generated/api";
import { ADD_ACCOUNTS_DATA, PERSONAL_DETAILS_DATA } from "../../data/mockData";

export interface AddAccountsProps { className?: string; }

export const AddAccounts: React.FC<AddAccountsProps> = () => {
  const addAccountMutation = useMutation(api.owners.addAccount);
  const accounts = useQuery(api.owners.getOwnerAccounts, {}) || [];



  const [serviceName, setServiceName] = useState("");
  const [accountEmailEnc, setAccountEmailEnc] = useState("");
  const [tier, setTier] = useState<"FINANCIAL"|"IDENTITY"|"SENTIMENTAL"|"ADMIN">("FINANCIAL");
  const [notesEnc, setNotesEnc] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAddAccount = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!serviceName) {
      setError("Service name is required.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await addAccountMutation({
        serviceName,
        accountEmailEnc,
        tier,
        notesEnc,
      });
      // reset form
      setServiceName("");
      setAccountEmailEnc("");
      setTier("FINANCIAL");
      setNotesEnc("");
    } catch (err: any) {
      setError(err.message || "Failed to add account");
    } finally {
      setLoading(false);
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

      <div className="flex flex-1 overflow-hidden">
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
                <h1 className="text-3xl font-bold leading-tight mb-2">Asset Inventory</h1>
                <p className="text-slate-400 text-sm font-medium">Step 3 of 4</p>
              </div>
              
              <nav className="flex flex-col gap-1">
                {PERSONAL_DETAILS_DATA.sidebarSteps.map((step: any, i: number) => {
                  const isActive = step.label === "Asset Inventory";
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
          
          <div className="relative z-10 text-xs text-slate-500 mt-8">
            <p>{PERSONAL_DETAILS_DATA.copyright}</p>
          </div>
        </aside>

        {/* Main Content (65% width) */}
        <main className="w-full md:w-[65%] flex flex-col items-center p-4 md:p-8 overflow-y-auto">
          <div className="w-full max-w-2xl pt-8 md:pt-16">
            <header className="mb-8">
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">{ADD_ACCOUNTS_DATA.headerTitle}</h2>
              <p className="text-slate-500 dark:text-slate-400">{ADD_ACCOUNTS_DATA.headerDesc}</p>
            </header>
            
            {/* Input Card */}
            <form className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 mb-8" onSubmit={handleAddAccount}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <label className="flex flex-col">
                  <span className="text-slate-900 dark:text-slate-300 text-sm font-semibold mb-2">{ADD_ACCOUNTS_DATA.form.serviceNameLabel}</span>
                  <div className="relative">
                    <input 
                      className="w-full rounded-lg border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 focus:border-primary focus:ring-1 focus:ring-primary h-12 px-4 text-slate-900 dark:text-white placeholder:text-slate-400" 
                      placeholder={ADD_ACCOUNTS_DATA.form.serviceNamePlaceholder} 
                      type="text"
                      value={serviceName}
                      onChange={(e) => setServiceName(e.target.value)}
                      suppressHydrationWarning
                    />
                    <span className="material-symbols-outlined absolute right-3 top-3 text-slate-400 pointer-events-none">search</span>
                  </div>
                </label>
                <label className="flex flex-col">
                  <span className="text-slate-900 dark:text-slate-300 text-sm font-semibold mb-2">{ADD_ACCOUNTS_DATA.form.emailHintLabel}</span>
                  <input 
                    className="w-full rounded-lg border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 focus:border-primary focus:ring-1 focus:ring-primary h-12 px-4 text-slate-900 dark:text-white placeholder:text-slate-400" 
                    placeholder={ADD_ACCOUNTS_DATA.form.emailHintPlaceholder} 
                    type="text"
                    value={accountEmailEnc}
                    onChange={(e) => setAccountEmailEnc(e.target.value)}
                    suppressHydrationWarning
                  />
                </label>
              </div>
              
              <div className="mb-6">
                <span className="text-slate-900 dark:text-slate-300 text-sm font-semibold mb-3 block">{ADD_ACCOUNTS_DATA.form.urgencyLabel}</span>
                <div className="flex flex-wrap gap-3">
                  {ADD_ACCOUNTS_DATA.form.tiers.map((t: any, i: number) => (
                    <label key={i} className="cursor-pointer">
                      <input 
                        className="peer sr-only" 
                        name="tier" 
                        type="radio" 
                        checked={tier === t.id.toUpperCase()}
                        onChange={() => setTier(t.id.toUpperCase() as any)}
                        suppressHydrationWarning
                      />
                      <div className="px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-300 text-sm font-medium hover:bg-slate-100 dark:hover:bg-slate-800 peer-checked:bg-primary/10 peer-checked:text-primary peer-checked:border-primary transition-all flex items-center gap-2">
                        <span className="material-symbols-outlined text-[18px] peer-checked:text-primary">{t.icon}</span>
                        {t.label}
                      </div>
                    </label>
                  ))}
                </div>
              </div>
              
              <div className="mb-6">
                <label className="flex flex-col">
                  <span className="text-slate-900 dark:text-slate-300 text-sm font-semibold mb-2">{ADD_ACCOUNTS_DATA.form.notesLabel}</span>
                  <textarea 
                    className="w-full rounded-lg border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 focus:border-primary focus:ring-1 focus:ring-primary p-4 text-slate-900 dark:text-white placeholder:text-slate-400 min-h-[100px] resize-y" 
                    placeholder={ADD_ACCOUNTS_DATA.form.notesPlaceholder}
                    value={notesEnc}
                    onChange={(e) => setNotesEnc(e.target.value)}
                    suppressHydrationWarning
                  ></textarea>
                </label>
              </div>
              
              {error && (
                <div className="mb-4 text-sm text-red-600 bg-red-50 p-3 rounded-lg border border-red-100">
                  {error}
                </div>
              )}

              <div className="flex justify-end">
                <button 
                  type="submit" 
                  disabled={loading}
                  className="bg-primary hover:bg-[#0bc5d6] disabled:opacity-50 text-background-dark font-bold py-3 px-6 rounded-lg transition-colors flex items-center gap-2 shadow-sm shadow-primary/20"
                  suppressHydrationWarning
                >
                  <span className="material-symbols-outlined">add_circle</span>
                  {loading ? "Adding..." : ADD_ACCOUNTS_DATA.form.addButton}
                </button>
              </div>
            </form>

            
            {/* Accounts List */}
            <div className="flex flex-col gap-4 pb-24">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Added Accounts ({accounts.length})</h3>
              {accounts.map((account: any, i: number) => {
                let colorClass = "blue";
                let icon = "account_balance";
                if (account.tier === "FINANCIAL") { colorClass = "emerald"; icon = "account_balance"; }
                if (account.tier === "IDENTITY") { colorClass = "blue"; icon = "badge"; }
                if (account.tier === "SENTIMENTAL") { colorClass = "purple"; icon = "favorite"; }
                
                return (
                  <div key={i} className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-5 flex items-start gap-4 hover:shadow-md transition-shadow">
                    <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center shrink-0 text-slate-600 dark:text-slate-300">
                      <span className="material-symbols-outlined">{icon}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="text-base font-bold text-slate-900 dark:text-white truncate">{account.serviceName}</h4>
                        <div className="flex items-center gap-2">
                          <span className={`inline-flex items-center gap-1 rounded-full bg-${colorClass}-50 dark:bg-${colorClass}-500/10 px-2 py-1 text-xs font-medium text-${colorClass}-700 dark:text-${colorClass}-400 ring-1 ring-inset ring-${colorClass}-600/20 dark:ring-${colorClass}-500/20`}>
                            {account.tier}
                          </span>
                          <button className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 p-1">
                            <span className="material-symbols-outlined text-[20px]">more_vert</span>
                          </button>
                        </div>
                      </div>
                      <p className="text-sm text-slate-500 dark:text-slate-400 mb-2 truncate">{account.accountEmailEnc}</p>
                      <div className="bg-slate-50 dark:bg-slate-900/50 rounded p-2 text-xs text-slate-600 dark:text-slate-400 border border-slate-100 dark:border-slate-700/50 italic">
                        {account.notesEnc}
                      </div>
                    </div>
                  </div>
                );
              })}
              
              {/* Proceed to Invitees Button */}
              <div className="mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                <Link href="/setup/about-you" className="w-full sm:w-auto px-6 py-3 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-300 font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-center flex items-center justify-center gap-2" suppressHydrationWarning>
                  <span className="material-symbols-outlined">arrow_back</span>
                  Back
                </Link>
                <Link href="/setup/invitees" className="w-full sm:flex-1 bg-primary text-background-dark font-bold px-6 py-3 rounded-xl hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-primary/20" suppressHydrationWarning>
                  <span>Continue to Invitees</span>
                  <span className="material-symbols-outlined text-lg">arrow_forward</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Sticky Footer Progress Bar */}
          <div className="sticky bottom-0 w-full bg-white dark:bg-[#111718] border-t border-slate-200 dark:border-slate-800 p-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-20 mt-auto">
            <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex flex-col gap-1 w-full md:w-auto">
                <div className="flex items-center justify-between gap-4 text-sm font-medium text-slate-700 dark:text-slate-300">
                  <span>{accounts.length} accounts added</span>
                  <span className="text-slate-400 font-normal">{ADD_ACCOUNTS_DATA.footer.targetText}</span>
                </div>
                <div className="w-full md:w-64 h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full" style={{ width: `${Math.min(100, (accounts.length / 40) * 100)}%` }}></div>
                </div>
              </div>
              <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 hide-scrollbar">
                <span className="text-xs text-slate-400 whitespace-nowrap mr-1">{ADD_ACCOUNTS_DATA.footer.suggestedLabel}</span>
                {ADD_ACCOUNTS_DATA.footer.suggestedItems.map((item: string, i: number) => (
                  <button key={i} className="shrink-0 px-3 py-1.5 rounded-full border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:border-slate-500 transition-colors flex items-center gap-1" suppressHydrationWarning>
                    <span className="material-symbols-outlined text-[14px]">add</span> {item}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

