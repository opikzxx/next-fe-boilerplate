import type { MetadataRoute } from "next";
import { listPublishedPages } from "@/features/pages/api";
import { routing } from "@/lib/i18n-routing";
import { getBaseUrl, getI18nPath } from "@/utils/helpers";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = getBaseUrl();
  const pages = await listPublishedPages();

  const homeEntries = routing.locales.map((locale) => ({
    url: `${baseUrl}${getI18nPath("", locale)}`,
    lastModified: new Date(),
    alternates: {
      languages: Object.fromEntries(
        routing.locales
          .filter((otherLocale) => otherLocale !== locale)
          .map((otherLocale) => [
            otherLocale,
            `${baseUrl}${getI18nPath("", otherLocale)}`,
          ]),
      ),
    },
  }));

  const pageEntries = pages.map((page) => {
    const translations = pages.filter(
      (candidate) =>
        candidate.translationGroupId === page.translationGroupId &&
        candidate.locale !== page.locale,
    );

    return {
      url: `${baseUrl}${getI18nPath(`/${page.slug}`, page.locale)}`,
      lastModified: page.updatedAt,
      alternates: {
        languages: Object.fromEntries(
          translations.map((translation) => [
            translation.locale,
            `${baseUrl}${getI18nPath(`/${translation.slug}`, translation.locale)}`,
          ]),
        ),
      },
    };
  });

  return [...homeEntries, ...pageEntries];
}
