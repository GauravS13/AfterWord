import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Playfair_Display, Public_Sans } from "next/font/google";
import ConvexClientProvider from "./ConvexClientProvider";
import "./globals.css";

const publicSans = Public_Sans({
  variable: "--font-display",
  subsets: ["latin"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Afterword - Secure Your Digital Future",
  description: "Secure your digital footprint and ease the burden on your loved ones.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
        </head>
        <body
          className={`${publicSans.variable} ${playfairDisplay.variable} bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 antialiased overflow-x-hidden`}
        >
          <ConvexClientProvider>
            {children}
          </ConvexClientProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
