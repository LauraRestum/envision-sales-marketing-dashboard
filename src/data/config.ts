/**
 * App-wide configuration.
 *
 * Update `feedbackEmail` to change the recipient for all
 * "Give Feedback" mailto links across the dashboard.
 */
export const appConfig = {
  /** Recipient address for drafted-HTML feedback emails. */
  feedbackEmail: "feedback@envision.com",

  /** Dashboard display title. */
  title: "Sales Asset Hub",

  /** Short supporting description shown below the title. */
  description:
    "Find presentation materials, briefs, and working assets for every project — all in one place.",
} as const;
