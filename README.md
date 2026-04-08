# Sales Asset Hub

Internal dashboard for the sales team to find presentation materials, briefs, and working assets — organized by project.

Built with **Next.js 16** (App Router), **TypeScript**, and **Tailwind CSS v4**. Designed for zero-config deployment on **Vercel**.

---

## Quick Start

```bash
# Install dependencies
npm install

# Run the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production build

```bash
npm run build
npm start
```

---

## Deploy on Vercel

1. Push this repo to GitHub.
2. Go to [vercel.com/new](https://vercel.com/new) and import the repository.
3. Vercel auto-detects Next.js — no extra config needed.
4. Click **Deploy**.

Every push to the main branch triggers a new production deployment.

---

## Managing Projects

All project data lives in **one file**:

```
src/data/projects.ts
```

### Add a new project

Copy an existing entry and change the fields:

```ts
{
  id: "my-new-project",            // unique slug
  projectName: "My New Project",
  description: "Short description of the project.",
  owner: "Team Member Name",
  status: "Draft",                  // Draft | In Progress | Ready | Published
  lastUpdated: "2026-04-08",       // YYYY-MM-DD
  assets: {
    sop:                  { label: "SOP",                   description: "Standard operating procedure",              url: "", downloadUrl: "" },
    internalBrief:        { label: "Internal Brief",        description: "Internal strategy and context brief",       url: "", downloadUrl: "" },
    externalBrief:        { label: "External Brief",        description: "Client-facing brief",                       url: "", downloadUrl: "" },
    draftedHtml:          { label: "Drafted HTML",          description: "Draft HTML presentation",                   url: "", downloadUrl: "", feedbackEnabled: true },
    publishedApplication: { label: "Published Application", description: "Published live experience",                 url: "", downloadUrl: "" },
  },
}
```

### Update a link or file

Find the project by `id` in `src/data/projects.ts` and set:

- **`url`** — opens in a new tab (Open button)
- **`downloadUrl`** — triggers a download (Download button)

If both fields are empty, the dashboard shows **"Not yet added"** automatically.

### Change project status

Set `status` to one of: `"Draft"`, `"In Progress"`, `"Ready"`, or `"Published"`.

---

## Configuring the Feedback Email

The **Give Feedback** button on every Drafted HTML asset opens the user's email client with a pre-filled message. The recipient address is set in one place:

```
src/data/config.ts
```

```ts
export const appConfig = {
  feedbackEmail: "feedback@envision.com",   // ← change this
  // ...
};
```

The subject and body are generated automatically and include the project name and draft URL (when available).

---

## Project Structure

```
src/
├── app/
│   ├── globals.css        # Design tokens & global styles
│   ├── layout.tsx         # Root layout (font, metadata)
│   └── page.tsx           # Home route
├── components/
│   ├── AssetRow.tsx       # Single asset with Open / Download / Feedback actions
│   ├── Dashboard.tsx      # Client component: search, filter, sort, project list
│   ├── Header.tsx         # Page title and description
│   ├── ProjectCard.tsx    # Expandable project accordion card
│   ├── SearchBar.tsx      # Search input with clear button
│   ├── StatusBadge.tsx    # Colored status pill
│   └── StatusFilter.tsx   # Status tab filter bar
├── data/
│   ├── config.ts          # App-wide settings (feedback email, title, description)
│   └── projects.ts        # All project entries — single source of truth
└── types/
    └── index.ts           # Shared TypeScript interfaces
```

---

## Design System

Visual language follows the [UI/UX Pro Max](https://github.com/laurarestum/ui-ux-pro-max-skill) design intelligence recommendations for a SaaS-grade internal dashboard:

| Token | Value |
|-------|-------|
| Font | Plus Jakarta Sans (Google Fonts) |
| Primary | `#2563EB` (Trust Blue) |
| Background | `#F8FAFC` |
| Card surface | `#FFFFFF` |
| Border | `#E2E8F0` |
| Card radius | `1rem` |
| Button radius | `0.5rem` |
| Shadow | Subtle depth (`0 1px 2px …`) |
| Transitions | 200 ms base, 150 ms micro-interactions |
| Touch targets | 44 px+ minimum on mobile |
| Contrast | WCAG AA+ compliant |

All tokens are CSS custom properties in `src/app/globals.css`.

---

## Tech Stack

- **Next.js 16** — App Router, server & client components
- **TypeScript** — end-to-end type safety
- **Tailwind CSS v4** — utility-first styling with `@theme` tokens
- **Vercel** — zero-config deployment target
