import type { Project } from "@/types";

/**
 * Central data source for all projects.
 *
 * To add a new project, copy an existing entry, change the `id`
 * (must be unique), and fill in the fields. Assets with empty
 * `url` and `downloadUrl` will render as "Not yet added".
 */
export const projects: Project[] = [
  {
    id: "project-alpha",
    projectName: "Project Alpha",
    description:
      "Presentation materials and working assets for the Alpha launch campaign.",
    owner: "Sarah Mitchell",
    status: "Published",
    lastUpdated: "2026-04-06",
    assets: {
      sop: {
        label: "SOP",
        description: "Standard operating procedure",
        url: "https://docs.example.com/alpha/sop",
        downloadUrl: "https://files.example.com/alpha/sop.pdf",
      },
      internalBrief: {
        label: "Internal Brief",
        description: "Internal strategy and context brief",
        url: "https://docs.example.com/alpha/internal-brief",
        downloadUrl: "https://files.example.com/alpha/internal-brief.pdf",
      },
      externalBrief: {
        label: "External Brief",
        description: "Client-facing brief",
        url: "https://docs.example.com/alpha/external-brief",
        downloadUrl: "",
      },
      draftedHtml: {
        label: "Drafted HTML",
        description: "Draft HTML presentation",
        url: "https://preview.example.com/alpha",
        downloadUrl: "",
        feedbackEnabled: true,
      },
      publishedApplication: {
        label: "Published Application",
        description: "Published live experience",
        url: "https://app.example.com/alpha",
        downloadUrl: "",
      },
    },
  },
  {
    id: "project-beta",
    projectName: "Project Beta",
    description:
      "Regional expansion pitch deck and supporting sales collateral.",
    owner: "James Chen",
    status: "Ready",
    lastUpdated: "2026-04-04",
    assets: {
      sop: {
        label: "SOP",
        description: "Standard operating procedure",
        url: "https://docs.example.com/beta/sop",
        downloadUrl: "https://files.example.com/beta/sop.pdf",
      },
      internalBrief: {
        label: "Internal Brief",
        description: "Internal strategy and context brief",
        url: "https://docs.example.com/beta/internal-brief",
        downloadUrl: "https://files.example.com/beta/internal-brief.pdf",
      },
      externalBrief: {
        label: "External Brief",
        description: "Client-facing brief",
        url: "",
        downloadUrl: "",
      },
      draftedHtml: {
        label: "Drafted HTML",
        description: "Draft HTML presentation",
        url: "https://preview.example.com/beta",
        downloadUrl: "https://files.example.com/beta/draft.zip",
        feedbackEnabled: true,
      },
      publishedApplication: {
        label: "Published Application",
        description: "Published live experience",
        url: "",
        downloadUrl: "",
      },
    },
  },
  {
    id: "project-gamma",
    projectName: "Project Gamma",
    description:
      "Enterprise client onboarding walkthrough and product demo assets.",
    owner: "Priya Sharma",
    status: "In Progress",
    lastUpdated: "2026-04-08",
    assets: {
      sop: {
        label: "SOP",
        description: "Standard operating procedure",
        url: "",
        downloadUrl: "",
      },
      internalBrief: {
        label: "Internal Brief",
        description: "Internal strategy and context brief",
        url: "https://docs.example.com/gamma/internal-brief",
        downloadUrl: "",
      },
      externalBrief: {
        label: "External Brief",
        description: "Client-facing brief",
        url: "",
        downloadUrl: "",
      },
      draftedHtml: {
        label: "Drafted HTML",
        description: "Draft HTML presentation",
        url: "",
        downloadUrl: "",
        feedbackEnabled: true,
      },
      publishedApplication: {
        label: "Published Application",
        description: "Published live experience",
        url: "",
        downloadUrl: "",
      },
    },
  },
  {
    id: "project-delta",
    projectName: "Project Delta",
    description:
      "Q3 partner summit materials including keynote and breakout session content.",
    owner: "Marcus Lee",
    status: "Draft",
    lastUpdated: "2026-03-28",
    assets: {
      sop: {
        label: "SOP",
        description: "Standard operating procedure",
        url: "",
        downloadUrl: "https://files.example.com/delta/sop.pdf",
      },
      internalBrief: {
        label: "Internal Brief",
        description: "Internal strategy and context brief",
        url: "",
        downloadUrl: "",
      },
      externalBrief: {
        label: "External Brief",
        description: "Client-facing brief",
        url: "",
        downloadUrl: "",
      },
      draftedHtml: {
        label: "Drafted HTML",
        description: "Draft HTML presentation",
        url: "",
        downloadUrl: "",
        feedbackEnabled: true,
      },
      publishedApplication: {
        label: "Published Application",
        description: "Published live experience",
        url: "",
        downloadUrl: "",
      },
    },
  },
  {
    id: "project-epsilon",
    projectName: "Project Epsilon",
    description:
      "End-of-year showcase reel and interactive highlights for stakeholders.",
    owner: "Sarah Mitchell",
    status: "Published",
    lastUpdated: "2026-03-15",
    assets: {
      sop: {
        label: "SOP",
        description: "Standard operating procedure",
        url: "https://docs.example.com/epsilon/sop",
        downloadUrl: "https://files.example.com/epsilon/sop.pdf",
      },
      internalBrief: {
        label: "Internal Brief",
        description: "Internal strategy and context brief",
        url: "https://docs.example.com/epsilon/internal-brief",
        downloadUrl: "https://files.example.com/epsilon/internal-brief.pdf",
      },
      externalBrief: {
        label: "External Brief",
        description: "Client-facing brief",
        url: "https://docs.example.com/epsilon/external-brief",
        downloadUrl: "https://files.example.com/epsilon/external-brief.pdf",
      },
      draftedHtml: {
        label: "Drafted HTML",
        description: "Draft HTML presentation",
        url: "https://preview.example.com/epsilon",
        downloadUrl: "https://files.example.com/epsilon/draft.zip",
        feedbackEnabled: true,
      },
      publishedApplication: {
        label: "Published Application",
        description: "Published live experience",
        url: "https://app.example.com/epsilon",
        downloadUrl: "",
      },
    },
  },
  {
    id: "project-zeta",
    projectName: "Project Zeta",
    description:
      "New vertical market pitch — healthcare segment positioning and demo flow.",
    owner: "James Chen",
    status: "In Progress",
    lastUpdated: "2026-04-07",
    assets: {
      sop: {
        label: "SOP",
        description: "Standard operating procedure",
        url: "https://docs.example.com/zeta/sop",
        downloadUrl: "",
      },
      internalBrief: {
        label: "Internal Brief",
        description: "Internal strategy and context brief",
        url: "https://docs.example.com/zeta/internal-brief",
        downloadUrl: "https://files.example.com/zeta/internal-brief.pdf",
      },
      externalBrief: {
        label: "External Brief",
        description: "Client-facing brief",
        url: "",
        downloadUrl: "",
      },
      draftedHtml: {
        label: "Drafted HTML",
        description: "Draft HTML presentation",
        url: "https://preview.example.com/zeta",
        downloadUrl: "",
        feedbackEnabled: true,
      },
      publishedApplication: {
        label: "Published Application",
        description: "Published live experience",
        url: "",
        downloadUrl: "",
      },
    },
  },
  {
    id: "phillips",
    projectName: "Phillips",
    description: "Presentation materials and working assets for the Phillips project.",
    owner: "Sales Team",
    status: "Draft",
    lastUpdated: "2026-04-08",
    assets: {
      sop: {
        label: "SOP",
        description: "Standard operating procedure",
        url: "",
        downloadUrl: "",
      },
      internalBrief: {
        label: "Internal Brief",
        description: "Internal strategy and context brief",
        url: "",
        downloadUrl: "",
      },
      externalBrief: {
        label: "External Brief",
        description: "Client-facing brief",
        url: "",
        downloadUrl: "",
      },
      draftedHtml: {
        label: "Drafted HTML",
        description: "Draft HTML presentation",
        url: "",
        downloadUrl: "",
        feedbackEnabled: true,
      },
      publishedApplication: {
        label: "Published Application",
        description: "Published live experience",
        url: "",
        downloadUrl: "",
      },
    },
  },
  {
    id: "aps",
    projectName: "APS",
    description: "Presentation materials and working assets for the APS project.",
    owner: "Sales Team",
    status: "Draft",
    lastUpdated: "2026-04-08",
    assets: {
      sop: {
        label: "SOP",
        description: "Standard operating procedure",
        url: "",
        downloadUrl: "",
      },
      internalBrief: {
        label: "Internal Brief",
        description: "Internal strategy and context brief",
        url: "",
        downloadUrl: "",
      },
      externalBrief: {
        label: "External Brief",
        description: "Client-facing brief",
        url: "",
        downloadUrl: "",
      },
      draftedHtml: {
        label: "Drafted HTML",
        description: "Draft HTML presentation",
        url: "",
        downloadUrl: "",
        feedbackEnabled: true,
      },
      publishedApplication: {
        label: "Published Application",
        description: "Published live experience",
        url: "",
        downloadUrl: "",
      },
    },
  },
  {
    id: "under-armour",
    projectName: "Under Armour",
    description: "Presentation materials and working assets for the Under Armour project.",
    owner: "Sales Team",
    status: "Draft",
    lastUpdated: "2026-04-08",
    assets: {
      sop: {
        label: "SOP",
        description: "Standard operating procedure",
        url: "",
        downloadUrl: "",
      },
      internalBrief: {
        label: "Internal Brief",
        description: "Internal strategy and context brief",
        url: "",
        downloadUrl: "",
      },
      externalBrief: {
        label: "External Brief",
        description: "Client-facing brief",
        url: "",
        downloadUrl: "",
      },
      draftedHtml: {
        label: "Drafted HTML",
        description: "Draft HTML presentation",
        url: "",
        downloadUrl: "",
        feedbackEnabled: true,
      },
      publishedApplication: {
        label: "Published Application",
        description: "Published live experience",
        url: "",
        downloadUrl: "",
      },
    },
  },
  {
    id: "streamlight",
    projectName: "Streamlight",
    description: "Presentation materials and working assets for the Streamlight project.",
    owner: "Sales Team",
    status: "Draft",
    lastUpdated: "2026-04-08",
    assets: {
      sop: {
        label: "SOP",
        description: "Standard operating procedure",
        url: "",
        downloadUrl: "",
      },
      internalBrief: {
        label: "Internal Brief",
        description: "Internal strategy and context brief",
        url: "",
        downloadUrl: "",
      },
      externalBrief: {
        label: "External Brief",
        description: "Client-facing brief",
        url: "",
        downloadUrl: "",
      },
      draftedHtml: {
        label: "Drafted HTML",
        description: "Draft HTML presentation",
        url: "",
        downloadUrl: "",
        feedbackEnabled: true,
      },
      publishedApplication: {
        label: "Published Application",
        description: "Published live experience",
        url: "",
        downloadUrl: "",
      },
    },
  },
];
