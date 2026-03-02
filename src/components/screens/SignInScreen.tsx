"use client";

import { SignIn } from "@clerk/nextjs";
import React from "react";
import { CREATE_OWNER_ACCOUNT_DATA } from "../../data/mockData";

export interface SignInScreenProps { className?: string; }

export const SignInScreen: React.FC<SignInScreenProps> = () => {
  return (
    <div className="bg-background-light dark:bg-background-dark font-display antialiased text-slate-900 dark:text-slate-100 h-screen overflow-hidden flex flex-row">
      {/* Left Sidebar (35%) */}
      <aside className="hidden md:flex w-[35%] h-full bg-[#0A1618] text-white p-12 flex-col justify-between relative overflow-hidden">
        {/* Abstract Background Pattern */}
        <div 
          className="absolute inset-0 opacity-10 pointer-events-none" 
          style={{ backgroundImage: "radial-gradient(#13daec 1px, transparent 1px)", backgroundSize: "32px 32px" }}
        ></div>
        
        <div className="relative z-10">
          <h1 className="text-2xl font-bold tracking-tight mb-20 text-white">Afterword</h1>
          <div className="flex flex-col gap-8">
            {CREATE_OWNER_ACCOUNT_DATA.sidebarSteps.map((step, i) => (
              <div key={i} className={`flex items-center gap-4 ${step.active ? '' : 'opacity-40'}`}>
                <span className={`material-symbols-outlined text-[24px] ${step.active ? 'text-primary' : 'text-white'}`}>
                  {step.active ? "radio_button_checked" : "radio_button_unchecked"}
                </span>
                <span className={`text-lg font-medium ${step.active ? 'text-white' : ''}`}>
                  {step.label}
                </span>
              </div>
            ))}
          </div>
          
          <div className="mt-12">
            <p className="text-[#13ecec] text-sm font-medium mb-2">Welcome Back</p>
            <div className="w-full h-[2px] bg-[#1c3535] rounded-full">
              <div className="w-full h-full bg-[#13ecec] rounded-full shadow-[0_0_10px_#13ecec]"></div>
            </div>
          </div>
        </div>
        
        <div className="relative z-10">
          <span className="material-symbols-outlined text-primary text-4xl mb-6 block">format_quote</span>
          <p className="text-xl md:text-2xl font-light leading-relaxed text-slate-200">
            {CREATE_OWNER_ACCOUNT_DATA.quote}
          </p>
        </div>
      </aside>

      {/* Right Content (65%) */}
      <main className="w-full md:w-[65%] h-full flex flex-col items-center justify-center p-4 sm:p-8 overflow-y-auto bg-[#102222]">
        <SignIn routing="hash" signUpUrl="/sign-up" forceRedirectUrl="/setup/progress" fallbackRedirectUrl="/setup/progress" />
      </main>
    </div>
  );
};
