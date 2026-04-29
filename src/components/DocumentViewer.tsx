"use client";

import { useState, useEffect, useCallback } from "react";

interface DocumentViewerProps {
  url: string;
  title: string;
  onClose: () => void;
}

export function DocumentViewer({ url, title, onClose }: DocumentViewerProps) {
  const [loading, setLoading] = useState(true);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [handleKeyDown]);

  const isHtml = /\.html?$/i.test(url);
  const isPdf = /\.pdf(\?.*)?$/i.test(url);

  // For Google Docs viewer, convert relative URLs to absolute (Google needs a full URL)
  const absoluteUrl =
    url.startsWith("/") && typeof window !== "undefined"
      ? `${window.location.origin}${url}`
      : url;

  // Render HTML and PDF files natively in the browser; fall back to Google Docs viewer for office documents
  const viewerUrl =
    isHtml || isPdf
      ? url
      : `https://docs.google.com/gview?url=${encodeURIComponent(absoluteUrl)}&embedded=true`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 sm:p-6"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-label={`Viewing ${title}`}
    >
      <div className="relative flex flex-col w-full max-w-4xl h-[85vh] rounded-[var(--radius-xl)] bg-[var(--color-surface)] shadow-[var(--shadow-lg)] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between gap-3 border-b border-[var(--color-border)] px-5 py-3">
          <div className="min-w-0">
            <h3 className="text-sm font-semibold text-[var(--color-text)] truncate">
              {title}
            </h3>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <a
              href={url}
              download
              className="inline-flex items-center gap-1.5 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-1.5 text-xs font-medium text-[var(--color-text-secondary)] transition-all duration-[var(--duration-base)] hover:border-[var(--color-border-hover)] hover:text-[var(--color-text)] cursor-pointer"
            >
              <svg className="h-3.5 w-3.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
              </svg>
              Download
            </a>
            <button
              type="button"
              onClick={onClose}
              className="rounded-[var(--radius-md)] p-1.5 text-[var(--color-text-muted)] hover:bg-slate-100 hover:text-[var(--color-text)] transition-colors duration-[var(--duration-fast)] cursor-pointer"
              aria-label="Close viewer"
            >
              <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Iframe */}
        <div className="relative flex-1">
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-[var(--color-bg)]">
              <div className="flex flex-col items-center gap-3">
                <svg className="h-8 w-8 animate-spin text-[var(--color-primary)]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                <p className="text-sm text-[var(--color-text-muted)]">Loading document…</p>
              </div>
            </div>
          )}
          <iframe
            src={viewerUrl}
            className="h-full w-full border-0"
            title={`Document viewer: ${title}`}
            onLoad={() => setLoading(false)}
          />
        </div>
      </div>
    </div>
  );
}
