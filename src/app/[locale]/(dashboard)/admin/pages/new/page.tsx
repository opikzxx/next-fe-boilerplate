import { getTranslations, setRequestLocale } from "next-intl/server";
import { NewPageForm } from "./_components/new-page-form";

type AdminNewPagePageProps = {
  params: Promise<{ locale: string }>;
};

export default async function AdminNewPagePage(props: AdminNewPagePageProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "AdminPageNewPage" });

  return (
    <div className="flex flex-1 flex-col gap-4 p-8">
      <h1 className="text-2xl font-bold">{t("title")}</h1>
      <NewPageForm />
    </div>
  );
}
