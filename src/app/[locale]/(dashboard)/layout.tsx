import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { auth } from "@/auth";
import { redirect } from "@/lib/i18n-navigation";
import { DashboardShell } from "./_components/dashboard-shell";

type DashboardLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata(
  props: DashboardLayoutProps,
): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "DashboardPage" });

  return {
    title: t("meta_title"),
  };
}

export default async function DashboardLayout(props: DashboardLayoutProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  const session = await auth();

  if (!session) {
    redirect({ href: "/sign-in", locale });
  }

  return (
    <DashboardShell
      name={session?.user.name ?? ""}
      image={session?.user.image}
    >
      {props.children}
    </DashboardShell>
  );
}
