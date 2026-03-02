"use client";

import React from "react";
import { UNLOCK_FLOW_DATA } from "../../data/mockData";

export interface NoMatchFoundProps {
  onRetry: () => void;
}

export const NoMatchFound: React.FC<NoMatchFoundProps> = ({ onRetry }) => {
  return (
    <div className="bg-[#f6f7f8] dark:bg-[#101922] text-slate-900 dark:text-slate-100 font-display min-h-screen flex flex-col antialiased">
      {/* Navbar */}
      <header className="w-full border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-[#1c2630] sticky top-0 z-50">
        <div className="max-w-[1200px] mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3 text-slate-900 dark:text-white">
            <div className="size-8 text-[#2b8cee]">
              <svg className="w-full h-full" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.8261 17.4264C16.7203 18.1174 20.2244 18.5217 24 18.5217C27.7756 18.5217 31.2797 18.1174 34.1739 17.4264C36.9144 16.7722 39.9967 15.2331 41.3563 14.1648L24.8486 40.6391C24.4571 41.267 23.5429 41.267 23.1514 40.6391L6.64374 14.1648C8.00331 15.2331 11.0856 16.7722 13.8261 17.4264Z" fill="currentColor"></path>
                <path clipRule="evenodd" d="M39.998 12.236C39.9944 12.2537 39.9875 12.2845 39.9748 12.3294C39.9436 12.4399 39.8949 12.5741 39.8346 12.7175C39.8168 12.7597 39.7989 12.8007 39.7813 12.8398C38.5103 13.7113 35.9788 14.9393 33.7095 15.4811C30.9875 16.131 27.6413 16.5217 24 16.5217C20.3587 16.5217 17.0125 16.131 14.2905 15.4811C12.0012 14.9346 9.44505 13.6897 8.18538 12.8168C8.17384 12.7925 8.16216 12.767 8.15052 12.7408C8.09919 12.6249 8.05721 12.5114 8.02977 12.411C8.00356 12.3152 8.00039 12.2667 8.00004 12.2612C8.00004 12.261 8 12.2607 8.00004 12.2612C8.00004 12.2359 8.0104 11.9233 8.68485 11.3686C9.34546 10.8254 10.4222 10.2469 11.9291 9.72276C14.9242 8.68098 19.1919 8 24 8C28.8081 8 33.0758 8.68098 36.0709 9.72276C37.5778 10.2469 38.6545 10.8254 39.3151 11.3686C39.9006 11.8501 39.9857 12.1489 39.998 12.236ZM4.95178 15.2312L21.4543 41.6973C22.6288 43.5809 25.3712 43.5809 26.5457 41.6973L43.0534 15.223C43.0709 15.1948 43.0878 15.1662 43.104 15.1371L41.3563 14.1648C43.104 15.1371 43.1038 15.1374 43.104 15.1371L43.1051 15.135L43.1065 15.1325L43.1101 15.1261L43.1199 15.1082C43.1276 15.094 43.1377 15.0754 43.1497 15.0527C43.1738 15.0075 43.2062 14.9455 43.244 14.8701C43.319 14.7208 43.4196 14.511 43.5217 14.2683C43.6901 13.8679 44 13.0689 44 12.2609C44 10.5573 43.003 9.22254 41.8558 8.2791C40.6947 7.32427 39.1354 6.55361 37.385 5.94477C33.8654 4.72057 29.133 4 24 4C18.867 4 14.1346 4.72057 10.615 5.94478C8.86463 6.55361 7.30529 7.32428 6.14419 8.27911C4.99695 9.22255 3.99999 10.5573 3.99999 12.2609C3.99999 13.1275 4.29264 13.9078 4.49321 14.3607C4.60375 14.6102 4.71348 14.8196 4.79687 14.9689C4.83898 15.0444 4.87547 15.1065 4.9035 15.1529C4.91754 15.1762 4.92954 15.1957 4.93916 15.2111L4.94662 15.223L4.95178 15.2312ZM35.9868 18.996L24 38.22L12.0131 18.996C12.4661 19.1391 12.9179 19.2658 13.3617 19.3718C16.4281 20.1039 20.0901 20.5217 24 20.5217C27.9099 20.5217 31.5719 20.1039 34.6383 19.3718C35.082 19.2658 35.5339 19.1391 35.9868 18.996Z" fillRule="evenodd"></path>
              </svg>
            </div>
            <h2 className="text-xl font-bold tracking-tight">{UNLOCK_FLOW_DATA.noMatch.headerLogo}</h2>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            {UNLOCK_FLOW_DATA.noMatch.nav.slice(0, 3).map((item, i) => (
              <a key={i} className="text-slate-600 dark:text-slate-300 hover:text-[#2b8cee] dark:hover:text-[#2b8cee] text-sm font-medium transition-colors" href="#">{item}</a>
            ))}
          </nav>
          <div className="flex items-center gap-4">
            <a className="hidden sm:block text-slate-600 dark:text-slate-300 hover:text-[#2b8cee] dark:hover:text-[#2b8cee] text-sm font-medium transition-colors" href="#">{UNLOCK_FLOW_DATA.noMatch.nav[3]}</a>
            <button className="bg-[#2b8cee] hover:bg-blue-600 text-white text-sm font-bold py-2 px-5 rounded-lg transition-colors">
              {UNLOCK_FLOW_DATA.noMatch.cta}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center justify-center p-6 sm:px-8">
        <div className="w-full max-w-[720px] flex flex-col items-center gap-10">
          
          {/* Hero Section */}
          <div className="flex flex-col items-center gap-6 text-center animate-fade-in">
            <div className="size-20 bg-white dark:bg-[#1c2630] rounded-full flex items-center justify-center shadow-sm border border-slate-200 dark:border-slate-800">
              <span className="material-symbols-outlined text-4xl text-slate-400 dark:text-slate-500">{UNLOCK_FLOW_DATA.noMatch.icon}</span>
            </div>
            <div className="space-y-4 max-w-[500px]">
              <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">{UNLOCK_FLOW_DATA.noMatch.title}</h1>
              <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
                {UNLOCK_FLOW_DATA.noMatch.desc}
              </p>
            </div>
          </div>

          {/* Action Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
            {/* Card 1: Try Again */}
            <div onClick={onRetry} className="group flex flex-col bg-white dark:bg-[#1c2630] border border-slate-200 dark:border-slate-800 rounded-xl p-6 hover:border-[#2b8cee]/50 dark:hover:border-[#2b8cee]/50 transition-all cursor-pointer shadow-sm hover:shadow-md h-full">
              <div className="mb-6 size-12 rounded-lg bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center">
                <span className="material-symbols-outlined text-[#2b8cee] text-2xl">{UNLOCK_FLOW_DATA.noMatch.card1Icon}</span>
              </div>
              <div className="flex-grow space-y-2">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-[#2b8cee] transition-colors">{UNLOCK_FLOW_DATA.noMatch.card1Title}</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">{UNLOCK_FLOW_DATA.noMatch.card1Desc}</p>
              </div>
              <div className="mt-6 flex items-center text-[#2b8cee] font-medium text-sm group-hover:translate-x-1 transition-transform">
                {UNLOCK_FLOW_DATA.noMatch.card1Button} <span className="material-symbols-outlined text-lg ml-1">arrow_forward</span>
              </div>
            </div>

            {/* Card 2: Start Manually */}
            <div className="group flex flex-col bg-white dark:bg-[#1c2630] border border-slate-200 dark:border-slate-800 rounded-xl p-6 hover:border-[#2b8cee]/50 dark:hover:border-[#2b8cee]/50 transition-all cursor-pointer shadow-sm hover:shadow-md h-full">
              <div className="mb-6 size-12 rounded-lg bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center">
                <span className="material-symbols-outlined text-[#2b8cee] text-2xl">{UNLOCK_FLOW_DATA.noMatch.card2Icon}</span>
              </div>
              <div className="flex-grow space-y-2">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-[#2b8cee] transition-colors">{UNLOCK_FLOW_DATA.noMatch.card2Title}</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">{UNLOCK_FLOW_DATA.noMatch.card2Desc}</p>
              </div>
              <div className="mt-6 flex items-center text-[#2b8cee] font-medium text-sm group-hover:translate-x-1 transition-transform">
                {UNLOCK_FLOW_DATA.noMatch.card2Button} <span className="material-symbols-outlined text-lg ml-1">arrow_forward</span>
              </div>
            </div>
          </div>

          {/* Helpful Resource */}
          <div className="w-full bg-white dark:bg-[#1c2630] border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden flex flex-col sm:flex-row shadow-sm mt-4">
            <div className="sm:w-1/3 bg-slate-100 dark:bg-slate-800 relative h-48 sm:h-auto">
              <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${UNLOCK_FLOW_DATA.noMatch.imgUrl}')` }}></div>
              <div className="absolute inset-0 bg-black/10"></div>
            </div>
            <div className="p-6 sm:w-2/3 flex flex-col justify-center">
              <span className="text-xs font-bold text-[#2b8cee] uppercase tracking-wider mb-2">{UNLOCK_FLOW_DATA.noMatch.resourceTag}</span>
              <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{UNLOCK_FLOW_DATA.noMatch.resourceTitle}</h4>
              <p className="text-slate-500 dark:text-slate-400 text-sm mb-4">{UNLOCK_FLOW_DATA.noMatch.resourceDesc}</p>
              <a className="text-[#2b8cee] font-medium text-sm hover:underline" href="#">{UNLOCK_FLOW_DATA.noMatch.resourceLink}</a>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-[#1c2630] py-10 mt-auto">
        <div className="max-w-[1200px] mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-slate-500 dark:text-slate-400 text-sm">
            © 2024 Afterword Inc.
          </div>
          <div className="flex gap-8">
            <a className="text-slate-500 dark:text-slate-400 hover:text-[#2b8cee] text-sm transition-colors" href="#">Privacy Policy</a>
            <a className="text-slate-500 dark:text-slate-400 hover:text-[#2b8cee] text-sm transition-colors" href="#">Terms of Service</a>
            <a className="text-slate-500 dark:text-slate-400 hover:text-[#2b8cee] text-sm transition-colors" href="#">Contact Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

