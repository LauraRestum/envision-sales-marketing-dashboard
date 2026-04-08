import type { Asset } from "@/types";
import { appConfig } from "@/data/config";

/* ── Icon components ────────────────────────────────────────── */

function ExternalLinkIcon() {
  return (
    <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
    </svg>
  );
}

/* ── Helpers ─────────────────────────────────────────────────── */

function buildMailtoHref(projectName: string, draftUrl?: string): string {
  const subject = encodeURIComponent(`Feedback on ${projectName} Drafted HTML`);

  const linkLine = draftUrl ? `\n\nLink:\n${draftUrl}` : "";
  const body = encodeURIComponent(
    `I am giving feedback on the drafted HTML for ${projectName}.${linkLine}\n\nFeedback:\n`
  );

  return `mailto:${appConfig.feedbackEmail}?subject=${subject}&body=${body}`;
}

function hasContent(asset: Asset): boolean {
  return Boolean(asset.url) || Boolean(asset.downloadUrl);
}

/* ── AssetRow component ──────────────────────────────────────── */

interface AssetRowProps {
  asset: Asset;
  projectName: string;
}

export function AssetRow({ asset, projectName }: AssetRowProps) {
  const available = hasContent(asset);

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-bg)] px-4 py-3.5">
      {/* Label + description */}
      <div className="min-w-0">
        <p className="text-sm font-semibold text-[var(--color-text)]">
          {asset.label}
        </p>
        {asset.description && (
          <p className="mt-0.5 text-xs text-[var(--color-text-muted)] truncate">
            {asset.description}
          </p>
        )}
      </div>

      {/* Actions */}
      {available || asset.feedbackEnabled ? (
        <div className="flex flex-wrap items-center gap-2 shrink-0">
          {asset.url && (
            <a
              href={asset.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-[var(--radius-md)] bg-[var(--color-primary)] px-3 py-1.5 text-xs font-medium text-white shadow-[var(--shadow-sm)] transition-all duration-[var(--duration-base)] hover:bg-[var(--color-primary-hover)] hover:-translate-y-px hover:shadow-[var(--shadow-md)] cursor-pointer"
            >
              <ExternalLinkIcon />
              Open
            </a>
          )}

          {asset.downloadUrl && (
            <a
              href={asset.downloadUrl}
              download
              className="inline-flex items-center gap-1.5 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-1.5 text-xs font-medium text-[var(--color-text-secondary)] shadow-[var(--shadow-sm)] transition-all duration-[var(--duration-base)] hover:border-[var(--color-border-hover)] hover:text-[var(--color-text)] hover:-translate-y-px hover:shadow-[var(--shadow-md)] cursor-pointer"
            >
              <DownloadIcon />
              Download
            </a>
          )}

          {asset.feedbackEnabled && (
            <a
              href={buildMailtoHref(projectName, asset.url)}
              className="inline-flex items-center gap-1.5 rounded-[var(--radius-md)] border border-amber-200 bg-amber-50 px-3 py-1.5 text-xs font-medium text-amber-700 shadow-[var(--shadow-sm)] transition-all duration-[var(--duration-base)] hover:bg-amber-100 hover:-translate-y-px hover:shadow-[var(--shadow-md)] cursor-pointer"
            >
              <MailIcon />
              Give Feedback
            </a>
          )}
        </div>
      ) : (
        <span className="text-xs italic text-[var(--color-text-muted)]">
          Not yet added
        </span>
      )}
    </div>
  );
}
