"use client";

import { useState } from "react";
import type { Asset, Project, AssetKey } from "@/types";
import { appConfig } from "@/data/config";
import { StatusBadge } from "./StatusBadge";
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

  const liveUrl = project.assets.publishedApplication.url;
  const hasLive = Boolean(liveUrl);
  const visibleAssetKeys = ADDITIONAL_ASSET_ORDER.filter((key) =>
    hasAssetContent(project.assets[key])
  );
  const extras = project.extras ?? [];

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
          {(project.statusNote || project.updateNote) && (
            <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
              {project.statusNote && (
                project.statusNoteVariant === "blue" ? (
                  <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 border border-blue-300 px-2.5 py-0.5 text-xs font-semibold text-blue-700 animate-glow-blue animate-blink-blue">
                    <span className="inline-block h-2 w-2 rounded-full bg-blue-500 animate-glow-blue" />
                    {project.statusNote}
                  </div>
                ) : project.statusNoteVariant === "purple" ? (
                  <div className="inline-flex items-center gap-1.5 rounded-full bg-violet-50 border border-violet-200 px-2.5 py-0.5 text-xs font-medium text-violet-700">
                    <span className="inline-block h-2 w-2 rounded-full bg-violet-500 animate-glow-purple" />
                    {project.statusNote}
                  </div>
                ) : (
                  <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 border border-amber-200 px-2.5 py-0.5 text-xs font-medium text-amber-700">
                    <span className="inline-block h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
                    {project.statusNote}
                  </div>
                )
              )}
              {project.updateNote && (
                <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 text-xs font-medium text-emerald-700">
                  <span className="inline-block h-2 w-2 rounded-full bg-emerald-500 animate-glow-emerald" />
                  {project.updateNote}
                </div>
              )}
              {project.extraNote && (
                <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 border border-blue-300 px-2.5 py-0.5 text-xs font-semibold text-blue-700 animate-glow-blue animate-blink-blue">
                  <span className="inline-block h-2 w-2 rounded-full bg-blue-500 animate-glow-blue" />
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
              {formatDate(project.lastUpdated)}
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
            {/* Live link — primary big button */}
            {hasLive ? (
              <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-[var(--radius-lg)] bg-[var(--color-primary)] px-5 py-3.5 text-sm font-semibold text-white shadow-[var(--shadow-sm)] transition-all duration-[var(--duration-base)] hover:bg-[var(--color-primary-hover)] hover:-translate-y-px hover:shadow-[var(--shadow-md)] cursor-pointer"
              >
                <ExternalLinkIcon />
                Open Live Link
              </a>
            ) : (
              <div className="inline-flex w-full items-center justify-center gap-2 rounded-[var(--radius-lg)] border border-dashed border-[var(--color-border)] bg-[var(--color-bg)] px-5 py-3.5 text-sm font-medium text-[var(--color-text-muted)]">
                Live link not yet available
              </div>
            )}

            {/* Give Feedback — small button below live link */}
            <a
              href={buildFeedbackMailto(project.projectName, liveUrl)}
              className="inline-flex items-center justify-center gap-1.5 self-center rounded-[var(--radius-md)] border border-amber-200 bg-amber-50 px-3 py-1.5 text-xs font-medium text-amber-700 shadow-[var(--shadow-sm)] transition-all duration-[var(--duration-base)] hover:bg-amber-100 hover:-translate-y-px hover:shadow-[var(--shadow-md)] cursor-pointer"
            >
              <MailIcon />
              Give Feedback
            </a>

            {/* Additional Assets — primary big button */}
            <button
              type="button"
              onClick={() => setShowAdditional((prev) => !prev)}
              aria-expanded={showAdditional}
              className="inline-flex w-full items-center justify-center gap-2 rounded-[var(--radius-lg)] border border-[var(--color-primary)] bg-[var(--color-primary-light)] px-5 py-3.5 text-sm font-semibold text-[var(--color-primary)] shadow-[var(--shadow-sm)] transition-all duration-[var(--duration-base)] hover:bg-blue-100 hover:-translate-y-px hover:shadow-[var(--shadow-md)] cursor-pointer"
            >
              <FolderIcon />
              Additional Assets
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
          title={`${project.projectName} — ${previewAsset.label}`}
          onClose={() => setPreviewAsset(null)}
        />
      )}
    </article>
  );
}
