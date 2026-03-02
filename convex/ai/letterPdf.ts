import { PDFDocument, rgb, StandardFonts } from "pdf-lib";

export const BRAND = {
  navy:    rgb(0.043, 0.122, 0.227),   // #0B1F3A
  teal:    rgb(0.075, 0.702, 0.620),   // #13B39E
  tealDk: rgb(0.039, 0.486, 0.431),   // #0A7C6E
  gray:    rgb(0.408, 0.533, 0.502),   // #687A74
  light:   rgb(0.784, 0.847, 0.831),   // #C8D8D4
  black:   rgb(0.118, 0.176, 0.157),   // #1E2D28
  white:   rgb(1, 1, 1),
  red:     rgb(0.690, 0.227, 0.180),   // #B03A2E
  amber:   rgb(0.839, 0.537, 0.063),   // #D68910
};

export const MARGIN = 60;  // Points (72pt = 1 inch)
export const PAGE_W = 612; // US Letter width in points
export const PAGE_H = 792; // US Letter height in points
export const CONTENT_W = PAGE_W - MARGIN * 2;

export function wrapText(text: string, font: any, size: number, maxWidth: number): string[] {
  const lines: string[] = [];
  const paragraphs = text.split("\n");

  for (const para of paragraphs) {
    if (!para.trim()) { lines.push(""); continue; }

    const words = para.split(" ");
    let currentLine = "";

    for (const word of words) {
      const testLine = currentLine ? `${currentLine} ${word}` : word;
      const testWidth = font.widthOfTextAtSize(testLine, size);

      if (testWidth > maxWidth && currentLine) {
        lines.push(currentLine);
        currentLine = word;
      } else {
        currentLine = testLine;
      }
    }
    if (currentLine) lines.push(currentLine);
  }
  return lines;
}

export function addPageFooter(page: any, font: any, fontItalic: any, pageNum: number) {
  page.drawLine({
    start: { x: MARGIN, y: 40 }, end: { x: PAGE_W - MARGIN, y: 40 },
    thickness: 0.5, color: BRAND.light,
  });
  page.drawText("Afterword  ·  Digital Estate Management  ·  afterword.app", {
    x: MARGIN, y: 26, size: 8, font: fontItalic, color: BRAND.gray,
  });
  page.drawText(`Page ${pageNum}`, {
    x: PAGE_W - MARGIN - 40, y: 26, size: 8, font, color: BRAND.gray,
  });
}

export async function generateLetterPdf(params: {
  deceasedName: string;
  executorName: string;
  serviceName:  string;
  letterBody:   string;
  date:         string;
  tier:         string;
}): Promise<Uint8Array> {
  const pdfDoc = await PDFDocument.create();
  const page   = pdfDoc.addPage([PAGE_W, PAGE_H]);
  const font       = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontBold   = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const fontItalic = await pdfDoc.embedFont(StandardFonts.HelveticaOblique);

  let y = PAGE_H - MARGIN;

  // ── Header bar ──────────────────────────────────────────────────
  page.drawRectangle({ x: 0, y: PAGE_H - 40, width: PAGE_W, height: 40, color: BRAND.navy });
  page.drawText("AFTERWORD", {
    x: MARGIN, y: PAGE_H - 27, size: 11, font: fontBold, color: BRAND.teal,
  });
  page.drawText("Estate Closure Letter", {
    x: MARGIN + 100, y: PAGE_H - 27, size: 11, font, color: BRAND.light,
  });

  y -= 50;

  // ── Date + RE line ───────────────────────────────────────────────
  page.drawText(params.date, { x: MARGIN, y, size: 10, font, color: BRAND.gray });
  y -= 30;

  page.drawText(`Re: Account Closure — ${params.serviceName}`, {
    x: MARGIN, y, size: 11, font: fontBold, color: BRAND.black,
  });
  y -= 24;

  // ── Divider ──────────────────────────────────────────────────────
  page.drawLine({
    start: { x: MARGIN, y }, end: { x: PAGE_W - MARGIN, y },
    thickness: 1, color: BRAND.light,
  });
  y -= 24;

  // ── Letter body (word-wrapped) ────────────────────────────────────
  const lines = wrapText(params.letterBody, font, 10, CONTENT_W);
  let currentPage = page;
  
  for (const line of lines) {
    if (y < MARGIN + 60) {
      // Add new page if needed
      addPageFooter(currentPage, font, fontItalic, pdfDoc.getPageCount());
      currentPage = pdfDoc.addPage([PAGE_W, PAGE_H]);
      y = PAGE_H - MARGIN;
    }
    currentPage.drawText(line, { x: MARGIN, y, size: 10, font, color: BRAND.black });
    y -= 16;
  }

  // ── Footer ───────────────────────────────────────────────────────
  addPageFooter(currentPage, font, fontItalic, pdfDoc.getPageCount());

  return pdfDoc.save();
}
