"use client";

import { useState } from "react";
import type { Project, AssetKey } from "@/types";
import { StatusBadge } from "./StatusBadge";
import { AssetRow } from "./AssetRow";

const ASSET_ORDER: AssetKey[] = [
  "sop",
  "internalBrief",
  "externalBrief",
  "draftedHtml",
  "publishedApplication",
];

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      className={`h-5 w-5 text-[var(--color-text-muted)] transition-transform duration-[var(--duration-base)] ${
        open ? "rotate-180" : ""
      }`}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m19.5 8.25-7.5 7.5-7.5-7.5"
      />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg className="h-3.5 w-3.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg className="h-3.5 w-3.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
    </svg>
  );
}

function formatDate(dateString: string): string {
  const date = new Date(dateString + "T00:00:00");
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function ProjectCard({ project }: { project: Project }) {
  const [open, setOpen] = useState(false);

  return (
    <article
      className={`overflow-hidden rounded-[var(--radius-xl)] border bg-[var(--color-surface)] transition-all duration-[var(--duration-base)] ${
        open
          ? "border-[var(--color-primary)]/30 shadow-[var(--shadow-md)]"
          : "border-[var(--color-border)] shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)] hover:-translate-y-0.5"
      }`}
    >
      {/* ── Header (clickable toggle) ─────────────────────── */}
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex w-full items-start gap-4 px-5 py-4 text-left cursor-pointer sm:items-center"
        aria-expanded={open}
      >
        <div className="flex-1 min-w-0">
          {/* Row 1: name + status + assignee */}
          <div className="flex flex-wrap items-center gap-2">
            {project.archived && (
              <svg className="h-4 w-4 shrink-0 text-[var(--color-text-muted)]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-label="Archived" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
              </svg>
            )}
            <h2 className="text-base font-bold text-[var(--color-text)] truncate">
              {project.projectName}
            </h2>
            <StatusBadge status={project.status} />
            {project.assignee && (
              <span className="inline-flex items-center gap-1 rounded-full bg-violet-50 px-2.5 py-0.5 text-xs font-semibold text-violet-700 border border-violet-200">
                <svg className="h-3 w-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                </svg>
                {project.assignee}
              </span>
            )}
          </div>

          {/* Row 2: description */}
          {project.description && (
            <p className="mt-1 text-sm text-[var(--color-text-secondary)] line-clamp-1">
              {project.description}
            </p>
          )}

          {/* Status note (e.g. "Has updates") */}
          {project.statusNote && (
            project.statusNoteVariant === "blue" ? (
              <div className="mt-1.5 inline-flex items-center gap-1.5 rounded-full bg-blue-50 border border-blue-200 px-2.5 py-0.5 text-xs font-medium text-blue-700">
                <span className="inline-block h-2 w-2 rounded-full bg-blue-500 animate-glow-blue" />
                {project.statusNote}
              </div>
            ) : project.statusNoteVariant === "purple" ? (
              <div className="mt-1.5 inline-flex items-center gap-1.5 rounded-full bg-violet-50 border border-violet-200 px-2.5 py-0.5 text-xs font-medium text-violet-700">
                <span className="inline-block h-2 w-2 rounded-full bg-violet-500 animate-glow-purple" />
                {project.statusNote}
              </div>
            ) : (
              <div className="mt-1.5 inline-flex items-center gap-1.5 rounded-full bg-amber-50 border border-amber-200 px-2.5 py-0.5 text-xs font-medium text-amber-700">
                <span className="inline-block h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
                {project.statusNote}
              </div>
            )
          )}

          {/* Row 3: meta */}
          <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[var(--color-text-muted)]">
            <span className="inline-flex items-center gap-1">
              <UserIcon />
              {project.owner}
            </span>
            <span className="inline-flex items-center gap-1">
              <CalendarIcon />
              {formatDate(project.lastUpdated)}
            </span>
          </div>
        </div>

        <ChevronIcon open={open} />
      </button>

      {/* ── Expandable asset list ─────────────────────────── */}
      <div
        className={`grid transition-[grid-template-rows] duration-[var(--duration-slow)] ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <div className="flex flex-col gap-2 border-t border-[var(--color-border)] px-5 pt-4 pb-5">
            <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">
              Assets
            </p>
            {ASSET_ORDER.map((key) => (
              <AssetRow
                key={key}
                asset={project.assets[key]}
                projectName={project.projectName}
              />
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}
