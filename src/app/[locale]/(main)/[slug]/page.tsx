import { Render } from "@measured/puck/rsc";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import {
  getPageTranslations,
  getPublishedPageBySlug,
  listPublishedPages,
} from "@/features/pages/api";
import type { PuckData } from "@/features/pages/puck-config";
import { puckConfig } from "@/features/pages/puck-config";
import { getBaseUrl, getI18nPath } from "@/utils/helpers";

type SlugPageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateStaticParams() {
  const pages = await listPublishedPages();

  return pages.map((page) => ({ locale: page.locale, slug: page.slug }));
}

export async function generateMetadata(
  props: SlugPageProps,
): Promise<Metadata> {
  const { locale, slug } = await props.params;
  const page = await getPublishedPageBySlug(slug, locale);

  if (!page) {
    notFound();
  }

  const translations = await getPageTranslations(page.translationGroupId);
  const baseUrl = getBaseUrl();
  const canonicalPath = getI18nPath(`/${page.slug}`, locale);

  return {
    title: page.metaTitle,
    description: page.metaDescription,
    alternates: {
      canonical: `${baseUrl}${canonicalPath}`,
      languages: Object.fromEntries(
        translations.map((translation) => [
          translation.locale,
          `${baseUrl}${getI18nPath(`/${translation.slug}`, translation.locale)}`,
        ]),
      ),
    },
    openGraph: {
      title: page.metaTitle,
      description: page.metaDescription,
      images: page.ogImage ? [page.ogImage] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: page.metaTitle,
      description: page.metaDescription,
      images: page.ogImage ? [page.ogImage] : undefined,
    },
  };
}

export default async function SlugPage(props: SlugPageProps) {
  const { locale, slug } = await props.params;
  setRequestLocale(locale);

  const page = await getPublishedPageBySlug(slug, locale);

  if (!page) {
    notFound();
  }

  return (
    // The Puck data shape isn't statically known here — it's read back from the DB's untyped Json column.
    <Render config={puckConfig} data={page.puckData as PuckData} />
  );
}
