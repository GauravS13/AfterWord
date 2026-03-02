"use client";

import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";
import { LANDING_PAGE_DATA } from "../../data/mockData";

export interface LandingPageProps { className?: string; }

export const LandingPage: React.FC<LandingPageProps> = () => {
  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col">
      {/* Navigation */}
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
            <SignedOut>
              <SignInButton>
                <button className="hidden text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white sm:block">
                  Log In
                </button>
              </SignInButton>
              <SignUpButton forceRedirectUrl="/setup/progress" signInFallbackRedirectUrl="/setup/progress">
                <button className="rounded-lg bg-secondary px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800 dark:bg-primary dark:text-background-dark dark:hover:bg-primary/90">
                  Get Started
                </button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-secondary py-20 sm:py-32 lg:pb-32 lg:pt-24 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop')" }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-b from-secondary/90 via-secondary/80 to-secondary"></div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="mx-auto max-w-4xl font-serif text-4xl font-medium tracking-tight text-white sm:text-6xl mb-6">
            {LANDING_PAGE_DATA.hero.headlinePrefix}
            <span className="text-primary">{LANDING_PAGE_DATA.hero.headlineHighlight}</span>
            {LANDING_PAGE_DATA.hero.headlineSuffix}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-300 font-light">
            {LANDING_PAGE_DATA.hero.subheadline}
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <SignedOut>
              <SignUpButton forceRedirectUrl="/setup/progress" signInFallbackRedirectUrl="/setup/progress">
                <button className="rounded-lg bg-primary px-8 py-3.5 text-base font-semibold text-background-dark shadow-sm hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary transition-all">
                  {LANDING_PAGE_DATA.hero.planButton}
                </button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <Link href="/setup/about-you" className="rounded-lg bg-primary px-8 py-3.5 text-base font-semibold text-background-dark shadow-sm hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary transition-all">
                Continue Planning
              </Link>
            </SignedIn>
            <Link href="/start" className="group flex items-center gap-2 rounded-lg border border-slate-400 px-8 py-3.5 text-base font-semibold text-white hover:bg-white hover:text-background-dark transition-all">
              {LANDING_PAGE_DATA.hero.helpButton}
              <span className="material-symbols-outlined text-sm group-hover:text-background-dark">arrow_forward</span>
            </Link>
          </div>

        </div>
      </section>

      {/* Trust Bar */}
      <div className="bg-white dark:bg-background-dark border-b border-slate-100 dark:border-slate-800">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {LANDING_PAGE_DATA.trustFeatures.map((feature, i) => (
              <div key={i} className="flex flex-col items-center text-center">
                <div className="mb-4 rounded-full bg-slate-50 p-3 dark:bg-slate-800 text-secondary dark:text-primary">
                  <span className="material-symbols-outlined text-3xl">{feature.icon}</span>
                </div>
                <h3 className="text-lg font-serif font-semibold text-slate-900 dark:text-white">{feature.title}</h3>
                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 max-w-xs">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Bar */}
   

      {/* Path Selection */}
      <section className="py-24 bg-background-light dark:bg-background-dark">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-serif font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
              Choose Your Path
            </h2>
            <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
              Tailored guidance whether you are preparing for the future or navigating the present.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {LANDING_PAGE_DATA.paths.map((path, i) => (
              <div key={i} className="group relative overflow-hidden rounded-2xl bg-white dark:bg-slate-900 shadow-sm border border-slate-200 dark:border-slate-800 transition hover:shadow-md">
                <div className="h-64 bg-slate-100 dark:bg-slate-800 overflow-hidden relative">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition duration-500 group-hover:scale-105"
                    style={{ backgroundImage: `url('${path.image}')` }}
                  ></div>
                  <div className={`absolute inset-0 mix-blend-multiply ${i === 0 ? "bg-primary/10" : "bg-indigo-900/10"}`}></div>
                </div>
                <div className="p-8">
                  <div className={`mb-4 inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${
                      i === 0 
                        ? "bg-primary/10 text-secondary dark:text-primary" 
                        : "bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-300"
                    }`}>
                    {path.type}
                  </div>
                  <h3 className="text-2xl font-serif font-semibold text-slate-900 dark:text-white">{path.title}</h3>
                  <p className="mt-4 text-slate-600 dark:text-slate-300 leading-relaxed">{path.description}</p>
                  <Link href={i === 0 ? "/dashboard/new" : "/start"} className={`mt-8 inline-flex items-center font-semibold hover:underline ${
                      i === 0 ? "text-secondary dark:text-primary" : "text-indigo-600 dark:text-indigo-400"
                    }`}>
                    {path.buttonText} <span className="material-symbols-outlined text-sm ml-2">arrow_forward</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Guardian Process */}
      <section className="py-24 bg-secondary text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="mb-16 md:w-2/3">
            <h2 className="text-3xl font-serif font-bold tracking-tight sm:text-4xl text-white">The Guardian Process</h2>
            <p className="mt-4 text-lg text-slate-300">How we ensure your data reaches the right hands at the right time.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-12">
            {LANDING_PAGE_DATA.guardianProcess.map((step, i) => (
              <div key={i} className="relative group">
                <div className="flex items-center mb-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-slate-600 group-hover:border-primary bg-secondary text-xl font-bold text-slate-400 group-hover:text-primary transition">
                    {i + 1}
                  </div>
                  {i < LANDING_PAGE_DATA.guardianProcess.length - 1 && (
                    <div className="h-0.5 w-full bg-slate-700 ml-4 hidden md:block"></div>
                  )}
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{step.title}</h3>
                <p className="text-slate-400">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Privacy Section */}
      <section className="py-24 bg-white dark:bg-background-dark">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-serif font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">Uncompromised Privacy</h2>
            <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">We are a technology company, not a data broker. Your legacy belongs to you.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {LANDING_PAGE_DATA.privacyFeatures.map((feature, i) => (
              <div key={i} className="flex flex-col rounded-xl bg-background-light dark:bg-slate-900 p-8 border border-transparent hover:border-slate-200 dark:hover:border-slate-700 transition">
                <div className="text-secondary dark:text-primary mb-6">
                  <span className="material-symbols-outlined text-4xl">{feature.icon}</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{feature.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 flex-grow">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

     

      {/* Footer */}
      <footer className="bg-white dark:bg-background-dark border-t border-slate-200 dark:border-slate-800 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="pt-8 border-t border-slate-100 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-slate-500">© 2026 Afterword Inc. All rights reserved.</p>
           
          </div>
        </div>
      </footer>
    </div>
  );
};

