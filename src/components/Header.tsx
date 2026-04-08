import { appConfig } from "@/data/config";

export function Header() {
  return (
    <header className="border-b border-[var(--color-border)] bg-[var(--color-surface)]">
      <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold tracking-tight text-[var(--color-text)] sm:text-3xl">
          {appConfig.title}
        </h1>
        <p className="mt-1.5 text-sm text-[var(--color-text-secondary)] sm:text-base">
          {appConfig.description}
        </p>
      </div>
    </header>
  );
}
