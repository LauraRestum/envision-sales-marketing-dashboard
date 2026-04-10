export type ProjectStatus = "Draft" | "In Progress" | "Ready" | "Published" | "Archived";

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
  lastUpdated: string;
  assets: ProjectAssets;
  assignee?: string;
  statusNote?: string;
}
