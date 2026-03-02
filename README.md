<p align="center">
  <img src="./public/afterword_hero_banner.png" alt="AfterWord Hero Banner" width="100%" style="border-radius: 12px; margin-bottom: 24px;" />
</p>

<p align="center">
  <img src="https://readme-typing-svg.demolab.com?font=Outfit&weight=700&size=42&duration=3000&pause=1200&color=2DD4BF&center=true&vCenter=true&multiline=true&repeat=true&width=700&height=120&lines=%E2%9C%A6+AfterWord+Frontend;The+Interface+of+Closure.;Secure+and+Empathetic." alt="Typing Animation" />
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js_16-black?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
</p>

<br/>

## 🚀 Frontend Getting Started

This directory contains the Next.js frontend and Convex backend functions for the AfterWord platform.

### 1. Installation

```bash
npm install
```

### 2. Configure Environment

Create a `.env.local` file:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_key
CLERK_SECRET_KEY=your_key
CONVEX_DEPLOYMENT=your_deployment_id
NEXT_PUBLIC_CONVEX_URL=your_convex_url
```

### 3. Run Development Server

```bash
npm run dev
# and in another terminal
npx convex dev
```

---

## 🎨 Design System

AfterWord uses a custom design system built with **Tailwind CSS**, focusing on:
- **Glassmorphism**: Translucent cards and navigation for a modern, premium feel.
- **Accessibility**: High contrast ratios and readable typography (Outfit & Inter).
- **Micro-interactions**: Smooth transitions and hover states to guide executors through difficult tasks.

### Key Components

- **LandingPage**: A cinematic entrance explaining the platform's value.
- **EstateBoard**: A dense, informative dashboard for tracking 100+ accounts.
- **VaultInterface**: A military-grade secure area for PII management.

---

## 🏗️ Folder Structure

```
src/
├── app/                  # App Router: Layouts, Pages, and API routes
├── components/
│   ├── screens/          # Full-page screen components
│   ├── ui/               # Primary UI bricks (Button, Card, Input)
│   └── icons/            # Lucide-based custom icon set
├── data/                 # Platform DB, mock data, and constants
├── hooks/                # useVault, useEstate, and useClerkAuth
└── lib/                  # Crypto utilities, AI helpers, and formatting
```

---

## ⚖️ AI Integration

The frontend communicates with Convex actions to perform:
- **Legal Character Matching**: Categorizing accounts into legal archetypes.
- **Saul-Instruct Generation**: Drafting formal closure letters.
- **Gemini-Powered Discovery**: Identifying accounts from email metadata.

---

<p align="center">
  Built with 🕯️ for Digital Legacy & Closure.
</p>