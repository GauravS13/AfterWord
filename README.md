# Afterword

> Close the final chapter.

Afterword is a free, open-source, privacy-first digital estate management platform. It helps families discover, close, and document online accounts after someone dies. It works whether the person planned ahead using Afterword or never registered at all.

---

## The Problem

When someone passes away, families are left dealing with:

- 50–150+ online accounts
- Months of platform-by-platform email exchanges
- Legal uncertainty across states and countries
- Emotional exhaustion on top of grief

Most existing solutions require pre-registration. Real life does not work that way.

Afterword is built for both realities:
1. Planned estates
2. Unexpected deaths with no prior setup

---

## Core Features

### 1. Dual-Mode System

**Owner Mode (Pre-Death Planning)**
- Create encrypted vault
- Add account inventory
- Designate invitees
- Assign trusted guardian
- Define unlock preferences

**Executor Mode (Post-Death Recovery)**
- Works even if the deceased never used Afterword
- Gmail metadata scan or `.mbox` upload
- AI-powered account discovery
- Legally targeted closure letters
- Estate progress board
- Downloadable evidence bundle

---

### 2. Trusted Guardian Unlock Flow

Two-factor human-based verification:

- Knowledge factor (legal name, date of death, state)
- OTP sent to designated guardian

Prevents casual abuse while keeping real families unblocked.

---

### 3. Gmail Metadata Discovery (Privacy-Safe)

- Uses `gmail.metadata` scope only
- Reads headers only (sender, subject, date)
- Never reads email bodies
- Tokens encrypted and revoked after scan

Alternative: Upload `.mbox` export.

---

### 4. AI Legal Letter Generation

- Platform-aware
- State-aware
- Relationship-aware
- Emotionally appropriate tone
- Generates structured, professional closure letters
- PDF export ready for submission

---

### 5. Evidence Bundle Export

At completion, executors can export:

- Platform logs
- Submitted letters
- Action history
- Timestamped activity trail

Designed to support probate and legal processes.

---

## Tech Stack

- Next.js (App Router, Server Components)
- TypeScript
- Convex (TypeScript-native database + serverless functions)
- HuggingFace Inference API
- Saul-Instruct Legal LLM
- Vercel
- Resend (email delivery)
- pdf-lib (PDF generation)
- Tailwind CSS
- Turborepo (monorepo structure)

The stack was intentionally chosen to allow meaningful scale on free tiers.

---

## Architecture Overview

### Data Security Model

- Client-side AES-256 encryption for sensitive vault data
- Server stores encrypted blobs only
- Time-limited access tokens
- Estate auto-expiration (90 days)
- Rate limiting and unlock attempt protection

### Discovery Engine

- Pattern matching for common platforms
- Sender-domain intelligence
- AI classification layer
- Platform database mapping

---

## Local Development Setup

### 1. Clone Repository

```bash
git clone https://github.com/your-org/afterword.git
cd afterword
npm install
```

2. Run Convex Locally
npx convex dev
npx convex deploy
3. Environment Variables

Configure in Convex dashboard:

HF_TOKEN (HuggingFace token)

Google OAuth credentials (for Gmail metadata scope)

Resend API key

4. Start App
npm run dev

Visit:

http://localhost:3000
Project Structure (Simplified)
apps/
  web/               # Next.js frontend
packages/
  db/                # Convex schema + functions
  types/             # Shared TypeScript types
  ai/                # Letter generation logic
  platform-db/       # Community-maintained platform data
Contributing

High-impact areas:

Expanding platform database

Improving letter templates

State-specific legal adjustments

Accessibility improvements

Security audits

Contribution Flow

Fork the repo

Create feature branch

Add tests where relevant

Submit PR

Pass review checklist

This is a mission-driven project. Precision matters.

Roadmap

Broader platform coverage

International legal support

Automated document verification workflows

Improved AI explainability

Guardian multi-sig unlock option

Design Principles

Privacy first

Free forever core

Zero dark patterns

Real-world legal practicality

Human-centered UX in grief contexts

License

MIT License.

Open-source by design. Built for community stewardship.

Disclaimer

Afterword provides informational tools and document generation support. It is not a law firm and does not provide legal advice. Users should consult qualified attorneys for jurisdiction-specific guidance.

Why This Exists

Digital death is a modern problem. Families deserve better tools than spreadsheets and guesswork.

Afterword exists to reduce friction at one of the hardest moments in life.