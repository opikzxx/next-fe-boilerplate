import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { AuthLayout } from "@/app/[locale]/(auth)/_components/auth-layout";
import { SignInForm } from "@/app/[locale]/(auth)/_components/sign-in-form";

type SignInPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata(
  props: SignInPageProps,
): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "SignInPage" });

  return {
    title: t("meta_title"),
  };
}

export default async function SignInPage(props: SignInPageProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  return (
    <AuthLayout>
      <SignInForm />
    </AuthLayout>
  );
}
