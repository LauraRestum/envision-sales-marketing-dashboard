export type ProjectStatus = "Draft" | "In Progress" | "Ready" | "Published";

export interface Asset {
  label: string;
  description: string;
  url?: string;
  downloadUrl?: string;
  feedbackEnabled?: boolean;
  status?: string;
}

export interface ProjectAssets {
  publishedApplication: Asset;
  additionalAssets?: Asset[];
}

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
  statusNoteVariant?: "amber" | "blue" | "purple";
  updateNote?: string;
  archived?: boolean;
}
