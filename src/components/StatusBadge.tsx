import type { ProjectStatus } from "@/types";

const variants: Record<ProjectStatus, string> = {
  Draft:
    "bg-slate-100 text-slate-600",
  "In Progress":
    "bg-amber-50 text-amber-700",
  Ready:
    "bg-emerald-50 text-emerald-700",
  Published:
    "bg-blue-50 text-blue-700",
};

export function StatusBadge({ status }: { status: ProjectStatus }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold tracking-wide ${variants[status]}`}
    >
      {status}
    </span>
  );
}
