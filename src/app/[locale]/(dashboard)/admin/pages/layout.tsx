import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

type AdminPagesLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata(
  props: AdminPagesLayoutProps,
): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "AdminPagesPage" });

  return { title: t("meta_title") };
}

export default function AdminPagesLayout(props: AdminPagesLayoutProps) {
  return props.children;
}
