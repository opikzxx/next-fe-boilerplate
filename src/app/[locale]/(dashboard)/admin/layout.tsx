import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { auth } from "@/auth";
import { redirect } from "@/lib/i18n-navigation";

type AdminLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata(
  props: AdminLayoutProps,
): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "AdminPage" });

  return {
    title: t("meta_title"),
  };
}

export default async function AdminLayout(props: AdminLayoutProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  const session = await auth();

  if (!session?.user.roles.includes("admin")) {
    redirect({ href: "/creator", locale });
  }

  return props.children;
}
