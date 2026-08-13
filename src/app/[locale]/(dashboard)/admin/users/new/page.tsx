import { getTranslations, setRequestLocale } from "next-intl/server";
import { NewUserForm } from "./_components/new-user-form";

type AdminNewUserPageProps = {
  params: Promise<{ locale: string }>;
};

export default async function AdminNewUserPage(props: AdminNewUserPageProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "AdminUserNewPage" });

  return (
    <div className="flex flex-1 flex-col gap-4 p-8">
      <h1 className="text-2xl font-bold">{t("title")}</h1>
      <NewUserForm />
    </div>
  );
}
