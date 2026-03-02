"use client";

import { UserButton, useUser } from "@clerk/nextjs";
import { useMutation, useQuery } from "convex/react";
import Link from "next/link";
import React, { useState } from "react";
import { api } from "../../../convex/_generated/api";
import { Id } from "../../../convex/_generated/dataModel";

export interface OwnerVaultDashboardProps { className?: string; }

export const OwnerVaultDashboard: React.FC<OwnerVaultDashboardProps> = () => {
  const { user } = useUser();
  const accounts = useQuery(api.owners.getOwnerAccounts);
  const invitees = useQuery(api.invitees.getOwnerInvitees);
  const deleteInvitee = useMutation(api.invitees.deleteInvitee);
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  
  // Calculate completion
  const financialAccs = accounts?.filter(a => a.tier === "FINANCIAL") || [];
  const identityAccs = accounts?.filter(a => a.tier === "IDENTITY") || [];
  const completionPercent = accounts?.length ? Math.min(100, accounts.length * 15) : 0; // Simple heuristic for hackathon

  // Group accounts by tier for display
  const accountSections = [
    {
      title: "Financial Accounts",
      icon: "account_balance",
      iconColor: "emerald-500",
      accounts: financialAccs.map(a => ({
        name: a.serviceName,
        tier: "Financial Tier",
        icon: "account_balance",
        iconColor: "emerald-500",
        updatedAt: new Date(a.createdAt).toLocaleDateString(),
        note: a.notesEnc,
      }))
    },
    {
      title: "Identity & Government",
      icon: "badge",
      iconColor: "blue-500",
      accounts: identityAccs.map(a => ({
        name: a.serviceName,
        tier: "Identity Tier",
        icon: "badge",
        iconColor: "blue-500",
        updatedAt: new Date(a.createdAt).toLocaleDateString(),
        note: a.notesEnc,
      }))
    }
  ].filter(section => section.accounts.length > 0);

  const people = (invitees || []).map(inv => ({
    name: inv.nameEnc,
    role: inv.role === "EXECUTOR" ? "Primary Executor" : (inv.role === "CO_EXECUTOR" ? "Backup Executor" : "Memorial Contact"),
    roleColor: inv.role === "EXECUTOR" ? "primary" : "slate-500",
    roleColorDark: inv.role === "EXECUTOR" ? "primary" : "slate-400",
    avatarUrl: `https://api.dicebear.com/7.x/initials/svg?seed=${inv.nameEnc}`
  }));

  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 min-h-screen flex flex-col antialiased selection:bg-primary/30">
      {/* Top Navigation */}
      <header className="sticky top-0 z-50 flex items-center justify-between border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md px-6 py-4 lg:px-12">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <span className="material-symbols-outlined">shield_lock</span>
            </div>
            <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">Afterword</h2>
          </Link>
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/dashboard" className="text-sm font-medium transition-colors text-slate-900 dark:text-white border-b-2 border-primary pb-0.5">Dashboard</Link>
            <Link href="/preview" className="text-sm font-medium transition-colors text-slate-600 hover:text-primary dark:text-slate-400 dark:hover:text-primary">Vault</Link>
            <Link href="/executors" className="text-sm font-medium transition-colors text-slate-600 hover:text-primary dark:text-slate-400 dark:hover:text-primary">Executors</Link>
            <Link href="/settings" className="text-sm font-medium transition-colors text-slate-600 hover:text-primary dark:text-slate-400 dark:hover:text-primary">Settings</Link>
          </nav>
        </div>
        <div className="flex items-center gap-6">
          <div className="relative hidden w-64 md:block">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
              <span className="material-symbols-outlined text-[20px]">search</span>
            </span>
            <input 
              className="w-full rounded-lg border-none bg-slate-100 dark:bg-slate-800 py-2 pl-10 pr-4 text-sm text-slate-900 dark:text-white placeholder:text-slate-500 focus:ring-2 focus:ring-primary" 
              placeholder="Search accounts..." 
              type="text"
            />
          </div>
          <button onClick={() => alert("You have no new notifications at this time.")} className="relative rounded-full bg-slate-100 p-2 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-primary transition-colors">
            <span className="material-symbols-outlined">notifications</span>
            {accounts?.length === 0 && (
              <span className="absolute top-1.5 right-1.5 size-2 rounded-full bg-amber-500 ring-2 ring-white dark:ring-background-dark"></span>
            )}
          </button>
          <UserButton afterSignOutUrl="/" />
        </div>
      </header>

      <main className="flex-1 px-6 py-8 lg:px-12 xl:px-24 max-w-7xl mx-auto w-full">
        {/* Hero / Progress Section */}
        <section className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between rounded-xl bg-white dark:bg-slate-900 p-6 shadow-sm border border-slate-100 dark:border-slate-800">
          <div className="flex-1">
            <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white mb-2">Your Digital Estate</h1>
            <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
              <span className="material-symbols-outlined text-primary text-[20px]">lightbulb</span>
              <p className="text-sm">Pro Tip: Add government accounts to reach 90% completion.</p>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex flex-col items-end">
              <span className="text-3xl font-bold text-slate-900 dark:text-white">{completionPercent}%</span>
              <span className="text-xs font-medium uppercase tracking-wider text-slate-400">Completion</span>
            </div>
            <div className="relative size-16">
              <svg className="size-full -rotate-90" height="64" viewBox="0 0 64 64" width="64">
                <circle className="text-slate-100 dark:text-slate-800" cx="32" cy="32" fill="transparent" r="26" stroke="currentColor" strokeWidth="6"></circle>
                <circle 
                  className="text-primary transition-all duration-300 ease-in-out" 
                  cx="32" cy="32" fill="transparent" r="26" stroke="currentColor" 
                  strokeDasharray="163.36" strokeDashoffset={`${163.36 - (163.36 * completionPercent) / 100}`} 
                  strokeLinecap="round" strokeWidth="6"
                ></circle>
              </svg>
            </div>
            <Link href="/setup/accounts" className="ml-4 flex h-10 items-center justify-center gap-2 rounded-lg bg-primary px-5 text-sm font-bold text-slate-900 shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all">
              <span className="material-symbols-outlined text-[20px]">add</span>
              <span>Add Account</span>
            </Link>
          </div>
        </section>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Main Content: Account Lists */}
          <div className="lg:col-span-2 flex flex-col gap-8">
            {accountSections.length === 0 ? (
               <div className="text-center py-12 bg-white dark:bg-slate-900 rounded-xl border border-dashed border-slate-300 dark:border-slate-700">
                 <span className="material-symbols-outlined text-4xl text-slate-300 dark:text-slate-600 mb-2">inventory_2</span>
                 <h3 className="text-lg font-bold text-slate-900 dark:text-white">No accounts yet</h3>
                 <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 mb-4">Start securing your digital footprint.</p>
                 <Link href="/setup/accounts" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium">
                   <span className="material-symbols-outlined text-[18px]">add</span> Add your first account
                 </Link>
               </div>
            ) : accountSections.map((section, idx) => (
              <div key={idx}>
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <span className={`material-symbols-outlined text-${section.iconColor}`}>{section.icon}</span>
                    {section.title}
                  </h2>
                  <button className="text-sm font-medium text-slate-500 hover:text-primary transition-colors">Manage</button>
                </div>
                <div className="flex flex-col gap-3">
                  {section.accounts.map((acc, aIdx) => (
                    <div key={aIdx} className="group relative flex flex-col gap-4 rounded-xl bg-white dark:bg-slate-900 p-5 shadow-sm border border-slate-100 dark:border-slate-800 hover:border-primary/30 transition-all hover:shadow-md">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-4">
                          <div className={`flex size-12 items-center justify-center rounded-lg bg-slate-50 dark:bg-slate-800 p-2 border border-slate-100 dark:border-slate-700`}>
                            <span className={`material-symbols-outlined text-3xl text-${acc.iconColor || 'slate-400'}`}>{acc.icon}</span>
                          </div>
                          <div>
                            <h3 className="font-bold text-slate-900 dark:text-white">{acc.name}</h3>
                            <div className="mt-1 flex items-center gap-2">
                              <span className="inline-flex items-center rounded-md bg-emerald-50 dark:bg-emerald-900/30 px-2 py-0.5 text-xs font-medium text-emerald-700 dark:text-emerald-300 ring-1 ring-inset ring-emerald-600/10">{acc.tier}</span>
                              <span className="text-xs text-slate-400">• Added {acc.updatedAt}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button className="p-2 text-slate-400 hover:text-primary hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition-colors">
                            <span className="material-symbols-outlined text-[20px]">edit</span>
                          </button>
                        </div>
                      </div>
                      {acc.note && (
                        <div className="rounded-lg bg-slate-50 dark:bg-slate-800/50 p-3">
                          <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-1">
                            <span className="font-medium text-slate-900 dark:text-slate-200">Note: </span> 
                            {acc.note}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Sidebar: People & Actions */}
          <div className="flex flex-col gap-8">
            {/* Your People */}
            <div className="rounded-xl bg-white dark:bg-slate-900 p-6 shadow-sm border border-slate-100 dark:border-slate-800">
              <div className="mb-6">
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">Your People</h2>
                <p className="text-xs text-slate-500 mt-1">Notified only after date of passing is confirmed.</p>
              </div>
              <div className="flex flex-col gap-4">
                {people.length === 0 ? (
                  <div className="text-sm text-slate-500 dark:text-slate-400 text-center py-4">No trusted contacts added yet.</div>
                ) : people.map((person, pIdx) => (
                  <div key={pIdx} className="flex items-center gap-3">
                    <div 
                      className="size-10 overflow-hidden rounded-full bg-slate-200 bg-cover bg-center" 
                      style={{ backgroundImage: `url("${person.avatarUrl}")` }}
                    ></div>
                    <div className="flex-1">
                      <p className="text-sm font-bold text-slate-900 dark:text-white">{person.name}</p>
                      <p className={`text-xs font-medium text-${person.roleColor} dark:text-${person.roleColorDark}`}>{person.role}</p>
                    </div>
                    <div className="relative">
                      <button onClick={() => setOpenMenuId(openMenuId === pIdx ? null : pIdx)} className="text-slate-400 hover:text-primary">
                        <span className="material-symbols-outlined text-[20px]">more_vert</span>
                      </button>
                      {openMenuId === pIdx && (
                        <div className="absolute right-0 top-8 z-50 w-44 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-xl py-1 animate-in fade-in slide-in-from-top-1">
                          <button
                            onClick={async () => {
                              const inv = (invitees || [])[pIdx];
                              if (inv && confirm(`Remove ${inv.nameEnc} as a trusted contact?`)) {
                                await deleteInvitee({ inviteeId: inv._id as Id<"invitees"> });
                              }
                              setOpenMenuId(null);
                            }}
                            className="flex w-full items-center gap-2 px-4 py-2 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                          >
                            <span className="material-symbols-outlined text-[18px]">delete</span>
                            Remove Contact
                          </button>
                          <button
                            onClick={() => {
                              alert("Invitation resent!");
                              setOpenMenuId(null);
                            }}
                            className="flex w-full items-center gap-2 px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                          >
                            <span className="material-symbols-outlined text-[18px]">send</span>
                            Resend Invite
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                
                <Link href="/setup/invitees" className="mt-2 flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-slate-300 dark:border-slate-700 py-2.5 text-sm font-medium text-slate-600 dark:text-slate-400 hover:border-primary hover:text-primary transition-colors">
                  <span className="material-symbols-outlined text-[18px]">person_add</span>
                  Add Trusted Contact
                </Link>
              </div>
            </div>

            {/* Action Cards */}
            <div className="flex flex-col gap-4">
                <button onClick={() => {
                  const csvRows = [
                    ["Service Name", "Tier", "Notes", "Date Added"],
                    ...(accounts || []).map(a => [
                      a.serviceName,
                      a.tier,
                      (a.notesEnc || "").replace(/"/g, '""'),
                      new Date(a.createdAt).toLocaleDateString()
                    ])
                  ];
                  const csvContent = csvRows.map(row => row.map(cell => `"${cell}"`).join(",")).join("\n");
                  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement("a");
                  a.href = url;
                  a.download = "Afterword_Estate_Report.csv";
                  a.click();
                  URL.revokeObjectURL(url);
                }} className={`group flex items-center justify-between gap-4 rounded-xl p-4 text-left shadow-sm border transition-colors bg-white dark:bg-slate-800 text-slate-900 dark:text-white border-slate-200 dark:border-slate-700 hover:border-primary/50 w-full cursor-pointer`}>
                  <div>
                    <p className="font-bold">Download Estate PDF</p>
                    <p className={`text-xs mt-1 text-slate-500 dark:text-slate-400`}>Full detailed report</p>
                  </div>
                  <div className={`flex size-10 items-center justify-center rounded-full transition-colors bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-300 group-hover:bg-primary group-hover:text-white`}>
                    <span className="material-symbols-outlined">download</span>
                  </div>
                </button>
                <Link href="/dashboard/preview" className={`group flex items-center justify-between gap-4 rounded-xl p-4 text-left shadow-sm border transition-colors bg-white dark:bg-slate-800 text-slate-900 dark:text-white border-slate-200 dark:border-slate-700 hover:border-primary/50`}>
                  <div>
                    <p className="font-bold">Run Preview</p>
                    <p className={`text-xs mt-1 text-slate-500 dark:text-slate-400`}>See executor experience</p>
                  </div>
                  <div className={`flex size-10 items-center justify-center rounded-full transition-colors bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-300 group-hover:bg-primary group-hover:text-white`}>
                    <span className="material-symbols-outlined">play_arrow</span>
                  </div>
                </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

