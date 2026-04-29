import type { Project } from "@/types";

/**
 * Central data source for all projects.
 *
 * To add a new project, copy an existing entry, change the `id`
 * (must be unique), and fill in the fields. Each project has a
 * Published Application (live link) and an optional list of
 * additional assets.
 */
export const projects: Project[] = [
  {
    id: "phillips",
    projectName: "Phillips",
    description: "Presentation materials and working assets for the Phillips project.",
    owner: "Sales Team",
    status: "Draft",
    lastUpdated: "2026-04-08",
    assignee: "Dedra",
    statusNote: "Edits actively in progress",
    statusNoteVariant: "purple",
    assets: {
      publishedApplication: {
        label: "Published Application",
        description: "Published live experience",
        url: "https://phillips-oem-controlled-gateway.vercel.app",
        downloadUrl: "",
      },
      additionalAssets: [
        {
          label: "Internal Brief",
          description: "Internal strategy and context brief",
          url: "",
          downloadUrl: "/assets/phillips/Controlled_OEM_Gateway_Internal_Brief.docx",
        },
        {
          label: "External Brief",
          description: "Client-facing brief",
          url: "",
          downloadUrl: "/assets/phillips/Controlled_OEM_Gateway_Philips_External.docx",
        },
      ],
    },
  },
  {
    id: "streamlight",
    projectName: "Streamlight",
    description: "Presentation materials and working assets for the Streamlight project.",
    owner: "Sales Team",
    status: "In Progress",
    lastUpdated: "2026-04-10",
    assignee: "Kathy",
    archived: true,
    statusNote: "Awaiting additional review — awaiting names for the ending slide",
    statusNoteVariant: "blue",
    assets: {
      publishedApplication: {
        label: "Published Application",
        description: "Published live experience",
        url: "https://streamlight.vercel.app",
        downloadUrl: "",
      },
    },
  },
  {
    id: "aps",
    projectName: "APS",
    description: "Presentation materials and working assets for the APS project.",
    owner: "Sales Team",
    status: "Published",
    lastUpdated: "2026-04-08",
    assignee: "Rob",
    archived: true,
    statusNote: "Awaiting additional feedback",
    statusNoteVariant: "blue",
    assets: {
      publishedApplication: {
        label: "Published Application",
        description: "Published live experience",
        url: "https://aps-presentation.vercel.app",
        downloadUrl: "",
      },
    },
  },
  {
    id: "lange-presentation",
    projectName: "Lange — Presentation",
    description: "Presentation materials and working assets for the Lange presentation.",
    owner: "Sales Team",
    status: "Published",
    lastUpdated: "2026-04-22",
    assignee: "Sebastian",
    statusNote: "In production",
    statusNoteVariant: "blue",
    updateNote: "Updated as of 6:32am Wednesday",
    assets: {
      publishedApplication: {
        label: "Published Application",
        description: "Published live experience",
        url: "https://niar-lange.vercel.app",
        downloadUrl: "",
      },
    },
  },
  {
    id: "lange-one-on-one",
    projectName: "Lange — One-on-One Meeting",
    description: "Materials and working assets for the Lange one-on-one meeting.",
    owner: "Sales Team",
    status: "Published",
    lastUpdated: "2026-04-22",
    assignee: "Sebastian",
    statusNote: "In production",
    statusNoteVariant: "blue",
    updateNote: "Updated as of 6:32am Wednesday",
    assets: {
      publishedApplication: {
        label: "Published Application",
        description: "Published live experience",
        url: "https://lange-envision.vercel.app",
        downloadUrl: "",
      },
    },
  },
  {
    id: "under-armour",
    projectName: "Under Armour",
    description: "Presentation materials and working assets for the Under Armour project.",
    owner: "Sales Team",
    status: "Ready",
    lastUpdated: "2026-04-09",
    assignee: "Sebastian",
    archived: true,
    assets: {
      publishedApplication: {
        label: "Published Application",
        description: "Published live experience",
        url: "https://under-armour-textiles.vercel.app",
        downloadUrl: "",
      },
    },
  },
  {
    id: "genesis-health-club",
    projectName: "Genesis Health Club",
    description: "Presentation materials and working assets for the Genesis Health Club project.",
    owner: "Sales Team",
    status: "Draft",
    lastUpdated: "2026-04-29",
    assignee: "Rob",
    assets: {
      publishedApplication: {
        label: "Published Application",
        description: "Published live experience",
        url: "",
        downloadUrl: "",
      },
    },
  },
  {
    id: "h2f",
    projectName: "H2F",
    description: "Presentation materials and working assets for the H2F project.",
    owner: "Sales Team",
    status: "Draft",
    lastUpdated: "2026-04-29",
    assignee: "Kathy",
    assets: {
      publishedApplication: {
        label: "Published Application",
        description: "Published live experience",
        url: "",
        downloadUrl: "",
      },
    },
  },
  {
    id: "steris",
    projectName: "Steris",
    description: "Presentation materials and working assets for the Steris project.",
    owner: "Sales Team",
    status: "Draft",
    lastUpdated: "2026-04-29",
    assignee: "Dedra",
    assets: {
      publishedApplication: {
        label: "Published Application",
        description: "Published live experience",
        url: "",
        downloadUrl: "",
      },
    },
  },
];
