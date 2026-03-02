"use client";

import { useMutation, useQuery } from "convex/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { api } from "../../../convex/_generated/api";
import { Id } from "../../../convex/_generated/dataModel";

export interface ExecutorAddAccountsProps {
  estateId: Id<"estates">;
}

const TIER_OPTIONS = [
  { value: "FINANCIAL", label: "Financial / High Value", icon: "account_balance", desc: "Banks, brokers, real estate" },
  { value: "IDENTITY", label: "Identity / Core", icon: "badge", desc: "Government, primary email, cell" },
  { value: "ADMIN", label: "Administrative", icon: "receipt_long", desc: "Utilities, subscriptions, insurance" },
  { value: "SENTIMENTAL", label: "Sentimental", icon: "favorite", desc: "Social media, photo storage" },
] as const;

export const ExecutorAddAccounts: React.FC<ExecutorAddAccountsProps> = ({ estateId }) => {
  const router = useRouter();
  const [serviceName, setServiceName] = useState("");
  const [selectedTier, setSelectedTier] = useState<typeof TIER_OPTIONS[number]["value"]>("FINANCIAL");
  const [saving, setSaving] = useState(false);

  // Fetch accounts added so far
  const accounts = useQuery(api.accounts.listAll, { estateId });
  const addAccount = useMutation(api.accounts.create);

  const handleAddAccount = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!serviceName.trim()) return;
    setSaving(true);
    try {
      await addAccount({
        estateId,
        serviceName: serviceName.trim(),
        tier: selectedTier as any, // Mapped to correct literal types in Convex
        discoveryMethod: "MANUAL",
      });
      setServiceName("");
      setSelectedTier("FINANCIAL");
    } catch (err) {
      console.error("Failed to add account:", err);
    } finally {
      setSaving(false);
    }
  };

  const handleContinue = () => {
    router.push(`/estate/${estateId}`);
  };

  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 min-h-screen flex flex-col md:flex-row overflow-hidden">
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
              <h1 className="text-3xl font-bold leading-tight mb-2">Identify Accounts</h1>
              <p className="text-slate-400 text-sm font-medium">Add Known Accounts</p>
            </div>
            
            <nav className="flex flex-col gap-1">
              <div className="flex items-center gap-4 px-3 py-3 rounded-lg cursor-pointer bg-white/10 text-primary border-l-4 border-primary">
                <span className="material-symbols-outlined text-xl">account_balance</span>
                <span className="text-sm font-medium">Add Accounts</span>
              </div>
            </nav>
          </div>
        </div>
        
        <div className="relative z-10 mt-8">
          <div className="flex flex-col gap-2 relative">
            <div className="flex items-start gap-3">
              <span className="material-symbols-outlined text-primary mt-1">info</span>
              <div>
                <h4 className="font-bold text-sm mb-1 text-white">Why add manually?</h4>
                <p className="text-[#9db7b9] text-sm leading-relaxed">
                  List any accounts you know belong to the estate. We will generate the secure closure letters and track the process for you.
                </p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Right Content Area (65%) */}
      <main className="w-full md:w-[65%] flex flex-col p-4 md:p-8 overflow-y-auto h-screen relative">
        <header className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-2 md:hidden">
            <div className="flex h-8 w-8 items-center justify-center rounded bg-primary text-background-dark">
              <span className="material-symbols-outlined">shield_lock</span>
            </div>
            <span className="text-xl font-serif font-bold tracking-tight text-slate-900 dark:text-white">
              Afterword
            </span>
          </div>
          <div className="hidden md:block"></div>
        </header>

        <div className="max-w-2xl w-full mx-auto flex-1 flex flex-col pb-24">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Add Known Accounts</h2>
            <p className="text-slate-600 dark:text-slate-400">
              Enter any accounts or services you know the creator used. We'll add them to the estate board for tracking.
            </p>
          </div>
          
          {/* Main Form Card */}
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 p-8 mb-8">
            <form className="flex flex-col gap-6" onSubmit={handleAddAccount}>
              <div className="flex flex-col">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Service Name</label>
                <input 
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 focus:ring-2 focus:ring-primary focus:border-primary transition-all text-slate-900 dark:text-white placeholder:text-slate-400" 
                  placeholder="e.g. Chase Bank, Netflix, PG&E" 
                  type="text"
                  value={serviceName}
                  onChange={(e) => setServiceName(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-3">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Urgency Tier</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {TIER_OPTIONS.map((tier) => (
                    <label 
                      key={tier.value} 
                      className={`relative flex items-start gap-3 p-4 border rounded-xl cursor-pointer transition-all ${
                        selectedTier === tier.value 
                          ? "border-primary bg-primary/5 dark:bg-primary/10" 
                          : "border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600"
                      }`}
                    >
                      <input 
                        type="radio" 
                        name="tier" 
                        value={tier.value}
                        checked={selectedTier === tier.value}
                        onChange={() => setSelectedTier(tier.value as any)}
                        className="sr-only"
                      />
                      <div className={`mt-0.5 flex items-center justify-center w-5 h-5 rounded-full border ${selectedTier === tier.value ? 'border-primary' : 'border-slate-300 dark:border-slate-600'}`}>
                        {selectedTier === tier.value && <div className="w-2.5 h-2.5 rounded-full bg-primary" />}
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5 mb-1">
                          <span className={`material-symbols-outlined text-[18px] ${selectedTier === tier.value ? 'text-primary' : 'text-slate-500'}`}>{tier.icon}</span>
                          <span className={`text-sm font-bold ${selectedTier === tier.value ? 'text-slate-900 dark:text-white' : 'text-slate-700 dark:text-slate-300'}`}>{tier.label}</span>
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 leading-tight block">{tier.desc}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
              
              <button 
                type="submit" 
                disabled={saving || !serviceName.trim()}
                className="w-full bg-primary hover:bg-[#0fbccb] disabled:opacity-50 text-slate-900 px-8 py-3.5 rounded-lg font-bold shadow-sm transition-all flex items-center justify-center gap-2 mt-2"
              >
                <span className="material-symbols-outlined text-[20px]">add_circle</span>
                <span>{saving ? "Adding..." : "Add Account"}</span>
              </button>
            </form>
          </div>

          {/* Accounts Added So Far */}
          {accounts && accounts.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3 flex justify-between items-center">
                <span>Added Accounts</span>
                <span className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-2 py-0.5 rounded text-sm">{accounts.length}</span>
              </h3>
              <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden divide-y divide-slate-100 dark:divide-slate-700/50">
                {accounts.map((acc: any, idx: number) => {
                  const tierOption = TIER_OPTIONS.find(t => t.value === acc.tier) || TIER_OPTIONS[0];
                  return (
                    <div key={idx} className="p-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-700 flex items-center justify-center">
                          <span className="material-symbols-outlined text-slate-400">{tierOption.icon}</span>
                        </div>
                        <div>
                          <p className="font-semibold text-sm text-slate-900 dark:text-white">{acc.serviceName}</p>
                          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{tierOption.label}</p>
                        </div>
                      </div>
                      <span className="bg-primary/10 text-primary text-xs font-bold px-2 py-1 rounded">MANUAL</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Sticky Footer */}
        <div className="fixed bottom-0 left-0 md:left-[35%] right-0 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm border-t border-slate-200 dark:border-slate-800 p-4 md:p-6 z-20">
          <div className="max-w-2xl w-full mx-auto flex items-center justify-end">
            <button 
              onClick={handleContinue}
              className="bg-primary hover:bg-[#0fbccb] disabled:opacity-50 text-slate-900 px-8 py-3 rounded-lg font-bold shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all transform hover:-translate-y-0.5 flex items-center gap-2"
            >
              <span>Continue to Dashboard</span>
              <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};
