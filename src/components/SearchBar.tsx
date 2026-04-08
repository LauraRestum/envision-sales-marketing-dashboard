"use client";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="relative">
      {/* Search icon */}
      <svg
        className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--color-text-muted)]"
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
          d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
        />
      </svg>

      <input
        type="search"
        placeholder="Search projects\u2026"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] py-2.5 pl-10 pr-4 text-sm text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] shadow-[var(--shadow-sm)] transition-[border-color,box-shadow] duration-[var(--duration-base)] focus:border-[var(--color-primary)] focus:shadow-[0_0_0_3px_rgba(37,99,235,0.12)] focus:outline-none"
      />

      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-0.5 text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)] transition-colors duration-[var(--duration-fast)] cursor-pointer"
          aria-label="Clear search"
        >
          <svg
            className="h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        </button>
      )}
    </div>
  );
}
