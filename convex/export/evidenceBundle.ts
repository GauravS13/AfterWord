import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import { addPageFooter, BRAND, CONTENT_W, MARGIN, PAGE_H, PAGE_W } from "../ai/letterPdf";

export async function generateEvidenceBundle(params: {
  deceasedName:  string;
  executorName:  string;
  state:         string;
  accounts:      any[];
  letters:       any[];
  dateGenerated: string;
}): Promise<Uint8Array> {
  const pdfDoc   = await PDFDocument.create();
  const font     = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const fontItalic = await pdfDoc.embedFont(StandardFonts.HelveticaOblique);

  // ── Cover Page ────────────────────────────────────────────────────
  const cover = pdfDoc.addPage([PAGE_W, PAGE_H]);

  // Navy cover header
  cover.drawRectangle({ x: 0, y: PAGE_H - 180, width: PAGE_W, height: 180, color: BRAND.navy });

  cover.drawText("ESTATE CLOSURE", { x: MARGIN, y: PAGE_H - 70, size: 28, font: fontBold, color: BRAND.teal });
  cover.drawText("EVIDENCE BUNDLE", { x: MARGIN, y: PAGE_H - 105, size: 28, font: fontBold, color: BRAND.white });
  cover.drawText(`Estate of ${params.deceasedName}`, {
    x: MARGIN, y: PAGE_H - 140, size: 14, font, color: BRAND.light,
  });

  // Cover stats
  const closedCount = params.accounts.filter((a: any) => a.status === "CLOSED").length;
  cover.drawText(`${closedCount} of ${params.accounts.length} accounts closed`, {
    x: MARGIN, y: PAGE_H - 260, size: 12, font, color: BRAND.black,
  });
  cover.drawText(`Generated: ${params.dateGenerated}`, {
    x: MARGIN, y: PAGE_H - 280, size: 12, font, color: BRAND.gray,
  });
  cover.drawText(`Executor: ${params.executorName}`, {
    x: MARGIN, y: PAGE_H - 300, size: 12, font, color: BRAND.black,
  });

  // Cover note
  cover.drawText(
    "This document may be submitted to a probate court as evidence",
    { x: MARGIN, y: PAGE_H - 380, size: 9, font, color: BRAND.gray }
  );
  cover.drawText(
    "of digital estate closure. Retain with estate records.",
    { x: MARGIN, y: PAGE_H - 395, size: 9, font, color: BRAND.gray }
  );

  addPageFooter(cover, font, fontItalic, 1);

  // ── Account Summary Table ─────────────────────────────────────────
  let summaryPage = pdfDoc.addPage([PAGE_W, PAGE_H]);
  let y = PAGE_H - MARGIN;

  summaryPage.drawText("ACCOUNT CLOSURE SUMMARY", {
    x: MARGIN, y, size: 14, font: fontBold, color: BRAND.navy,
  });
  y -= 30;

  // Table header
  summaryPage.drawRectangle({ x: MARGIN, y: y - 4, width: CONTENT_W, height: 20, color: BRAND.navy });
  summaryPage.drawText("SERVICE",     { x: MARGIN + 8,  y: y + 2, size: 9, font: fontBold, color: BRAND.white });
  summaryPage.drawText("TIER",        { x: MARGIN + 200, y: y + 2, size: 9, font: fontBold, color: BRAND.white });
  summaryPage.drawText("STATUS",      { x: MARGIN + 300, y: y + 2, size: 9, font: fontBold, color: BRAND.white });
  summaryPage.drawText("CONFIRMATION",{ x: MARGIN + 400, y: y + 2, size: 9, font: fontBold, color: BRAND.white });
  y -= 24;

  for (const [i, account] of params.accounts.entries()) {
    if (y < MARGIN + 30) {
      addPageFooter(summaryPage, font, fontItalic, pdfDoc.getPageCount());
      summaryPage = pdfDoc.addPage([PAGE_W, PAGE_H]);
      y = PAGE_H - MARGIN;
    }

    const rowBg = i % 2 === 0 ? rgb(0.961, 0.976, 0.973) : BRAND.white;
    summaryPage.drawRectangle({ x: MARGIN, y: y - 4, width: CONTENT_W, height: 18, color: rowBg });
    summaryPage.drawText(account.serviceName.slice(0, 28), { x: MARGIN + 8,  y, size: 9, font, color: BRAND.black });
    summaryPage.drawText(account.tier,       { x: MARGIN + 200, y, size: 9, font, color: BRAND.gray });
    
    let statusColor = BRAND.amber;
    if (account.status === "CLOSED") statusColor = BRAND.tealDk;
    
    summaryPage.drawText(account.status,     { x: MARGIN + 300, y, size: 9, font, color: statusColor });
    summaryPage.drawText(account.confirmationNum || "—", { x: MARGIN + 400, y, size: 8, font, color: BRAND.gray });
    y -= 18;
  }

  addPageFooter(summaryPage, font, fontItalic, pdfDoc.getPageCount());

  return pdfDoc.save();
}
