"use client";

import Link from "next/link";
import React, { useState } from "react";
import { ESTATE_INTAKE_DATA } from "../../data/mockData";
import { US_STATES } from "../../lib/constants";

export interface EstateIntakeProps { className?: string; }

export const EstateIntake: React.FC<EstateIntakeProps> = () => {
  const [selectedRel, setSelectedRel] = useState<string>("Child");

  return (
    <div className="bg-[#f6f8f8] dark:bg-[#102222] font-display min-h-screen flex items-center justify-center p-4">
      {/* Main Container Card */}
      <div className="w-full max-w-[1200px] h-[90vh] bg-white dark:bg-[#1a2e2e] rounded-xl shadow-2xl overflow-hidden flex flex-col md:flex-row border border-slate-200 dark:border-slate-700">
        
        {/* Left Sidebar (35% width on desktop) */}
        <div className="w-full md:w-[35%] bg-[#102222] text-white p-8 md:p-12 flex flex-col justify-between relative overflow-hidden">
          {/* Decorative Background Element */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#13ecec]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          
          <div className="relative z-10">
            {/* Logo */}
            <div className="flex items-center gap-2 mb-12">
              <span className="material-symbols-outlined text-[#13ecec] text-3xl">{ESTATE_INTAKE_DATA.sidebar.logoIcon}</span>
              <h1 className="text-xl font-bold tracking-tight">{ESTATE_INTAKE_DATA.sidebar.logoText}</h1>
            </div>
            
            {/* Step Indicator */}
            <div className="flex flex-col gap-8">
              {ESTATE_INTAKE_DATA.sidebar.steps.map((step, idx) => (
                <div key={idx} className={`flex items-center gap-4 ${!step.active ? 'opacity-40' : ''}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${step.active ? 'bg-[#13ecec] text-[#102222]' : 'border border-white/30'}`}>
                    {step.number}
                  </div>
                  <span className="font-medium text-white/90">{step.text}</span>
                </div>
              ))}
              {/* Vertical Line connecting steps */}
              <div className="absolute left-[47px] md:left-[63px] top-[140px] w-[1px] h-24 bg-gradient-to-b from-[#13ecec]/50 to-transparent"></div>
            </div>
          </div>
          
          {/* Quote/Footer */}
          <div className="relative z-10 mt-12 md:mt-0">
            <span className="material-symbols-outlined text-[#13ecec]/40 text-4xl mb-4 block">{ESTATE_INTAKE_DATA.sidebar.quoteIcon}</span>
            <p className="text-lg md:text-xl font-light leading-relaxed text-white/80 italic">
              {ESTATE_INTAKE_DATA.sidebar.quoteText}
            </p>
          </div>
        </div>
        
        {/* Main Form Area (65% width on desktop) */}
        <div className="w-full md:w-[65%] p-8 md:p-12 overflow-y-auto bg-white dark:bg-[#1a2e2e]">
          <div className="max-w-[640px] mx-auto">
            <header className="mb-8">
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">{ESTATE_INTAKE_DATA.form.headerTitle}</h2>
              <p className="text-slate-500 dark:text-slate-400">{ESTATE_INTAKE_DATA.form.headerDesc}</p>
            </header>
            
            <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
              {/* Deceased Details */}
              <div className="space-y-6">
                <label className="block">
                  <span className="text-sm font-semibold text-slate-700 dark:text-slate-200 mb-1 block">{ESTATE_INTAKE_DATA.form.deceasedNameLabel}</span>
                  <input className="w-full h-12 px-4 rounded-lg border-slate-200 dark:border-slate-600 bg-[#f6f8f8] dark:bg-black/20 focus:border-[#13ecec] focus:ring-[#13ecec] text-slate-900 dark:text-white" placeholder={ESTATE_INTAKE_DATA.form.deceasedNamePlaceholder} type="text" />
                </label>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Date of Death */}
                  <div className="space-y-1">
                    <span className="text-sm font-semibold text-slate-700 dark:text-slate-200 block">{ESTATE_INTAKE_DATA.form.dodLabel}</span>
                    <div className="flex gap-2">
                      <select defaultValue="" className="flex-1 h-12 rounded-lg border-slate-200 dark:border-slate-600 bg-[#f6f8f8] dark:bg-black/20 focus:border-[#13ecec] focus:ring-[#13ecec] text-slate-900 dark:text-white px-3">
                        <option disabled value="">Month</option>
                        <option value="1">Jan</option>
                        <option value="2">Feb</option>
                      </select>
                      <select defaultValue="" className="w-20 h-12 rounded-lg border-slate-200 dark:border-slate-600 bg-[#f6f8f8] dark:bg-black/20 focus:border-[#13ecec] focus:ring-[#13ecec] text-slate-900 dark:text-white px-3">
                        <option disabled value="">Day</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                      </select>
                      <input className="w-24 h-12 rounded-lg border-slate-200 dark:border-slate-600 bg-[#f6f8f8] dark:bg-black/20 focus:border-[#13ecec] focus:ring-[#13ecec] text-slate-900 dark:text-white px-3" placeholder="Year" type="text" />
                    </div>
                  </div>
                  
                  {/* State Selection */}
                  <div className="space-y-1">
                    <span className="text-sm font-semibold text-slate-700 dark:text-slate-200 block">{ESTATE_INTAKE_DATA.form.stateLabel}</span>
                    <div className="relative">
                      <select defaultValue="CA" className="w-full h-12 rounded-lg border-slate-200 dark:border-slate-600 bg-[#f6f8f8] dark:bg-black/20 focus:border-[#13ecec] focus:ring-[#13ecec] text-slate-900 dark:text-white px-4 appearance-none">
                        <option value="">Select a state...</option>
                        {US_STATES.map((st) => (
                          <option key={st.value} value={st.value}>{st.label}</option>
                        ))}
                      </select>
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none material-symbols-outlined text-slate-400">expand_more</span>
                    </div>
                    {/* RUFADAA Badge */}
                    <div className="flex items-center gap-1.5 mt-2 text-xs font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 px-2 py-1 rounded w-fit">
                      <span className="material-symbols-outlined text-[14px]">check_circle</span>
                      {ESTATE_INTAKE_DATA.form.rufadaaText}
                    </div>
                  </div>
                </div>
                
                {/* Optional DOB Toggle */}
                <div className="flex items-center justify-between py-2">
                  <span className="text-sm text-slate-600 dark:text-slate-300">{ESTATE_INTAKE_DATA.form.dobToggleText}</span>
                  <button className="w-11 h-6 bg-slate-200 dark:bg-slate-600 rounded-full relative transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#13ecec] focus:ring-offset-2" type="button">
                    <span className="translate-x-1 inline-block h-4 w-4 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"></span>
                  </button>
                </div>
              </div>
              
              <hr className="border-slate-100 dark:border-slate-700" />
              
              {/* Executor Section */}
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white whitespace-nowrap">{ESTATE_INTAKE_DATA.form.aboutYouTitle}</h3>
                  <div className="h-px bg-slate-100 dark:bg-slate-700 w-full"></div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <label className="block">
                    <span className="text-sm font-semibold text-slate-700 dark:text-slate-200 mb-1 block">{ESTATE_INTAKE_DATA.form.yourNameLabel}</span>
                    <input className="w-full h-12 px-4 rounded-lg border-slate-200 dark:border-slate-600 bg-[#f6f8f8] dark:bg-black/20 focus:border-[#13ecec] focus:ring-[#13ecec] text-slate-900 dark:text-white" type="text" defaultValue={ESTATE_INTAKE_DATA.form.yourNameDefault} />
                  </label>
                  
                  <div className="block">
                    <span className="text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2 block">{ESTATE_INTAKE_DATA.form.relationshipLabel}</span>
                    <div className="flex flex-wrap gap-2">
                      {ESTATE_INTAKE_DATA.form.relationships.map((rel, idx) => (
                        <button 
                          key={idx}
                          onClick={() => setSelectedRel(rel)}
                          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${selectedRel === rel ? 'bg-[#13ecec] text-[#102222] ring-1 ring-[#13ecec]' : 'bg-white dark:bg-transparent border border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300 hover:border-[#13ecec] hover:text-[#13ecec]'}`} 
                          type="button"
                        >
                          {rel}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* CTA */}
              <div className="pt-4 flex justify-end">
                <Link href={ESTATE_INTAKE_DATA.form.continueHref} className="group flex items-center justify-center gap-2 bg-[#13ecec] hover:bg-[#0fd6d6] text-[#102222] font-semibold py-3 px-8 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md active:scale-95">
                  {ESTATE_INTAKE_DATA.form.continueButton}
                  <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform text-lg">arrow_forward</span>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

