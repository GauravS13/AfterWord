"use client";

import Link from "next/link";
import React, { useState } from "react";
import { LETTER_PREVIEW_DATA } from "../../data/mockData";

export interface LetterPreviewProps {
  id?: string;
  accountId?: string;
}

export const LetterPreview: React.FC<LetterPreviewProps> = ({ /* id, accountId */ }) => {
  // Use state to make portions of the letter editable conceptually
  const [body1] = useState(LETTER_PREVIEW_DATA.letter.body1);
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);

  const paperTextureClass = "bg-white relative shadow-xl rounded-sm p-8 md:p-12 lg:p-16 min-h-[800px] text-slate-900 border border-slate-200 dark:border-slate-700 group/paper";

  const renderEditableSection = (id: string, content: React.ReactNode, isHighlighted = false) => {
    return (
      <div 
        className={`rounded p-1 -ml-1 cursor-pointer transition-colors relative 
          ${isHighlighted ? 'border-b-2 border-[#13ecec] bg-[#13ecec]/5' : 'hover:bg-slate-50'}`}
        onMouseEnter={() => setHoveredSection(id)}
        onMouseLeave={() => setHoveredSection(null)}
      >
        {content}
        {isHighlighted && hoveredSection === id && (
          <div className="absolute top-[-24px] right-0 bg-[#111818] text-white text-[10px] py-0.5 px-1.5 rounded font-[system-ui] z-20 pointer-events-none">
            Click to edit
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="bg-[#f6f8f8] dark:bg-[#102222] font-[system-ui] text-slate-900 dark:text-slate-100 min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full bg-white dark:bg-[#162e2e] border-b border-[#f0f4f4] dark:border-slate-800 px-6 py-3">
        <div className="max-w-[1280px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="size-8 text-[#13ecec]">
              <span className="material-symbols-outlined !text-3xl">{LETTER_PREVIEW_DATA.header.logoIcon}</span>
            </div>
            <h2 className="text-slate-900 dark:text-white text-xl font-bold tracking-tight">{LETTER_PREVIEW_DATA.header.logoText}</h2>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            {LETTER_PREVIEW_DATA.header.nav.map((item, i) => (
              <a key={i} className={`text-sm font-medium transition-colors ${item === "Documents" ? "text-slate-900 dark:text-white font-bold border-b-2 border-[#13ecec] pb-0.5" : "text-slate-600 dark:text-slate-300 hover:text-[#13ecec]"}`} href="#">
                {item}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-4">
            <button className="hidden sm:flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-sm font-semibold transition-colors">
              <span className="material-symbols-outlined text-[18px]">logout</span>
              <span>Log Out</span>
            </button>
            <div className="bg-center bg-no-repeat bg-cover rounded-full size-10 border-2 border-white dark:border-slate-700 shadow-sm" style={{backgroundImage: `url("${LETTER_PREVIEW_DATA.header.avatarUrl}")`}}></div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumbs */}
        <div className="flex flex-wrap items-center gap-2 mb-8 text-sm">
          {LETTER_PREVIEW_DATA.breadcrumbs.map((crumb, idx) => (
            <React.Fragment key={idx}>
              {crumb.active ? (
                <span className="text-slate-900 dark:text-white font-medium">{crumb.label}</span>
              ) : (
                <Link href={crumb.href} className="text-slate-500 hover:text-[#13ecec] transition-colors">{crumb.label}</Link>
              )}
              {idx < LETTER_PREVIEW_DATA.breadcrumbs.length - 1 && (
                <span className="text-slate-300 dark:text-slate-600">/</span>
              )}
            </React.Fragment>
          ))}
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* Left Column: Letter Preview */}
          <div className="w-full lg:w-[65%] flex flex-col gap-6">
            <div className="flex justify-between items-end">
              <div>
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">{LETTER_PREVIEW_DATA.titleSection.title}</h1>
                <p className="text-slate-500 dark:text-slate-400 mt-2">{LETTER_PREVIEW_DATA.titleSection.subtitle}</p>
              </div>
              <div className="hidden sm:flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-full">
                <span className="material-symbols-outlined text-[16px]">edit_note</span>
                <span>Click text to edit</span>
              </div>
            </div>

            {/* The Letter Paper */}
            <div className={paperTextureClass} 
              style={{backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%239C92AC' fill-opacity='0.03' fill-rule='evenodd'/%3E%3C/svg%3E")`}}
            >
              {/* Floating Toolbar (Simulated Hover State) */}
              <div className="absolute top-[280px] left-1/2 -translate-x-1/2 bg-slate-900 text-white rounded-lg shadow-lg py-1 px-2 flex items-center gap-1 z-10 transform scale-0 group-hover/paper:scale-100 transition-transform duration-200">
                <button className="p-1.5 hover:bg-slate-700 rounded transition-colors"><span className="material-symbols-outlined text-[18px]">format_bold</span></button>
                <button className="p-1.5 hover:bg-slate-700 rounded transition-colors"><span className="material-symbols-outlined text-[18px]">format_italic</span></button>
                <div className="w-px h-4 bg-slate-700 mx-1"></div>
                <button className="p-1.5 hover:bg-slate-700 rounded transition-colors text-xs font-medium">AI Rewrite</button>
              </div>

              <div className="font-serif max-w-[650px] mx-auto leading-relaxed text-lg">
                
                <div className="mb-12">
                  {renderEditableSection('date', <span>{LETTER_PREVIEW_DATA.letter.date}</span>)}
                </div>
                
                <div className="mb-12">
                  {renderEditableSection('recipient', (
                    <>
                      {LETTER_PREVIEW_DATA.letter.recipient.map((line, i) => (
                        <p key={i}>{line}</p>
                      ))}
                    </>
                  ))}
                </div>
                
                <div className="mb-8 font-bold">
                  {renderEditableSection('subject', (
                    <>
                      {LETTER_PREVIEW_DATA.letter.subjectLine1}
                      <br />
                      {LETTER_PREVIEW_DATA.letter.subjectLine2}
                    </>
                  ))}
                </div>
                
                <div className="mb-6">
                  {renderEditableSection('salutation', <span>{LETTER_PREVIEW_DATA.letter.salutation}</span>)}
                </div>
                
                <div className="mb-6">
                  {renderEditableSection('body1', <span>{body1}</span>, true)}
                </div>
                
                <div className="mb-6">
                  {renderEditableSection('body2', <span>{LETTER_PREVIEW_DATA.letter.body2}</span>)}
                </div>
                
                <div className="mb-6">
                  {renderEditableSection('body3', <span>{LETTER_PREVIEW_DATA.letter.body3}</span>)}
                </div>
                
                <div className="mb-12">
                  {renderEditableSection('closing', <span>{LETTER_PREVIEW_DATA.letter.closing}</span>)}
                </div>
                
                <div className="mb-4">
                  <div className="text-2xl text-slate-800 italic" style={{fontFamily: "'Brush Script MT', cursive"}}>{LETTER_PREVIEW_DATA.letter.signature}</div>
                </div>
                
                <div>
                  {renderEditableSection('printedName', (
                    <>
                      {LETTER_PREVIEW_DATA.letter.printedName.map((line, i) => (
                        <p key={i}>{line}</p>
                      ))}
                    </>
                  ))}
                </div>

              </div>
            </div>

            {/* Regeneration Options */}
            <div className="flex items-center justify-center py-4">
              <button className="group flex items-center gap-2 text-slate-500 hover:text-[#13ecec] transition-colors text-sm font-medium">
                <span className="material-symbols-outlined text-[18px] group-hover:rotate-180 transition-transform duration-500">autorenew</span>
                Regenerate with a more formal tone
              </button>
            </div>
            
          </div>

          {/* Right Column: Actions Sidebar */}
          <div className="w-full lg:w-[35%] lg:sticky lg:top-24 flex flex-col gap-6">
            
            {/* Status Card */}
            <div className="bg-white dark:bg-[#162e2e] rounded-xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="size-2 rounded-full bg-emerald-500 animate-pulse"></div>
                <span className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">{LETTER_PREVIEW_DATA.actions.status}</span>
              </div>
              <div className="flex gap-3">
                <Link href={LETTER_PREVIEW_DATA.actions.nextActionHref} className="flex flex-1 items-center justify-center bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100 h-10 rounded-lg font-bold text-sm transition-colors shadow-lg shadow-slate-900/10">
                  {LETTER_PREVIEW_DATA.actions.markReviewed}
                </Link>
                <button className="size-10 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors" title="Save Draft">
                  <span className="material-symbols-outlined">save</span>
                </button>
              </div>
            </div>
            
            {/* Main Actions */}
            <div className="bg-white dark:bg-[#162e2e] rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
              <div className="p-4 bg-slate-50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800">
                <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Delivery Actions</h3>
              </div>
              <div className="flex flex-col p-2">
                {LETTER_PREVIEW_DATA.actions.deliveryActions.map((action) => (
                  <button key={action.id} className="flex items-center gap-4 w-full p-3 rounded-lg hover:bg-[#13ecec]/10 group transition-colors text-left">
                    <div className="size-10 rounded-full bg-slate-100 dark:bg-slate-800 group-hover:bg-white group-hover:text-[#13ecec] flex items-center justify-center text-slate-600 dark:text-slate-300 transition-colors shadow-sm">
                      <span className="material-symbols-outlined">{action.icon}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-slate-900 dark:text-white font-semibold text-sm">{action.title}</span>
                      <span className="text-slate-500 dark:text-slate-400 text-xs">{action.desc}</span>
                    </div>
                    <span className="material-symbols-outlined ml-auto text-slate-300 group-hover:text-[#13ecec]">chevron_right</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Enclosures List */}
            <div className="bg-white dark:bg-[#162e2e] rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
              <div className="p-4 bg-slate-50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
                <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Attachments Included</h3>
                <button className="text-[#13ecec] text-xs font-bold hover:underline">Edit</button>
              </div>
              <div className="p-4 flex flex-col gap-3">
                {LETTER_PREVIEW_DATA.actions.attachments.map((att, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-slate-400">{att.icon}</span>
                    <span className="text-sm text-slate-700 dark:text-slate-300">{att.name}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      </main>
    </div>
  );
};

