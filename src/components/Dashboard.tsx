"use client";

import { useState, useMemo } from "react";
import type { ProjectStatus } from "@/types";
import { projects } from "@/data/projects";
import { SearchBar } from "./SearchBar";
import { StatusFilter } from "./StatusFilter";
import { ProjectCard } from "./ProjectCard";

type SortKey = "name" | "updated";

function SortIcon() {
  return (
    <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 7.5 7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5" />
    </svg>
  );
}

function ArchiveIcon() {
  return (
    <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
    </svg>
  );
}

export function Dashboard() {
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<ProjectStatus | "All">("All");
  const [sortBy, setSortBy] = useState<SortKey>("updated");
  const [archivedOpen, setArchivedOpen] = useState(false);

  const { active, archived } = useMemo(() => {
    const q = query.toLowerCase().trim();

    const matches = (p: (typeof projects)[number]) => {
      if (statusFilter !== "All" && p.status !== statusFilter) return false;
      if (q && !p.projectName.toLowerCase().includes(q) && !p.description.toLowerCase().includes(q)) return false;
      return true;
    };

    const sortFn = (a: (typeof projects)[number], b: (typeof projects)[number]) => {
      if (sortBy === "name") return a.projectName.localeCompare(b.projectName);
      return b.lastUpdated.localeCompare(a.lastUpdated);
    };

    const active = projects.filter((p) => !p.archived && matches(p)).sort(sortFn);
    const archived = projects.filter((p) => p.archived && matches(p)).sort(sortFn);

    return { active, archived };
  }, [query, statusFilter, sortBy]);

  const totalShowing = active.length + archived.length;

  return (
    <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-6 sm:px-6 lg:px-8">
      {/* ── Toolbar ─────────────────────────────────────────── */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex-1 max-w-md">
          <SearchBar value={query} onChange={setQuery} />
        </div>

        <button
          type="button"
          onClick={() => setSortBy((s) => (s === "updated" ? "name" : "updated"))}
          className="inline-flex items-center gap-1.5 self-start rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-xs font-medium text-[var(--color-text-secondary)] shadow-[var(--shadow-sm)] transition-all duration-[var(--duration-base)] hover:border-[var(--color-border-hover)] hover:text-[var(--color-text)] cursor-pointer"
          aria-label={`Sort by ${sortBy === "updated" ? "name" : "last updated"}`}
        >
          <SortIcon />
          {sortBy === "updated" ? "Newest first" : "A \u2013 Z"}
        </button>
      </div>

      {/* ── Status filter ──────────────────────────────────── */}
      <div className="mt-4">
        <StatusFilter active={statusFilter} onChange={setStatusFilter} />
      </div>

      {/* ── Active project list ─────────────────────────────── */}
      <div className="mt-6 flex flex-col gap-4">
        {active.length > 0 ? (
          active.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center rounded-[var(--radius-xl)] border border-dashed border-[var(--color-border)] py-16 text-center">
            <svg
              className="mx-auto h-10 w-10 text-[var(--color-text-muted)]"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
            <p className="mt-3 text-sm font-medium text-[var(--color-text-secondary)]">
              No projects found
            </p>
            <p className="mt-1 text-xs text-[var(--color-text-muted)]">
              Try adjusting your search or filters.
            </p>
          </div>
        )}
      </div>

      {/* ── Archived folder ─────────────────────────────────── */}
      {archived.length > 0 && (
        <div className="mt-8">
          <button
            type="button"
            onClick={() => setArchivedOpen((prev) => !prev)}
            className="flex w-full items-center gap-2 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-2.5 text-left text-sm font-medium text-[var(--color-text-secondary)] shadow-[var(--shadow-sm)] transition-all duration-[var(--duration-base)] hover:border-[var(--color-border-hover)] hover:text-[var(--color-text)] cursor-pointer"
            aria-expanded={archivedOpen}
          >
            <ArchiveIcon />
            <span className="flex-1">Archived</span>
            <span className="rounded-full bg-[var(--color-bg)] px-2 py-0.5 text-xs text-[var(--color-text-muted)]">
              {archived.length}
            </span>
            <svg
              className={`h-4 w-4 transition-transform duration-[var(--duration-base)] ${archivedOpen ? "rotate-180" : ""}`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
            </svg>
          </button>

          <div
            className={`grid transition-[grid-template-rows] duration-[var(--duration-slow)] ${
              archivedOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
            }`}
          >
            <div className="overflow-hidden">
              <div className="flex flex-col gap-4 pt-4">
                {archived.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Result count ───────────────────────────────────── */}
      {totalShowing > 0 && (
        <p className="mt-4 text-xs text-[var(--color-text-muted)]">
          Showing {totalShowing} of {projects.length} project{projects.length !== 1 ? "s" : ""}
        </p>
      )}
    </main>
  );
}
