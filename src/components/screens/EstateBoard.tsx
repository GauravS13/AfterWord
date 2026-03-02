"use client";

import { useAction, useQuery } from "convex/react";
import Link from "next/link";
import React, { useState } from "react";
import { api } from "../../../convex/_generated/api";
import { Id } from "../../../convex/_generated/dataModel";

export interface EstateBoardProps {
  id?: string;
  ownerAccounts?: Array<{
    _id: string;
    serviceName: string;
    tier: string;
    accountEmailEnc?: string;
    notesEnc?: string;
    order: number;
    createdAt: number;
  }>;
}

export const EstateBoard: React.FC<EstateBoardProps> = ({ id, ownerAccounts = [] }) => {
  const accounts = ownerAccounts;
  const [showAvatarMenu, setShowAvatarMenu] = useState(false);
  const [generatingFor, setGeneratingFor] = useState<string | null>(null);

  const generateLetter = useAction(api.ai.generateOwnerLetter.generateOwnerLetter);

  // Fetch existing letters for all accounts
  const ownerId = id as Id<"owners">;
  const existingLetters = useQuery(api.ownerLetters.listByOwner, id ? { ownerId } : "skip");

  // Build a set of account IDs that already have letters
  const accountsWithLetters = new Set(
    (existingLetters || []).map((l: { ownerAccountId: string }) => l.ownerAccountId)
  );

  // Group by tier
  const totalAccounts = accounts.length;
  const financialAccounts = accounts.filter(a => a.tier === "FINANCIAL");
  const identityAccounts = accounts.filter(a => a.tier === "IDENTITY");
  const sentimentalAccounts = accounts.filter(a => a.tier === "SENTIMENTAL");
  const adminAccounts = accounts.filter(a => a.tier === "ADMIN");

  const handleExport = () => {
    const csvRows = [
      ["Service Name", "Tier", "Notes", "Date Added"],
      ...accounts.map(a => [
        a.serviceName,
        a.tier,
        (a.notesEnc || "").replace(/"/g, '""'),
        new Date(a.createdAt).toLocaleDateString()
      ])
    ];
    const csvContent = csvRows.map(row => row.map(cell => `"${cell}"`).join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "Afterword_Estate_Bundle.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleGenerateLetter = async (accountId: string) => {
    if (!id) return;
    setGeneratingFor(accountId);
    try {
      await generateLetter({
        ownerAccountId: accountId as Id<"ownerAccounts">,
        ownerId: id as Id<"owners">,
      });
    } catch (err) {
      console.error("Letter generation failed:", err);
    } finally {
      setGeneratingFor(null);
    }
  };

  const tierConfig: Record<string, { label: string; color: string; dotColor: string; borderColor: string; icon: string }> = {
    FINANCIAL:   { label: "Financial", color: "text-[#ff4d4d]", dotColor: "bg-[#ff4d4d]", borderColor: "border-l-[#ff4d4d]", icon: "account_balance" },
    IDENTITY:    { label: "Identity", color: "text-[#3b82f6]", dotColor: "bg-[#3b82f6]", borderColor: "border-l-[#3b82f6]", icon: "security" },
    SENTIMENTAL: { label: "Sentimental", color: "text-[#f59e0b]", dotColor: "bg-[#f59e0b]", borderColor: "border-l-[#f59e0b]", icon: "favorite" },
    ADMIN:       { label: "Admin", color: "text-[#00cc66]", dotColor: "bg-[#00cc66]", borderColor: "border-l-[#00cc66]", icon: "settings" },
  };

  const renderAccountCard = (item: typeof accounts[0]) => {
    const cfg = tierConfig[item.tier] || tierConfig.ADMIN;
    const hasLetter = accountsWithLetters.has(item._id);
    const isGenerating = generatingFor === item._id;

    return (
      <div key={item._id} className={`group relative bg-[#162a2a] rounded-lg border-l-4 ${cfg.borderColor} border-y border-r border-[#283939] p-4 hover:border-r-[#13ecec] hover:border-y-[#13ecec]/50 transition-all shadow-lg shadow-black/20`}>
        <div className="flex justify-between items-start mb-2">
          <div className="flex items-center gap-2">
            <div className="size-8 rounded flex items-center justify-center bg-[#102222] text-[#13ecec]">
              <span className="font-bold text-xs">{item.serviceName.substring(0, 2).toUpperCase()}</span>
            </div>
            <div>
              <h5 className="text-white text-sm font-bold">{item.serviceName}</h5>
              <p className={`text-xs ${cfg.color} font-medium flex items-center gap-1`}>
                <span className="material-symbols-outlined text-[12px]">{cfg.icon}</span>
                {cfg.label}
              </p>
            </div>
          </div>
        </div>
        {item.notesEnc && (
          <p className="text-xs text-slate-400 mt-1 line-clamp-2">Note: {item.notesEnc}</p>
        )}
        <p className="text-[10px] text-slate-500 mt-2">
          Added {new Date(item.createdAt).toLocaleDateString()}
        </p>

        {/* Letter Actions */}
        <div className="mt-3 pt-3 border-t border-[#283939]">
          {hasLetter ? (
            <Link
              href={`/estate/${id}/account/${item._id}/letter`}
              className="flex items-center justify-center gap-2 w-full py-2 rounded-lg bg-[#13ecec]/10 hover:bg-[#13ecec]/20 text-[#13ecec] text-xs font-bold transition-colors"
            >
              <span className="material-symbols-outlined text-[16px]">description</span>
              View Letter
            </Link>
          ) : (
            <button
              onClick={() => handleGenerateLetter(item._id)}
              disabled={isGenerating}
              className="flex items-center justify-center gap-2 w-full py-2 rounded-lg bg-slate-800/50 hover:bg-[#13ecec]/10 text-slate-300 hover:text-[#13ecec] text-xs font-bold transition-colors disabled:opacity-50 disabled:cursor-wait"
            >
              {isGenerating ? (
                <>
                  <span className="material-symbols-outlined text-[16px] animate-spin">autorenew</span>
                  Generating...
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-[16px]">auto_awesome</span>
                  Generate AI Letter
                </>
              )}
            </button>
          )}
        </div>
      </div>
    );
  };

  const renderColumn = (title: string, items: typeof accounts, dotColor: string) => (
    <div className="flex-1 flex flex-col min-w-[280px] bg-[#162a2a]/30 rounded-xl border border-[#283939]/50 h-full">
      <div className="p-4 border-b border-[#283939]/50 flex items-center justify-between sticky top-0 bg-[#102222]/95 backdrop-blur rounded-t-xl z-10">
        <div className="flex items-center gap-2">
          <span className={`size-2 rounded-full ${dotColor}`}></span>
          <h4 className="text-white text-sm font-bold tracking-wide">{title}</h4>
          <span className="bg-[#283939] px-2 py-0.5 rounded text-xs text-slate-400 font-mono">{items.length}</span>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-3 flex flex-col gap-3" style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }}>
        {items.map(item => renderAccountCard(item))}
      </div>
    </div>
  );

  return (
    <div className="bg-[#f6f8f8] dark:bg-[#102222] text-slate-900 dark:text-slate-100 font-[system-ui] min-h-screen flex flex-col overflow-hidden">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-50 flex items-center justify-between border-b border-[#283939] bg-[#102222]/95 backdrop-blur-sm px-6 py-3">
        <div className="flex items-center gap-4">
          <div className="flex items-center justify-center size-10 rounded-lg bg-[#162a2a] border border-[#283939] text-[#13ecec]">
            <span className="material-symbols-outlined">folder_open</span>
          </div>
          <div>
            <h2 className="text-white text-lg font-bold leading-tight tracking-tight">The Estate Workspace</h2>
            <div className="flex items-center gap-1 text-slate-400 text-sm">
              <span className="material-symbols-outlined text-[16px]">location_on</span>
              <span>Central Vault</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex gap-3">
            <button onClick={handleExport} className="flex items-center justify-center gap-2 h-10 px-4 bg-[#162a2a] hover:bg-[#283939] text-[#13ecec] border border-[#283939] rounded-lg text-sm font-bold transition-colors">
              <span className="material-symbols-outlined text-[20px]">download</span>
              <span className="hidden sm:inline">Export Bundle</span>
            </button>
            <div className="relative">
              <button
                onClick={() => setShowAvatarMenu(!showAvatarMenu)}
                className="size-10 rounded-full bg-[#283939] hover:bg-[#13ecec]/20 overflow-hidden border border-[#283939] hover:border-[#13ecec]/50 flex items-center justify-center text-slate-400 hover:text-[#13ecec] transition-colors cursor-pointer"
                title="Guest Menu"
              >
                <span className="material-symbols-outlined">person</span>
              </button>
              {showAvatarMenu && (
                <div className="absolute right-0 top-12 z-50 w-48 rounded-lg border border-[#283939] bg-[#162a2a] shadow-xl py-1">
                  <div className="px-4 py-2 border-b border-[#283939]">
                    <p className="text-xs text-slate-400">Signed in as</p>
                    <p className="text-sm text-white font-medium">Guest Executor</p>
                  </div>
                  <button
                    onClick={() => window.print()}
                    className="flex w-full items-center gap-2 px-4 py-2 text-sm text-slate-300 hover:bg-[#283939] transition-colors"
                  >
                    <span className="material-symbols-outlined text-[18px]">print</span>
                    Print Page
                  </button>
                  <button
                    onClick={() => { window.location.href = '/'; }}
                    className="flex w-full items-center gap-2 px-4 py-2 text-sm text-red-400 hover:bg-[#283939] transition-colors"
                  >
                    <span className="material-symbols-outlined text-[18px]">logout</span>
                    Exit Session
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Welcome Banner & Stats Area */}
        <div className="flex-shrink-0 flex flex-col gap-6 p-6 border-b border-[#283939] overflow-y-auto max-h-[40vh]">
          {/* Welcome Banner */}
          <div className="relative w-full rounded-xl overflow-hidden bg-gradient-to-r from-[#162a2a] to-[#102222] border border-[#283939]/50 group">
            <div className="absolute inset-0 bg-[#13ecec]/5"></div>
            <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between p-6 gap-4">
              <div className="flex gap-4">
                <div className="p-3 rounded-full bg-[#13ecec]/10 text-[#13ecec] self-start">
                  <span className="material-symbols-outlined">verified_user</span>
                </div>
                <div>
                  <h3 className="text-white text-xl font-bold mb-1">Estate Discovered</h3>
                  <p className="text-slate-300 text-sm leading-relaxed max-w-2xl">
                    We&apos;ve centralized <span className="text-[#13ecec] font-bold">{totalAccounts} accounts</span> securely across {Object.keys(tierConfig).length} categories. 
                    {financialAccounts.length > 0 && <> Pay special attention to the <span className="text-[#ff4d4d] font-bold">{financialAccounts.length} financial accounts</span>.</>}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex flex-col gap-1 p-4 rounded-xl bg-[#162a2a] border transition-colors border-[#283939] border-b-4 border-b-slate-400">
              <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Total Accounts</p>
              <p className="text-white text-2xl font-bold">{totalAccounts}</p>
            </div>
            <div className={`flex flex-col gap-1 p-4 rounded-xl bg-[#162a2a] border transition-colors relative overflow-hidden ${financialAccounts.length > 0 ? 'border-[#ff4d4d]/50 hover:border-[#ff4d4d] shadow-sm shadow-[#ff4d4d]/10' : 'border-[#283939]'}`}>
              {financialAccounts.length > 0 && (
                <div className="absolute top-0 right-0 p-1">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ff4d4d] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-[#ff4d4d]"></span>
                  </span>
                </div>
              )}
              <p className="text-[#ff4d4d] text-xs font-semibold uppercase tracking-wider">Financial</p>
              <p className="text-white text-2xl font-bold">{financialAccounts.length}</p>
            </div>
            <div className="flex flex-col gap-1 p-4 rounded-xl bg-[#162a2a] border transition-colors border-[#283939]">
              <p className="text-[#3b82f6] text-xs font-semibold uppercase tracking-wider">Identity</p>
              <p className="text-white text-2xl font-bold">{identityAccounts.length}</p>
            </div>
            <div className="flex flex-col gap-1 p-4 rounded-xl bg-[#162a2a] border transition-colors border-[#283939] border-b-4 border-b-[#f59e0b]">
              <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Sentimental</p>
              <p className="text-white text-2xl font-bold">{sentimentalAccounts.length}</p>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 w-full" style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }}>
              <button className="flex-shrink-0 px-4 py-1.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 bg-[#13ecec] text-[#102222] font-bold shadow-sm shadow-[#13ecec]/20">
                All Accounts ({totalAccounts})
              </button>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-400 border-l border-[#283939] pl-4">
              <span className="material-symbols-outlined text-[18px]">filter_list</span>
              <span>Sort by: Tier</span>
            </div>
          </div>
        </div>

        {/* Kanban Board Area - Columns by Tier */}
        <div className="flex-1 overflow-x-auto bg-[#102222]/50 p-6">
          <div className="flex gap-6 min-w-[1024px] h-full">
            {renderColumn("Financial", financialAccounts, "bg-[#ff4d4d]")}
            {renderColumn("Identity", identityAccounts, "bg-[#3b82f6]")}
            {renderColumn("Sentimental", sentimentalAccounts, "bg-[#f59e0b]")}
            {renderColumn("Admin", adminAccounts, "bg-[#00cc66]")}
          </div>
        </div>
      </main>
    </div>
  );
};
