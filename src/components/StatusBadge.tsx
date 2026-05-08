import type { ProjectStatus } from "@/types";

const variants: Record<ProjectStatus, string> = {
  Draft:
    "bg-stone-100 text-stone-700 ring-1 ring-inset ring-stone-200",
  "In Progress":
    "bg-amber-50 text-amber-800 ring-1 ring-inset ring-amber-200",
  Ready:
    "bg-emerald-50 text-emerald-800 ring-1 ring-inset ring-emerald-200",
  Published:
    "bg-blue-50 text-blue-800 ring-1 ring-inset ring-blue-200",
  Presented:
    "bg-rose-50 text-rose-800 ring-1 ring-inset ring-rose-200",
};

const dotColors: Record<ProjectStatus, string> = {
  Draft: "bg-stone-400",
  "In Progress": "bg-amber-500",
  Ready: "bg-emerald-500",
  Published: "bg-blue-500",
  Presented: "bg-rose-500",
};

export function StatusBadge({ status }: { status: ProjectStatus }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[0.7rem] font-semibold uppercase tracking-wider ${variants[status]}`}
    >
      <span className={`inline-block h-1.5 w-1.5 rounded-full ${dotColors[status]}`} />
      {status}
    </span>
  );
}
