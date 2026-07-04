import type { LocalePrefixMode } from "next-intl/routing";

/** Locale prefix strategy for next-intl routing. */
const localePrefix: LocalePrefixMode = "as-needed";

/** Centralized application configuration */
export const AppConfig = {
  name: "Nextjs Starter",
  i18n: {
    locales: ["id", "en"],
    defaultLocale: "id",
    localePrefix,
  },
};
