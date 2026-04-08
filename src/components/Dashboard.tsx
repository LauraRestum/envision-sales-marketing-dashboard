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

export function Dashboard() {
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<ProjectStatus | "All">("All");
  const [sortBy, setSortBy] = useState<SortKey>("updated");

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();

    let result = projects.filter((p) => {
      if (statusFilter !== "All" && p.status !== statusFilter) return false;
      if (q && !p.projectName.toLowerCase().includes(q) && !p.description.toLowerCase().includes(q)) return false;
      return true;
    });

    result = [...result].sort((a, b) => {
      if (sortBy === "name") return a.projectName.localeCompare(b.projectName);
      return b.lastUpdated.localeCompare(a.lastUpdated);
    });

    return result;
  }, [query, statusFilter, sortBy]);

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

      {/* ── Project list ───────────────────────────────────── */}
      <div className="mt-6 flex flex-col gap-4">
        {filtered.length > 0 ? (
          filtered.map((project) => (
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

      {/* ── Result count ───────────────────────────────────── */}
      {filtered.length > 0 && (
        <p className="mt-4 text-xs text-[var(--color-text-muted)]">
          Showing {filtered.length} of {projects.length} project{projects.length !== 1 ? "s" : ""}
        </p>
      )}
    </main>
  );
}
