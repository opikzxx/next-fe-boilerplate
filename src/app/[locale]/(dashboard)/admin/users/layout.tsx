import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

type AdminUsersLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata(
  props: AdminUsersLayoutProps,
): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "AdminUsersPage" });

  return { title: t("meta_title") };
}

export default function AdminUsersLayout(props: AdminUsersLayoutProps) {
  return props.children;
}
