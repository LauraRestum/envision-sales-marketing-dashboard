import type { Pillar } from "@/types";

const pillarStyles: Record<
  Pillar,
  { bg: string; text: string; ring: string; dot: string }
> = {
  Employment: {
    bg: "rgba(0, 48, 135, 0.08)",
    text: "var(--brand-blue)",
    ring: "rgba(0, 48, 135, 0.28)",
    dot: "var(--brand-blue)",
  },
  Outreach: {
    bg: "rgba(255, 184, 28, 0.16)",
    text: "#7a4a00",
    ring: "rgba(255, 184, 28, 0.55)",
    dot: "var(--brand-goldenrod)",
  },
  Rehabilitation: {
    bg: "rgba(65, 182, 230, 0.14)",
    text: "var(--brand-navy)",
    ring: "rgba(65, 182, 230, 0.55)",
    dot: "var(--brand-bright-blue)",
  },
  Education: {
    bg: "rgba(140, 71, 153, 0.10)",
    text: "var(--brand-violet)",
    ring: "rgba(140, 71, 153, 0.35)",
    dot: "var(--brand-violet)",
  },
  Research: {
    bg: "rgba(120, 190, 33, 0.14)",
    text: "var(--brand-forest)",
    ring: "rgba(120, 190, 33, 0.45)",
    dot: "var(--brand-green)",
  },
};

export function PillarChip({ pillar }: { pillar: Pillar }) {
  const s = pillarStyles[pillar];
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[0.65rem] font-bold uppercase tracking-[0.16em]"
      style={{
        background: s.bg,
        color: s.text,
        boxShadow: `inset 0 0 0 1px ${s.ring}`,
      }}
    >
      <span
        className="inline-block h-1.5 w-1.5 rounded-full"
        style={{ background: s.dot }}
        aria-hidden="true"
      />
      <span className="sr-only">Pillar: </span>
      {pillar}
    </span>
  );
}
