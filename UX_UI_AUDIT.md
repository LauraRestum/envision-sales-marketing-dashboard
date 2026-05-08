# UX/UI Design Audit — Sales Asset Hub

**Audit date:** 2026-05-08
**Branch:** `claude/ux-ui-design-audit-75ISx`
**Scope:** All client-facing surfaces in `src/app/` and `src/components/`, plus design tokens in `src/app/globals.css`.

---

## 1. Executive summary

The Sales Asset Hub is a small, well-structured internal dashboard built on a coherent design-token system (Trust Blue primary, Plus Jakarta Sans, 4px spacing rhythm). The visual language is calm and SaaS-appropriate, semantic HTML is mostly correct, and reduced-motion support is in place.

There are, however, a handful of issues worth fixing before the next iteration:

- **One user-visible bug** (search placeholder shows a literal `…` rather than an ellipsis).
- **Accessibility gaps in the document modal** — no focus trap, no initial focus, sub-44px close target, no iframe sandbox.
- **Visual-hierarchy ambiguity** in the project card panel (two competing primary buttons; "Give Feedback" amber pill clashes with the "In Progress" amber status badge).
- **Persistent attention-grabbing animations** (glow/blink) on status notes are over-tuned for a sales-team dashboard and undermine the calm tone the rest of the system establishes.
- **A few interaction inconsistencies** in the toolbar (sort toggle that conflates "current state" with "click action"; status filter that can produce confusing empty states).

Severity tiers used below: **P0** = visible bug or accessibility blocker; **P1** = clear UX regression worth fixing this sprint; **P2** = polish / consistency; **P3** = strategic / future-state.

---

## 2. Findings

### 2.1 Bugs (P0)

**B1. Search placeholder displays the literal escape sequence `…`.**
`src/components/SearchBar.tsx:30`

```tsx
placeholder="Search projects…"
```

JSX attribute string values are parsed as HTML-like attributes, not JavaScript string literals — so `…` is rendered as the eight characters `…` rather than as `…`. Fix: either move into a JS expression (`placeholder={"Search projects…"}`) or use the literal character (`placeholder="Search projects…"`).

(Note: the same escape pattern in `Dashboard.tsx:71` — `"A – Z"` — is fine because it sits inside a JS expression.)

---

### 2.2 Accessibility (P0 / P1)

**A1. `DocumentViewer` has no focus management. (P0)**
`src/components/DocumentViewer.tsx`

When the modal opens, focus is not moved into the dialog, and Tab can escape it back into the dimmed page. WCAG 2.4.3 / 2.1.2. Fix:
- On mount, move focus to the close button (or the dialog container).
- Trap Tab/Shift+Tab inside the dialog while it's open.
- On unmount, restore focus to the trigger element.

**A2. Modal close button is below the 44px touch target the README promises. (P1)**
`src/components/DocumentViewer.tsx:75-84` — the close button is `p-1.5` around a 20px icon (~32px square). Same issue applies to:
- Search bar clear button (`SearchBar.tsx:38-42`, ~24px).
- Sort toggle (`Dashboard.tsx:64-72`, ~32px tall).

Bump padding so the *hit area* is 44px even if the visible glyph is smaller, e.g. wrap the close glyph in `min-h-11 min-w-11`.

**A3. Iframes have no `sandbox` or `referrerPolicy`. (P1)**
- Thumbnail iframes in `ProjectCard.tsx:131-137` (used for PDF previews).
- Modal iframe in `DocumentViewer.tsx:110-115`.

For local trusted assets the risk is low, but the Google Docs viewer URL (`docs.google.com/gview?...`) is third-party and should at minimum carry `referrerPolicy="no-referrer"`. The thumbnail iframes should also have `aria-hidden="true"` and `tabindex={-1}` so screen-reader users don't tab into a non-interactive preview.

**A4. Modal labelling can be tightened. (P2)**
The dialog uses `aria-label`, but a real `<h3>` heading already exists at `DocumentViewer.tsx:60`. Switch to `aria-labelledby` pointing at that heading's id — screen readers will then announce the actual document title.

**A5. Section landmarks are thin. (P2)**
Active vs. archived projects are visually distinct sections but have no headings or `<section aria-label>`. A screen-reader user has no way to jump from the active list to the archived list. Add `<h2 className="sr-only">Active projects</h2>` (and similarly "Archived") inside `Dashboard.tsx`.

**A6. Status conveyed by color alone in `statusNote` dot. (P2)**
The 2×2 colored dot to the left of each status-note pill is decorative (the text already conveys the state). Mark it `aria-hidden="true"`. (It currently lacks any `aria-*` attribute.)

---

### 2.3 Visual hierarchy & interaction model

**H1. The expanded project card has two competing primary buttons. (P1)**
`src/components/ProjectCard.tsx:306-341`

Inside one panel:
- "Open Live Link" — solid blue, full-width, `py-3.5`.
- "Additional Assets" — primary-colored border + tinted blue background, full-width, `py-3.5`.

Both read as "primary" because they share the same scale, padding, and full-width footprint. The result is that the eye doesn't know which is *the* action. Recommendations (in order of preference):

1. Demote "Additional Assets" to a tertiary disclosure — same height, neutral border, same blue chevron, no tint. The `<FolderIcon />` + chevron still signal "expandable".
2. Or, only render "Additional Assets" once an asset *exists* — for the four archived/`Presented` projects with no extras, the disclosure expands to "No additional assets yet." which is wasted real estate.

**H2. "Give Feedback" pill collides chromatically with the "In Progress" status badge. (P1)**
Both use the `bg-amber-50 / text-amber-700 / border-amber-200` family (`AssetRow.tsx:126`, `ProjectCard.tsx:325`, vs. `StatusBadge.tsx:6`). On a card whose status badge is amber, the user sees two amber elements and has to read each to disambiguate "feedback action" from "status indicator". Move feedback to a neutral or subtle blue treatment — color signals action, not status.

**H3. Animated, glowing status pills are too loud for a calm dashboard. (P1)**
`globals.css:86-122` and `ProjectCard.tsx:243-274`

The blue `animate-glow-blue animate-blink-blue` continuously flashes — colors invert every 1.5s. In a SaaS dashboard with multiple cards open, this is the visual equivalent of an alarm bell that never stops. It also runs in perpetuity, regardless of whether the user has acknowledged the note.

Recommendations:
- Replace the blink keyframe with a single subtle pulse on mount, then settle.
- Or: keep static color, drop the glow/blink classes, and rely on the dot + colored border for noticeability.
- If a "draw the eye" treatment is needed, restrict it to *one* note per page (the most recent unread) rather than every note that happens to carry the variant.

**H4. Sort toggle conflates "selected state" with "click action". (P2)**
`src/components/Dashboard.tsx:64-72`

The button text reads "Newest first" when newest-first is currently active. This pattern works in toolbars where users already understand the toggle, but it routinely confuses first-time users ("does clicking *go to* newest first, or does it *leave* newest first?"). Two-state toggles benefit from one of:

- A leading label: `Sort: Newest first` — clearly state, with click action implied.
- A segmented control: `[ Newest ] [ A–Z ]` — no ambiguity, two clicks instead of one.
- `aria-pressed` semantics + a chevron that opens a menu — most extensible if more sort keys appear.

**H5. Status filter can produce a misleading empty state. (P2)**
`src/components/Dashboard.tsx:48-52`, `StatusFilter.tsx`

Filtering by `Presented` shows "No projects found" because every Presented project is archived (and archived projects only appear inside the collapsed Archived folder). The user picked a real status with real matches and saw a deceptive empty state.

Fixes:
- When the active list is empty but the archived list isn't, automatically expand the Archived folder, or
- Show "0 active · 6 archived" inline so the user knows where to look, or
- Drop "Presented" from the status filter (since no active projects ever carry it in current data).

**H6. "Showing X of Y" message is far from the controls that determine X. (P3)**
`Dashboard.tsx:156-160` — sits at the bottom of the list. Move next to the sort/filter row so users can see the impact of a filter change without scrolling.

---

### 2.4 Performance

**P1. Heavy iframe thumbnails load eagerly. (P1)**
`ProjectCard.tsx:131-137` renders a PDF preview iframe for each `extras` asset whose card is opened. With many extras across many projects, opening several cards loads several PDF renderers in parallel. Mitigations:
- Lazy-render the iframe only when the additional-assets panel is expanded *and* on screen (`IntersectionObserver`), or
- Show a static placeholder image and only mount the iframe inside the modal.

**P2. Web fonts are loaded via `<link>` instead of `next/font`. (P2)**
`src/app/layout.tsx:18-30` uses Google Fonts CDN links. Next.js 16's `next/font/google` self-hosts the font, eliminates layout shift via `size-adjust`, and avoids the third-party round-trip. Recommended migration.

**P3. Native `<input type="search">` UA clear button can collide with the custom one on WebKit. (P3)**
Add CSS `::-webkit-search-cancel-button { display: none; }` so only the custom clear button shows.

---

### 2.5 Content & copy

**C1. Project descriptions are templated boilerplate.**
`src/data/projects.ts` — every project description is `"Presentation materials and working assets for the [X] project."` This adds visual noise without conveying anything new. Either remove the description from the card header when it duplicates the title, or commit to one-line *summaries* (deal stage, target client, vertical) that earn their space.

**C2. Empty-state copy is generic.**
`Dashboard.tsx:102-107` — "No projects found / Try adjusting your search or filters." Acceptable, but could be sharper: tell the user *what* filter is active. Example: `No Draft projects match "phil"`.

**C3. "Live link not yet available" placeholder. (P3)**
`ProjectCard.tsx:317-319` — currently a dashed-border block the same height as the live-link CTA. Consider compressing to a single line of muted text so the user's eye can skip past it to the assets that *are* available.

---

### 2.6 Mobile / responsive

**M1. Project name truncation can hide critical info.**
`ProjectCard.tsx:217-219` uses `truncate` (single line + ellipsis) on the `<h2>`. With long client names + the status badge + assignee chip on a 360px viewport, the name disappears into "Lange — One-on-One Mee…". Switch to `line-clamp-2` and let the metadata flow below.

**M2. Status filter row wraps unevenly.**
With six tabs and three of the labels two words long, the filter wraps to 2-3 rows on phones. Prefer a horizontal-scroll strip with `snap-x` and a fade-out on the trailing edge — the row stays one line and the user discovers more via swipe.

**M3. Toolbar `flex-col → sm:flex-row` puts sort below search at narrow widths.**
That's correct, but the Sort button then sits left-aligned (`self-start`) under a full-width search box. Visual rhythm is better with the sort button right-aligned at all widths, or moved into an overflow menu on mobile.

---

### 2.7 Future-state / strategic (P3)

**F1. No dark mode.** Tokens are defined as CSS variables but only one theme is mapped. Adding a `:root.dark` (or `@media (prefers-color-scheme: dark)`) block would be a low-cost win for sales reps working in dim conference rooms.

**F2. Mailto-only feedback flow.** Fragile on managed Windows machines without a default mail client. Consider a simple in-app form posting to a Slack webhook or an internal email API as a fallback.

**F3. No persisted UI state.** Search query, sort, and filter all reset on reload. A short-lived `sessionStorage` cache would let users refresh the page without losing context.

**F4. No keyboard shortcuts.** A power user with eight projects would benefit from `/` to focus search and `Esc` to clear, plus `1-6` to switch status filters. Document any new shortcuts in a tooltip on the search field.

**F5. The "Archived" folder hides everything by default.** With most projects in the data set archived, the user lands on a near-empty page. Either default the folder to open when active count is small, or show counts in the section header.

---

## 3. Quick-win checklist

In rough order of effort vs. impact:

1. **[1 line]** Fix the `…` literal in the search placeholder (B1).
2. **[~5 lines]** Add `aria-hidden="true"` + `tabIndex={-1}` to thumbnail iframes (A3).
3. **[~10 lines]** Implement focus trap and initial focus in `DocumentViewer` (A1).
4. **[~5 lines]** Increase modal close-button hit area to 44×44 (A2).
5. **[~3 lines]** Switch `aria-label` → `aria-labelledby` on the modal heading (A4).
6. **[design call]** Tone down `animate-glow-blue` / `animate-blink-blue` to a single mount-time pulse (H3).
7. **[design call]** Re-treat "Additional Assets" as tertiary, not co-primary (H1).
8. **[design call]** Move "Give Feedback" off the amber palette (H2).
9. **[~5 lines]** Auto-expand Archived when active list is empty under a filter (H5).
10. **[~20 lines]** Migrate Plus Jakarta Sans to `next/font/google` (P2).

---

## 4. What's working well

Worth preserving as the design evolves:

- Token system is clean, internally consistent, and easy to extend (`globals.css:11-46`).
- Reduced-motion media query is correctly implemented (`globals.css:126-135`).
- Card status badges are color **and** text **and** dot — robust beyond color-only signaling.
- Dashboard layout is calm and scannable; the card-level expand pattern is more usable than a separate detail page would be for this dataset size.
- Empty state for "no results" exists and is on-brand.
- Semantic HTML (`<article>`, `<header>`, `<main>`, `role="tablist"`, `role="dialog"`) is mostly correct.
- The CardPreview thumbnail concept is a strong micro-interaction — file previews render *in situ* and the click-to-modal flow feels native.

---

*End of audit.*
