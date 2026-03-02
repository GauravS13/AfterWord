"use client";

import { UserButton } from "@clerk/nextjs";
import { useMutation, useQuery } from "convex/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { api } from "../../../convex/_generated/api";
import { PERSONAL_DETAILS_DATA } from "../../data/mockData";

export interface PersonalDetailsProps { className?: string; }

export const PersonalDetails: React.FC<PersonalDetailsProps> = () => {
  const router = useRouter();
  const updatePersonalDetails = useMutation(api.owners.updatePersonalDetails);
  const createOrGetOwner = useMutation(api.owners.createOrGetOwner);
  const existingOwner = useQuery(api.owners.getOwner);

  
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDob] = useState("");
  const [state, setState] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Pre-fill form if data exists
  React.useEffect(() => {
    if (existingOwner) {
      if (existingOwner.fullNameEnc) {
        const parts = existingOwner.fullNameEnc.split(" ");
        setFirstName(parts[0] || "");
        setLastName(parts.slice(1).join(" ") || "");
      }
      if (existingOwner.dob) setDob(existingOwner.dob);
      if (existingOwner.state) setState(existingOwner.state);
    }
  }, [existingOwner]);

  // Create the base Owner row from the Clerk Subject as soon as we arrive
  React.useEffect(() => {
    createOrGetOwner().catch(console.error);
  }, [createOrGetOwner]);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName || !lastName || !dob || !state) {
      setError("Please fill out all fields.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const fullNameEnc = `${firstName} ${lastName}`;
      
      await updatePersonalDetails({
        fullNameEnc,
        dob,
        state,
      });

      router.push("/setup/accounts");
    } catch (err: any) {
      setError(err.message || "Failed to save details.");
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
                <h1 className="text-3xl font-bold leading-tight mb-2">Personal Details</h1>
                <p className="text-slate-400 text-sm font-medium">{PERSONAL_DETAILS_DATA.stepInfo}</p>
              </div>
              
              <nav className="flex flex-col gap-1">
                {PERSONAL_DETAILS_DATA.sidebarSteps.map((step, i) => (
                  <div key={i} className={`flex items-center gap-4 px-3 py-3 rounded-lg cursor-pointer ${step.active ? 'bg-white/10 text-primary border-l-4 border-primary' : 'opacity-60 hover:opacity-100 transition-opacity'}`}>
                    <span className="material-symbols-outlined text-xl">{step.icon}</span>
                    <span className="text-sm font-medium">{step.label}</span>
                  </div>
                ))}
              </nav>
            </div>
          </div>
          
          <div className="relative z-10 text-xs text-slate-500 mt-8">
            <p>{PERSONAL_DETAILS_DATA.copyright}</p>
          </div>
        </aside>

        {/* Right Content Area (65%) */}
        <main className="w-full md:w-[65%] flex flex-col items-center p-4 md:p-8 overflow-y-auto">
          <div className="w-full max-w-2xl pt-8 md:pt-16">
            {/* Main Form Card */}
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 p-8 md:p-10 mb-6">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                  {PERSONAL_DETAILS_DATA.form.title}
                </h2>
                <p className="text-slate-500 dark:text-slate-400">
                  {PERSONAL_DETAILS_DATA.form.subtitle}
                </p>
              </div>
              
              <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
                {/* Full Name */}
                <div className="flex flex-col md:flex-row gap-6">
                  <label className="flex flex-col flex-1">
                    <span className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                      {PERSONAL_DETAILS_DATA.form.firstNameLabel}
                    </span>
                    <div className="relative">
                      <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[20px]">badge</span>
                      <input 
                        className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 focus:ring-2 focus:ring-primary focus:border-primary transition-all text-slate-900 dark:text-white placeholder:text-slate-400" 
                        placeholder={PERSONAL_DETAILS_DATA.form.firstNamePlaceholder} 
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        suppressHydrationWarning
                      />
                    </div>
                  </label>
                  
                  <label className="flex flex-col flex-1">
                    <span className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                      {PERSONAL_DETAILS_DATA.form.lastNameLabel}
                    </span>
                    <div className="relative">
                      <input 
                        className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 focus:ring-2 focus:ring-primary focus:border-primary transition-all text-slate-900 dark:text-white placeholder:text-slate-400" 
                        placeholder={PERSONAL_DETAILS_DATA.form.lastNamePlaceholder} 
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        suppressHydrationWarning
                      />
                    </div>
                  </label>
                </div>

                {/* DOB & State */}
                <div className="flex flex-col md:flex-row gap-6">
                  <label className="flex flex-col flex-1">
                    <span className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                      {PERSONAL_DETAILS_DATA.form.dobLabel}
                    </span>
                    <div className="relative">
                      <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[20px]">calendar_today</span>
                      <input 
                        className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 focus:ring-2 focus:ring-primary focus:border-primary transition-all text-slate-900 dark:text-white placeholder:text-slate-400 [color-scheme:light] dark:[color-scheme:dark]" 
                        placeholder={PERSONAL_DETAILS_DATA.form.dobPlaceholder} 
                        type="date"
                        value={dob}
                        onChange={(e) => setDob(e.target.value)}
                        suppressHydrationWarning
                      />
                    </div>
                  </label>
                  
                  <label className="flex flex-col flex-1">
                    <span className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                      {PERSONAL_DETAILS_DATA.form.stateLabel}
                    </span>
                    <div className="relative">
                      <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[20px]">location_on</span>
                      <select value={state} onChange={(e) => setState(e.target.value)} className="w-full pl-10 pr-10 py-3 rounded-lg border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 focus:ring-2 focus:ring-primary focus:border-primary transition-all text-slate-900 dark:text-white appearance-none cursor-pointer" suppressHydrationWarning>
                        <option disabled value="">{PERSONAL_DETAILS_DATA.form.statePlaceholder}</option>
                        {PERSONAL_DETAILS_DATA.form.states.map(st => (
                          <option key={st.value} value={st.value}>{st.label}</option>
                        ))}
                      </select>
                      <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-[20px] pointer-events-none">expand_more</span>
                    </div>
                  </label>
                </div>

                {error && (
                  <div className="flex items-start gap-3 bg-red-900/30 mt-2 p-4 rounded-md border border-red-900/50">
                    <span className="material-symbols-outlined text-red-400 text-xl shrink-0">error</span>
                    <p className="text-sm text-red-400 leading-snug">{error}</p>
                  </div>
                )}

                {/* Actions */}
                <div className="flex items-center justify-between pt-2">
                  <button type="button" onClick={() => router.back()} className="px-6 py-3 rounded-lg text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white font-medium transition-colors flex items-center gap-2" suppressHydrationWarning>
                    <span className="material-symbols-outlined">arrow_back</span>
                    {PERSONAL_DETAILS_DATA.actions.back}
                  </button>
                  <button type="submit" disabled={loading} className="bg-primary hover:bg-[#0fbccb] disabled:opacity-50 text-slate-900 px-8 py-3.5 rounded-lg font-bold shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all transform hover:-translate-y-0.5 flex items-center gap-2" suppressHydrationWarning>
                    {loading ? "Saving..." : PERSONAL_DETAILS_DATA.actions.continue}
                    {!loading && <span className="material-symbols-outlined text-[20px]">arrow_forward</span>}
                  </button>
                </div>
              </form>
            </div>

            {/* Preview Box (Key Feature) */}
            <div className="bg-primary/5 dark:bg-primary/10 border border-primary/40 dark:border-primary/30 rounded-xl p-6 mb-8 relative overflow-hidden pointer-events-none">
              <span className="material-symbols-outlined absolute -right-4 -bottom-4 text-primary/10 text-9xl pointer-events-none select-none">family_restroom</span>
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-primary/20 p-2 rounded-full">
                    <span className="material-symbols-outlined text-primary-dark text-primary">visibility</span>
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                    {PERSONAL_DETAILS_DATA.preview.title}
                  </h3>
                </div>
                <p className="text-slate-700 dark:text-slate-300 mb-4 text-sm leading-relaxed">
                  {PERSONAL_DETAILS_DATA.preview.description}
                </p>
                <div className="flex flex-wrap gap-3">
                  {PERSONAL_DETAILS_DATA.preview.items.map((item, i) => (
                    <span key={i} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-600 dark:text-slate-300 shadow-sm">
                      <span className="material-symbols-outlined text-[16px] text-primary">check_circle</span>
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
