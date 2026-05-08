"use client";

import { useState } from "react";
import type { Asset, Project, AssetKey } from "@/types";
import { appConfig } from "@/data/config";
import { StatusBadge } from "./StatusBadge";
import { PillarChip } from "./PillarChip";
import { AssetRow } from "./AssetRow";
import { DocumentViewer } from "./DocumentViewer";

const ADDITIONAL_ASSET_ORDER: AssetKey[] = [
  "sop",
  "internalBrief",
  "externalBrief",
  "draftedHtml",
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

function ExternalLinkIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
    </svg>
  );
}

function MailIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
    </svg>
  );
}

function FolderIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 0 0-1.883 2.542l.857 6a2.25 2.25 0 0 0 2.227 1.932H19.05a2.25 2.25 0 0 0 2.227-1.932l.857-6a2.25 2.25 0 0 0-1.883-2.542m-16.5 0V6A2.25 2.25 0 0 1 6 3.75h3.879a1.5 1.5 0 0 1 1.06.44l2.122 2.12a1.5 1.5 0 0 0 1.06.44H18A2.25 2.25 0 0 1 20.25 9v.776" />
    </svg>
  );
}

function LinkIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" />
    </svg>
  );
}

function CopyIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75" />
    </svg>
  );
}

function CheckIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
    </svg>
  );
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

async function copyPlainText(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    // fall through to legacy path
  }
  if (typeof document !== "undefined") {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    try {
      document.execCommand("copy");
      return true;
    } catch {
      return false;
    } finally {
      document.body.removeChild(ta);
    }
  }
  return false;
}

async function copyRichLink(label: string, url: string): Promise<boolean> {
  const html = `<a href="${escapeHtml(url)}">${escapeHtml(label)}</a>`;
  try {
    if (typeof ClipboardItem !== "undefined" && navigator.clipboard?.write) {
      await navigator.clipboard.write([
        new ClipboardItem({
          "text/html": new Blob([html], { type: "text/html" }),
          "text/plain": new Blob([url], { type: "text/plain" }),
        }),
      ]);
      return true;
    }
  } catch {
    // fall through to legacy path
  }
  if (typeof document !== "undefined") {
    const span = document.createElement("span");
    span.contentEditable = "true";
    span.style.position = "fixed";
    span.style.opacity = "0";
    span.innerHTML = html;
    document.body.appendChild(span);
    const range = document.createRange();
    range.selectNodeContents(span);
    const selection = window.getSelection();
    selection?.removeAllRanges();
    selection?.addRange(range);
    try {
      const ok = document.execCommand("copy");
      selection?.removeAllRanges();
      return ok;
    } catch {
      return false;
    } finally {
      document.body.removeChild(span);
    }
  }
  return false;
}

function formatDate(dateString: string): string {
  const date = new Date(dateString + "T00:00:00");
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function buildFeedbackMailto(projectName: string, liveUrl?: string): string {
  const subject = encodeURIComponent(`Feedback on ${projectName}`);
  const linkLine = liveUrl ? `\n\nLink:\n${liveUrl}` : "";
  const body = encodeURIComponent(
    `I am giving feedback on ${projectName}.${linkLine}\n\nFeedback:\n`
  );
  return `mailto:${appConfig.feedbackEmail}?subject=${subject}&body=${body}`;
}

function hasAssetContent(asset: Asset): boolean {
  return Boolean(asset.url) || Boolean(asset.downloadUrl) || Boolean(asset.feedbackEnabled);
}

function CardPreview({
  asset,
  projectName,
  onView,
}: {
  asset: Asset;
  projectName: string;
  onView: () => void;
}) {
  const previewUrl = asset.downloadUrl || asset.url;
  const isImage = previewUrl ? /\.(jpe?g|png|gif|webp|avif|svg)(\?|#|$)/i.test(previewUrl) : false;
  return (
    <div className="flex flex-col rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-bg)] overflow-hidden">
      <button
        type="button"
        onClick={onView}
        aria-label={`Preview ${projectName} ${asset.label}`}
        className={`relative block w-full ${isImage ? "aspect-[7/4]" : "aspect-[3/4]"} bg-white overflow-hidden cursor-pointer group`}
      >
        {previewUrl ? (
          <>
            {isImage ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={previewUrl}
                alt={`${projectName} ${asset.label} preview`}
                className="absolute inset-0 h-full w-full object-contain"
                loading="lazy"
              />
            ) : (
              <iframe
                src={`${previewUrl}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`}
                className="absolute inset-0 h-full w-full pointer-events-none"
                title={`${projectName} ${asset.label} preview`}
                loading="lazy"
              />
            )}
            <div className="absolute inset-0 bg-transparent group-hover:bg-black/5 transition-colors duration-[var(--duration-base)]" />
          </>
        ) : (
          <div className="flex h-full items-center justify-center text-xs text-[var(--color-text-muted)]">
            No preview
          </div>
        )}
      </button>
      <div className="flex items-center justify-between gap-2 border-t border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2">
        <div className="min-w-0">
          <p className="text-sm font-semibold text-[var(--color-text)] truncate">
            {asset.label}
          </p>
          {asset.description && (
            <p className="text-xs text-[var(--color-text-muted)] truncate">
              {asset.description}
            </p>
          )}
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          {previewUrl && (
            <button
              type="button"
              onClick={onView}
              className="inline-flex items-center gap-1 rounded-[var(--radius-md)] bg-[var(--color-primary)] px-2.5 py-1 text-xs font-medium text-white shadow-[var(--shadow-sm)] transition-all duration-[var(--duration-base)] hover:bg-[var(--color-primary-hover)] cursor-pointer"
            >
              View
            </button>
          )}
          {asset.downloadUrl && (
            <a
              href={asset.downloadUrl}
              download
              className="inline-flex items-center gap-1 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] px-2.5 py-1 text-xs font-medium text-[var(--color-text-secondary)] shadow-[var(--shadow-sm)] transition-all duration-[var(--duration-base)] hover:border-[var(--color-border-hover)] hover:text-[var(--color-text)] cursor-pointer"
            >
              Download
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export function ProjectCard({ project }: { project: Project }) {
  const [open, setOpen] = useState(false);
  const [showAdditional, setShowAdditional] = useState(false);
  const [previewAsset, setPreviewAsset] = useState<Asset | null>(null);
  const [copied, setCopied] = useState<"url" | "link" | null>(null);

  const liveUrl = project.assets.publishedApplication.url;
  const hasLive = Boolean(liveUrl);

  const handleCopy = async (mode: "url" | "link") => {
    if (!liveUrl) return;
    const ok =
      mode === "url"
        ? await copyPlainText(liveUrl)
        : await copyRichLink(project.projectName, liveUrl);
    if (ok) {
      setCopied(mode);
      window.setTimeout(() => {
        setCopied((current) => (current === mode ? null : current));
      }, 1800);
    }
  };
  const visibleAssetKeys = ADDITIONAL_ASSET_ORDER.filter((key) =>
    hasAssetContent(project.assets[key])
  );
  const extras = project.extras ?? [];

  return (
    <article
      className={`group relative overflow-hidden rounded-[var(--radius-xl)] border bg-[var(--color-surface)] transition-all duration-[var(--duration-base)] ${
        open
          ? "border-[var(--color-primary)]/30 shadow-[var(--shadow-lg)]"
          : "border-[var(--color-border)] shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)] hover:-translate-y-0.5 hover:border-[var(--color-border-hover)]"
      }`}
    >
      {/* Gradient left edge on open (brand: navy to bright blue) */}
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute inset-y-0 left-0 w-1 transition-opacity duration-[var(--duration-base)] ${
          open ? "opacity-100" : "opacity-0"
        }`}
        style={{ background: "var(--gradient-primary)" }}
      />
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
            {project.pillar && <PillarChip pillar={project.pillar} />}
            {project.assignee && (
              (Array.isArray(project.assignee) ? project.assignee : [project.assignee]).map((name) => (
                <span
                  key={name}
                  className="inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold"
                  style={{
                    background: "rgba(140, 71, 153, 0.10)",
                    color: "var(--brand-violet)",
                    boxShadow: "inset 0 0 0 1px rgba(140, 71, 153, 0.32)",
                  }}
                >
                  <svg className="h-3 w-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                  </svg>
                  <span className="sr-only">Assigned to </span>
                  {name}
                </span>
              ))
            )}
          </div>

          {/* Row 2: description */}
          {project.description && (
            <p className="mt-1 text-sm text-[var(--color-text-secondary)] line-clamp-1">
              {project.description}
            </p>
          )}

          {/* Status note (e.g. "Has updates") */}
          {(project.statusNote || project.updateNote) && (
            <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
              {project.statusNote && (
                (Array.isArray(project.statusNote) ? project.statusNote : [project.statusNote]).map((note, i) => (
                  project.statusNoteVariant === "blue" ? (
                    <div
                      key={i}
                      className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-bold animate-glow-blue animate-blink-blue"
                      style={{ background: "#e6ecf6", color: "var(--brand-blue)", boxShadow: "inset 0 0 0 1px rgba(0,48,135,0.35)" }}
                    >
                      <span className="inline-block h-2 w-2 rounded-full animate-glow-blue" style={{ background: "var(--brand-blue)" }} aria-hidden="true" />
                      <span className="sr-only">Update: </span>
                      {note}
                    </div>
                  ) : project.statusNoteVariant === "purple" ? (
                    <div
                      key={i}
                      className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold"
                      style={{ background: "rgba(140,71,153,0.10)", color: "var(--brand-violet)", boxShadow: "inset 0 0 0 1px rgba(140,71,153,0.32)" }}
                    >
                      <span className="inline-block h-2 w-2 rounded-full animate-glow-purple" style={{ background: "var(--brand-violet)" }} aria-hidden="true" />
                      <span className="sr-only">Note: </span>
                      {note}
                    </div>
                  ) : project.statusNoteVariant === "green" ? (
                    <div
                      key={i}
                      className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-bold animate-glow-emerald"
                      style={{ background: "var(--color-success-bg)", color: "var(--brand-forest)", boxShadow: "inset 0 0 0 1px var(--color-success-ring)" }}
                    >
                      <span className="inline-block h-2 w-2 rounded-full animate-glow-emerald" style={{ background: "var(--brand-green)" }} aria-hidden="true" />
                      <span className="sr-only">Note: </span>
                      {note}
                    </div>
                  ) : (
                    <div
                      key={i}
                      className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold"
                      style={{ background: "var(--color-warning-bg)", color: "#7a4a00", boxShadow: "inset 0 0 0 1px var(--color-warning-ring)" }}
                    >
                      <span className="inline-block h-2 w-2 rounded-full animate-pulse" style={{ background: "var(--brand-goldenrod)" }} aria-hidden="true" />
                      <span className="sr-only">Note: </span>
                      {note}
                    </div>
                  )
                ))
              )}
              {project.updateNote && (
                <div
                  className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold"
                  style={{ background: "var(--color-success-bg)", color: "var(--brand-forest)", boxShadow: "inset 0 0 0 1px var(--color-success-ring)" }}
                >
                  <span className="inline-block h-2 w-2 rounded-full animate-glow-emerald" style={{ background: "var(--brand-green)" }} aria-hidden="true" />
                  <span className="sr-only">Update: </span>
                  {project.updateNote}
                </div>
              )}
              {project.extraNote && (
                <div
                  className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-bold animate-glow-blue animate-blink-blue"
                  style={{ background: "#e6ecf6", color: "var(--brand-blue)", boxShadow: "inset 0 0 0 1px rgba(0,48,135,0.35)" }}
                >
                  <span className="inline-block h-2 w-2 rounded-full animate-glow-blue" style={{ background: "var(--brand-blue)" }} aria-hidden="true" />
                  <span className="sr-only">Update: </span>
                  {project.extraNote}
                </div>
              )}
            </div>
          )}

          {/* Row 3: meta */}
          <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[var(--color-text-muted)]">
            <span className="inline-flex items-center gap-1">
              <UserIcon />
              {project.owner}
            </span>
            <span className="inline-flex items-center gap-1">
              <CalendarIcon />
              <span data-numeric="true">{formatDate(project.lastUpdated)}</span>
            </span>
          </div>
        </div>

        <ChevronIcon open={open} />
      </button>

      {/* ── Expandable action panel ───────────────────────── */}
      <div
        className={`grid transition-[grid-template-rows] duration-[var(--duration-slow)] ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <div className="flex flex-col gap-3 border-t border-[var(--color-border)] px-5 pt-5 pb-5">
            {/* Live link: primary big button */}
            {hasLive ? (
              <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-on-color="true"
                style={{ background: "var(--gradient-primary-deep)" }}
                className="btn-brand inline-flex w-full items-center justify-center gap-2 rounded-[var(--radius-lg)] px-5 py-3.5 text-sm text-white shadow-[var(--shadow-glow-primary)] transition-all duration-[var(--duration-base)] hover:-translate-y-px hover:shadow-[var(--shadow-lg)] cursor-pointer"
              >
                <ExternalLinkIcon />
                Open live link
              </a>
            ) : (
              <div className="inline-flex w-full items-center justify-center gap-2 rounded-[var(--radius-lg)] border border-dashed border-[var(--color-border)] bg-[var(--color-bg)] px-5 py-3.5 text-sm font-medium text-[var(--color-text-muted)]">
                Live link not yet available
              </div>
            )}

            {/* Share: copy URL or copy as embedded hyperlink */}
            {hasLive && (
              <div
                className="grid grid-cols-1 gap-2 sm:grid-cols-2"
                role="group"
                aria-label={`Share ${project.projectName} link`}
              >
                <button
                  type="button"
                  onClick={() => handleCopy("url")}
                  aria-live="polite"
                  className="inline-flex items-center justify-center gap-1.5 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-xs font-bold uppercase tracking-[0.12em] text-[var(--color-text-secondary)] shadow-[var(--shadow-sm)] transition-all duration-[var(--duration-base)] hover:border-[var(--color-border-hover)] hover:text-[var(--color-text)] cursor-pointer"
                >
                  {copied === "url" ? (
                    <>
                      <CheckIcon />
                      Copied URL
                    </>
                  ) : (
                    <>
                      <CopyIcon />
                      Copy URL
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => handleCopy("link")}
                  aria-live="polite"
                  title={`Copies a hyperlink labeled "${project.projectName}" — paste into your email and the project name will be clickable.`}
                  className="inline-flex items-center justify-center gap-1.5 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-xs font-bold uppercase tracking-[0.12em] text-[var(--color-text-secondary)] shadow-[var(--shadow-sm)] transition-all duration-[var(--duration-base)] hover:border-[var(--color-border-hover)] hover:text-[var(--color-text)] cursor-pointer"
                >
                  {copied === "link" ? (
                    <>
                      <CheckIcon />
                      Copied hyperlink
                    </>
                  ) : (
                    <>
                      <LinkIcon />
                      Copy as hyperlink
                    </>
                  )}
                </button>
              </div>
            )}

            {/* Give Feedback: small button below live link */}
            <a
              href={buildFeedbackMailto(project.projectName, liveUrl)}
              className="inline-flex items-center justify-center gap-1.5 self-center rounded-[var(--radius-md)] px-3 py-1.5 text-xs font-bold uppercase tracking-[0.15em] shadow-[var(--shadow-sm)] transition-all duration-[var(--duration-base)] hover:-translate-y-px hover:shadow-[var(--shadow-md)] cursor-pointer"
              style={{
                background: "var(--color-warning-bg)",
                color: "#7a4a00",
                boxShadow: "inset 0 0 0 1px var(--color-warning-ring), var(--shadow-sm)",
              }}
            >
              <MailIcon />
              Give feedback
            </a>

            {/* Additional Assets: primary big button */}
            <button
              type="button"
              onClick={() => setShowAdditional((prev) => !prev)}
              aria-expanded={showAdditional}
              className="btn-brand inline-flex w-full items-center justify-center gap-2 rounded-[var(--radius-lg)] border bg-[var(--color-primary-light)] px-5 py-3.5 text-sm shadow-[var(--shadow-sm)] transition-all duration-[var(--duration-base)] hover:-translate-y-px hover:shadow-[var(--shadow-md)] cursor-pointer"
              style={{ borderColor: "var(--color-primary)", color: "var(--color-primary)" }}
            >
              <FolderIcon />
              Additional assets
              <ChevronIcon open={showAdditional} />
            </button>

            {/* Nested asset list */}
            <div
              className={`grid transition-[grid-template-rows] duration-[var(--duration-base)] ${
                showAdditional ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <div className="overflow-hidden">
                <div className="flex flex-col gap-3 pt-2">
                  {extras.length > 0 && (
                    <div
                      className={`grid gap-3 ${
                        extras.length > 1 ? "sm:grid-cols-2" : "grid-cols-1"
                      }`}
                    >
                      {extras.map((asset, idx) => (
                        <CardPreview
                          key={`extra-${idx}`}
                          asset={asset}
                          projectName={project.projectName}
                          onView={() => setPreviewAsset(asset)}
                        />
                      ))}
                    </div>
                  )}
                  {visibleAssetKeys.map((key) => (
                    <AssetRow
                      key={key}
                      asset={project.assets[key]}
                      projectName={project.projectName}
                    />
                  ))}
                  {extras.length === 0 && visibleAssetKeys.length === 0 && (
                    <p className="px-1 py-2 text-xs italic text-[var(--color-text-muted)]">
                      No additional assets yet.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {previewAsset && (previewAsset.downloadUrl || previewAsset.url) && (
        <DocumentViewer
          url={(previewAsset.downloadUrl || previewAsset.url) as string}
          title={`${project.projectName}: ${previewAsset.label}`}
          onClose={() => setPreviewAsset(null)}
        />
      )}
    </article>
  );
}
