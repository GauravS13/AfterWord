"use client";

import Link from "next/link";
import React from "react";
import { DRY_RUN_PREVIEW_DATA } from "../../data/mockData";

export interface DryRunPreviewProps { className?: string; }

export const DryRunPreview: React.FC<DryRunPreviewProps> = () => {
  return (
    <div className="bg-[#f8f7f6] dark:bg-[#221c10] min-h-screen flex flex-col font-display selection:bg-[#eeaa2b]/30">
      {/* Top Warning Banner */}
      <div className="bg-[#eeaa2b]/90 text-[#221c10] px-4 py-3 text-center font-bold flex items-center justify-center gap-2">
        <span className="material-symbols-outlined">{DRY_RUN_PREVIEW_DATA.warningBanner.icon}</span>
        <span>{DRY_RUN_PREVIEW_DATA.warningBanner.text}</span>
      </div>

      {/* Header Navigation */}
      <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#1a150d] px-10 py-4 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="text-[#eeaa2b] size-8 flex items-center justify-center bg-[#221c10] rounded-lg">
            <span className="material-symbols-outlined text-[20px]">{DRY_RUN_PREVIEW_DATA.header.logoIcon}</span>
          </div>
          <h2 className="text-[#181511] dark:text-white text-xl font-bold leading-tight tracking-tight">{DRY_RUN_PREVIEW_DATA.header.logoText}</h2>
        </div>
        <div className="flex flex-1 justify-end gap-8">
          <Link href={DRY_RUN_PREVIEW_DATA.header.closeHref} className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-6 bg-[#eeaa2b] hover:bg-[#eeaa2b]/90 transition-colors text-[#221c10] text-sm font-bold leading-normal tracking-wide shadow-sm">
            <span className="truncate">{DRY_RUN_PREVIEW_DATA.header.closeButtonText}</span>
            <span className="material-symbols-outlined ml-2 text-sm">close</span>
          </Link>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex justify-center py-10 px-6 sm:px-10 lg:px-20 overflow-y-auto">
        <div className="max-w-[1200px] w-full flex flex-col gap-8">
          
          {/* Page Title Section */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-neutral-200 dark:border-neutral-800 pb-6">
            <div className="flex flex-col gap-2">
              <h1 className="text-[#181511] dark:text-white text-3xl md:text-4xl font-black leading-tight tracking-tight">{DRY_RUN_PREVIEW_DATA.hero.title}</h1>
              <p className="text-[#897b61] text-lg font-normal leading-normal max-w-2xl">{DRY_RUN_PREVIEW_DATA.hero.subtitle}</p>
            </div>
            <div className="flex items-center gap-2 text-sm font-medium text-[#897b61] bg-white dark:bg-[#1a150d] px-3 py-1.5 rounded-full border border-neutral-200 dark:border-neutral-700 shadow-sm">
              <span className="material-symbols-outlined text-[#eeaa2b] text-lg">{DRY_RUN_PREVIEW_DATA.hero.badgeIcon}</span>
              <span>{DRY_RUN_PREVIEW_DATA.hero.badgeText}</span>
            </div>
          </div>

          {/* Preview Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* Card 1: Email */}
            <article className="flex flex-col gap-4 group">
              <div className="bg-white dark:bg-[#1a150d] rounded-xl overflow-hidden shadow-sm border border-neutral-200 dark:border-neutral-800 hover:shadow-md transition-shadow duration-300 flex flex-col h-full">
                <div className="p-4 border-b border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-[#181511] dark:text-white font-semibold">
                    <span className="material-symbols-outlined text-[#eeaa2b]">{DRY_RUN_PREVIEW_DATA.steps[0].icon}</span>
                    <h3>{DRY_RUN_PREVIEW_DATA.steps[0].title}</h3>
                  </div>
                  <span className="text-xs bg-neutral-100 dark:bg-neutral-800 text-[#897b61] px-2 py-1 rounded">{DRY_RUN_PREVIEW_DATA.steps[0].stepLabel}</span>
                </div>
                {/* Mockup Content */}
                <div className="p-6 bg-neutral-50 dark:bg-[#15110a] flex-1 flex flex-col items-center justify-center">
                  <div className="w-full bg-white dark:bg-[#221c10] shadow-sm rounded-lg p-5 border border-neutral-200 dark:border-neutral-700 max-w-[280px] transform group-hover:scale-105 transition-transform duration-300">
                    <div className="w-8 h-8 rounded bg-[#eeaa2b]/20 mb-3 flex items-center justify-center">
                      <span className="material-symbols-outlined text-[#eeaa2b] text-sm">{DRY_RUN_PREVIEW_DATA.steps[0].mockupIcon}</span>
                    </div>
                    <div className="h-2 w-1/3 bg-neutral-200 dark:bg-neutral-700 rounded mb-2"></div>
                    <div className="h-2 w-1/2 bg-neutral-200 dark:bg-neutral-700 rounded mb-4"></div>
                    <div className="space-y-1.5">
                      <div className="h-1.5 w-full bg-neutral-100 dark:bg-neutral-800 rounded"></div>
                      <div className="h-1.5 w-full bg-neutral-100 dark:bg-neutral-800 rounded"></div>
                      <div className="h-1.5 w-3/4 bg-neutral-100 dark:bg-neutral-800 rounded"></div>
                    </div>
                    <div className="mt-4 h-8 w-full bg-[#eeaa2b] rounded text-[10px] flex items-center justify-center text-[#221c10] font-bold">
                      {DRY_RUN_PREVIEW_DATA.steps[0].mockupButtonText}
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-white dark:bg-[#1a150d] border-t border-neutral-100 dark:border-neutral-800">
                  <p className="text-[#897b61] text-sm">{DRY_RUN_PREVIEW_DATA.steps[0].description}</p>
                </div>
              </div>
            </article>

            {/* Card 2: Verification */}
            <article className="flex flex-col gap-4 group">
              <div className="bg-white dark:bg-[#1a150d] rounded-xl overflow-hidden shadow-sm border border-neutral-200 dark:border-neutral-800 hover:shadow-md transition-shadow duration-300 flex flex-col h-full">
                <div className="p-4 border-b border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-[#181511] dark:text-white font-semibold">
                    <span className="material-symbols-outlined text-[#eeaa2b]">{DRY_RUN_PREVIEW_DATA.steps[1].icon}</span>
                    <h3>{DRY_RUN_PREVIEW_DATA.steps[1].title}</h3>
                  </div>
                  <span className="text-xs bg-neutral-100 dark:bg-neutral-800 text-[#897b61] px-2 py-1 rounded">{DRY_RUN_PREVIEW_DATA.steps[1].stepLabel}</span>
                </div>
                {/* Mockup Content */}
                <div className="p-6 bg-neutral-50 dark:bg-[#15110a] flex-1 flex flex-col items-center justify-center">
                  <div className="w-full bg-white dark:bg-[#221c10] shadow-sm rounded-lg p-5 border border-neutral-200 dark:border-neutral-700 max-w-[280px] flex flex-col items-center text-center transform group-hover:scale-105 transition-transform duration-300">
                    <div className="w-10 h-10 rounded-full bg-neutral-100 dark:bg-neutral-800 mb-3 flex items-center justify-center border border-neutral-200 dark:border-neutral-700">
                      <span className="material-symbols-outlined text-[#897b61]">{DRY_RUN_PREVIEW_DATA.steps[1].mockupIcon}</span>
                    </div>
                    <div className="h-2 w-2/3 bg-neutral-200 dark:bg-neutral-700 rounded mb-4"></div>
                    <div className="w-full grid grid-cols-4 gap-2 mb-4">
                      <div className="aspect-square rounded border border-neutral-300 dark:border-neutral-600 bg-neutral-50 dark:bg-neutral-800"></div>
                      <div className="aspect-square rounded border border-neutral-300 dark:border-neutral-600 bg-neutral-50 dark:bg-neutral-800"></div>
                      <div className="aspect-square rounded border border-neutral-300 dark:border-neutral-600 bg-neutral-50 dark:bg-neutral-800"></div>
                      <div className="aspect-square rounded border border-neutral-300 dark:border-neutral-600 bg-neutral-50 dark:bg-neutral-800"></div>
                    </div>
                    <div className="h-8 w-full bg-neutral-200 dark:bg-neutral-700 rounded flex items-center justify-center">
                      <div className="h-2 w-1/3 bg-neutral-400 dark:bg-neutral-500 rounded"></div>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-white dark:bg-[#1a150d] border-t border-neutral-100 dark:border-neutral-800">
                  <p className="text-[#897b61] text-sm">{DRY_RUN_PREVIEW_DATA.steps[1].description}</p>
                </div>
              </div>
            </article>

            {/* Card 3: Dashboard */}
            <article className="flex flex-col gap-4 group">
              <div className="bg-white dark:bg-[#1a150d] rounded-xl overflow-hidden shadow-sm border border-neutral-200 dark:border-neutral-800 hover:shadow-md transition-shadow duration-300 flex flex-col h-full">
                <div className="p-4 border-b border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-[#181511] dark:text-white font-semibold">
                    <span className="material-symbols-outlined text-[#eeaa2b]">{DRY_RUN_PREVIEW_DATA.steps[2].icon}</span>
                    <h3>{DRY_RUN_PREVIEW_DATA.steps[2].title}</h3>
                  </div>
                  <span className="text-xs bg-neutral-100 dark:bg-neutral-800 text-[#897b61] px-2 py-1 rounded">{DRY_RUN_PREVIEW_DATA.steps[2].stepLabel}</span>
                </div>
                {/* Mockup Content */}
                <div className="p-6 bg-neutral-50 dark:bg-[#15110a] flex-1 flex flex-col items-center justify-center">
                  <div className="w-full bg-white dark:bg-[#221c10] shadow-sm rounded-lg overflow-hidden border border-neutral-200 dark:border-neutral-700 max-w-[280px] transform group-hover:scale-105 transition-transform duration-300">
                    <div className="h-10 bg-neutral-100 dark:bg-neutral-800 border-b border-neutral-200 dark:border-neutral-700 flex items-center px-3 gap-2">
                      <div className="w-4 h-4 rounded-full bg-neutral-300 dark:bg-neutral-600"></div>
                      <div className="h-2 w-1/3 bg-neutral-300 dark:bg-neutral-600 rounded"></div>
                    </div>
                    <div className="p-3 grid grid-cols-2 gap-2">
                      <div className="h-16 bg-[#eeaa2b]/10 rounded border border-[#eeaa2b]/20 flex flex-col justify-between p-2">
                        <div className="w-4 h-4 bg-[#eeaa2b] rounded-full"></div>
                        <div className="h-1.5 w-2/3 bg-[#eeaa2b]/40 rounded"></div>
                      </div>
                      <div className="h-16 bg-neutral-50 dark:bg-neutral-800 rounded border border-neutral-100 dark:border-neutral-700 flex flex-col justify-between p-2">
                        <div className="w-4 h-4 bg-neutral-300 dark:bg-neutral-600 rounded-full"></div>
                        <div className="h-1.5 w-2/3 bg-neutral-300 dark:bg-neutral-600 rounded"></div>
                      </div>
                      <div className="col-span-2 h-10 bg-neutral-50 dark:bg-neutral-800 rounded border border-neutral-100 dark:border-neutral-700 flex items-center px-2 gap-2">
                        <div className="w-6 h-6 bg-neutral-200 dark:bg-neutral-600 rounded"></div>
                        <div className="h-1.5 w-1/2 bg-neutral-300 dark:bg-neutral-600 rounded"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-white dark:bg-[#1a150d] border-t border-neutral-100 dark:border-neutral-800">
                  <p className="text-[#897b61] text-sm">{DRY_RUN_PREVIEW_DATA.steps[2].description}</p>
                </div>
              </div>
            </article>

          </div>

          {/* Footer Note */}
          <div className="mt-4 flex items-center justify-center">
            <p className="text-[#897b61] text-sm text-center max-w-xl">
              <span className="material-symbols-outlined align-middle text-base mr-1">info</span>
              {DRY_RUN_PREVIEW_DATA.footerNote}
            </p>
          </div>

        </div>
      </main>
    </div>
  );
};

