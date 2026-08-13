import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

type AdminNewUserLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata(
  props: AdminNewUserLayoutProps,
): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "AdminUserNewPage" });

  return { title: t("meta_title") };
}

export default function AdminNewUserLayout(props: AdminNewUserLayoutProps) {
  return props.children;
}
