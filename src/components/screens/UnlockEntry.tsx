"use client";

import React from "react";
import { UNLOCK_FLOW_DATA } from "../../data/mockData";
import { US_STATES } from "../../lib/constants";

export interface UnlockEntryProps {
  onSearch: (found: boolean) => void;
}

export const UnlockEntry: React.FC<UnlockEntryProps> = ({ onSearch }) => {
  const [selectedRel, setSelectedRel] = React.useState<string | null>(null);

  return (
    <div className="bg-background-light dark:bg-background-dark font-display antialiased min-h-screen flex flex-col items-center justify-center text-slate-900 dark:text-slate-100">
      <main className="w-full max-w-[640px] px-6 py-12 flex flex-col items-center">
        {/* Header Section */}
        <div className="text-center mb-10 space-y-4">
          <div className="inline-flex items-center justify-center size-12 rounded-full bg-primary/10 mb-4">
            <span className="material-symbols-outlined text-primary text-2xl">{UNLOCK_FLOW_DATA.entry.icon}</span>
          </div>
          <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">{UNLOCK_FLOW_DATA.entry.subtitle}</p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-slate-50">{UNLOCK_FLOW_DATA.entry.title}</h1>
        </div>
        
        {/* Form Section */}
        <div className="w-full space-y-8">
          {/* Name Input */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300" htmlFor="deceased-name">
              {UNLOCK_FLOW_DATA.entry.nameLabel}
            </label>
            <input 
              className="block w-full border-0 border-b-2 border-slate-200 dark:border-slate-700 bg-transparent py-3 px-0 text-lg text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:border-primary focus:ring-0 transition-colors" 
              id="deceased-name" 
              placeholder={UNLOCK_FLOW_DATA.entry.namePlaceholder} 
              type="text" 
            />
          </div>
          
          {/* Date of Passing */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
              {UNLOCK_FLOW_DATA.entry.dateLabel}
            </label>
            <div className="grid grid-cols-3 gap-4">
              <div className="relative">
                <select defaultValue="" className="block w-full appearance-none border-0 border-b-2 border-slate-200 dark:border-slate-700 bg-transparent py-3 pl-0 pr-8 text-lg text-slate-900 dark:text-slate-100 focus:border-primary focus:ring-0 transition-colors cursor-pointer">
                  <option disabled value="">Month</option>
                  <option value="1">January</option>
                  <option value="2">February</option>
                  <option value="3">March</option>
                </select>
                <span className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 text-slate-500">
                  <span className="material-symbols-outlined text-sm">expand_more</span>
                </span>
              </div>
              <div className="relative">
                <select defaultValue="" className="block w-full appearance-none border-0 border-b-2 border-slate-200 dark:border-slate-700 bg-transparent py-3 pl-0 pr-8 text-lg text-slate-900 dark:text-slate-100 focus:border-primary focus:ring-0 transition-colors cursor-pointer">
                  <option disabled value="">Day</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                </select>
                <span className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 text-slate-500">
                  <span className="material-symbols-outlined text-sm">expand_more</span>
                </span>
              </div>
              <div className="relative">
                <select defaultValue="" className="block w-full appearance-none border-0 border-b-2 border-slate-200 dark:border-slate-700 bg-transparent py-3 pl-0 pr-8 text-lg text-slate-900 dark:text-slate-100 focus:border-primary focus:ring-0 transition-colors cursor-pointer">
                  <option disabled value="">Year</option>
                  <option value="2024">2024</option>
                  <option value="2023">2023</option>
                  <option value="2022">2022</option>
                </select>
                <span className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 text-slate-500">
                  <span className="material-symbols-outlined text-sm">expand_more</span>
                </span>
              </div>
            </div>
          </div>
          
          {/* State Input */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300" htmlFor="state">
              {UNLOCK_FLOW_DATA.entry.stateLabel}
            </label>
            <div className="relative">
              <select defaultValue="" className="block w-full appearance-none border-0 border-b-2 border-slate-200 dark:border-slate-700 bg-transparent py-3 pl-0 pr-8 text-lg text-slate-900 dark:text-slate-100 focus:border-primary focus:ring-0 transition-colors cursor-pointer" id="state">
                <option disabled value="">Select a state</option>
                {US_STATES.map((st) => (
                  <option key={st.value} value={st.value}>{st.label}</option>
                ))}
              </select>
              <span className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 text-slate-500">
                <span className="material-symbols-outlined text-sm">expand_more</span>
              </span>
            </div>
          </div>
          
          {/* Relationship Pills */}
          <div className="space-y-3 pt-2">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
              {UNLOCK_FLOW_DATA.entry.relationshipLabel}
            </label>
            <div className="flex flex-wrap gap-3">
              {UNLOCK_FLOW_DATA.entry.relationships.map((rel: string, idx: number) => (
                <button 
                  key={idx}
                  onClick={() => setSelectedRel(rel)}
                  className={`px-5 py-2.5 rounded-full border transition-colors text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/50 ${selectedRel === rel ? 'border-primary bg-primary/10 text-primary' : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:border-primary hover:text-primary dark:hover:border-primary dark:hover:text-primary'}`} 
                  type="button"
                >
                  {rel}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        {/* Disclosure & CTA */}
        <div className="w-full mt-12 flex flex-col items-center gap-6">
          <button className="text-primary hover:text-primary/80 transition-colors text-sm font-medium flex items-center gap-1 group">
            {UNLOCK_FLOW_DATA.entry.faqLink}
            <span className="material-symbols-outlined text-base group-hover:translate-x-0.5 transition-transform">arrow_forward_ios</span>
          </button>
          
          {/* For demonstration purposes, passing true means Match Found (B-02), passing false means No Match (B-03) */}
          <div className="flex gap-4 w-full justify-center">
            <button 
              onClick={() => onSearch(true)}
              className="w-full sm:w-auto min-w-[200px] bg-primary text-slate-900 font-bold text-lg py-4 px-8 rounded-xl shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
            >
              {UNLOCK_FLOW_DATA.entry.submitButton} <span className="text-xs font-normal">(Match)</span>
              <span className="material-symbols-outlined">arrow_forward</span>
            </button>
            <button 
              onClick={() => onSearch(false)}
              className="w-full sm:w-auto min-w-[200px] bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-white font-bold text-lg py-4 px-8 rounded-xl shadow-lg hover:bg-slate-300 dark:hover:bg-slate-700 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
            >
              {UNLOCK_FLOW_DATA.entry.submitButton} <span className="text-xs font-normal">(No Match)</span>
              <span className="material-symbols-outlined">arrow_forward</span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

