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
        downloadUrl: "/assets/phillips/Controlled_OEM_Gateway_Internal_Brief.docx",
      },
      externalBrief: {
        label: "External Brief",
        description: "Client-facing brief",
        url: "",
        downloadUrl: "/assets/phillips/Controlled_OEM_Gateway_Philips_External.docx",
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
        url: "https://phillips-oem-controlled-gateway.vercel.app",
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
        url: "https://aps-presentation.vercel.app",
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
        url: "/assets/under-armour/envision_ua_presentation-3.html",
        downloadUrl: "/assets/under-armour/envision_ua_presentation-3.html",
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
