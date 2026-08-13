import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

type AdminNewPageLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata(
  props: AdminNewPageLayoutProps,
): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "AdminPageNewPage" });

  return { title: t("meta_title") };
}

export default function AdminNewPageLayout(props: AdminNewPageLayoutProps) {
  return props.children;
}
