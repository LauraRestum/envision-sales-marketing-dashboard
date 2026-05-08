export type ProjectStatus = "Draft" | "In Progress" | "Ready" | "Published" | "Presented";

/**
 * Envision brand pillars (per brand book architecture).
 * https://brand-guidelines-nine.vercel.app
 */
export type Pillar =
  | "Employment"
  | "Outreach"
  | "Rehabilitation"
  | "Education"
  | "Research";

export interface Asset {
  label: string;
  description: string;
  url?: string;
  downloadUrl?: string;
  feedbackEnabled?: boolean;
  status?: string;
}

export interface ProjectAssets {
  sop: Asset;
  internalBrief: Asset;
  externalBrief: Asset;
  draftedHtml: Asset;
  publishedApplication: Asset;
}

export type AssetKey = keyof ProjectAssets;

export interface Project {
  id: string;
  projectName: string;
  description: string;
  owner: string;
  status: ProjectStatus;
  pillar?: Pillar;
  lastUpdated: string;
  assets: ProjectAssets;
  extras?: Asset[];
  assignee?: string;
  statusNote?: string | string[];
  statusNoteVariant?: "amber" | "blue" | "purple" | "green";
  updateNote?: string;
  extraNote?: string;
  archived?: boolean;
}
