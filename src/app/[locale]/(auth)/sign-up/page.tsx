import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { AuthLayout } from "@/app/[locale]/(auth)/_components/auth-layout";
import { SignUpForm } from "@/app/[locale]/(auth)/_components/sign-up-form";

type SignUpPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata(
  props: SignUpPageProps,
): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "SignUpPage" });

  return {
    title: t("meta_title"),
  };
}

export default async function SignUpPage(props: SignUpPageProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  return (
    <AuthLayout>
      <SignUpForm />
    </AuthLayout>
  );
}
