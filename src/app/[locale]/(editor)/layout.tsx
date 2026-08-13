import { setRequestLocale } from "next-intl/server";
import { auth } from "@/auth";
import { redirect } from "@/lib/i18n-navigation";

type EditorLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function EditorLayout(props: EditorLayoutProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  const session = await auth();

  if (!session) {
    redirect({ href: "/sign-in", locale });
  }

  if (!session?.user.roles.includes("admin")) {
    redirect({ href: "/creator", locale });
  }

  return props.children;
}
