import { getTranslations, setRequestLocale } from "next-intl/server";

type AdminPageProps = {
  params: Promise<{ locale: string }>;
};

export default async function AdminPage(props: AdminPageProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "AdminPage" });

  return (
    <div className="flex flex-1 flex-col gap-4 p-8">
      <h1 className="text-2xl font-bold">{t("title")}</h1>
    </div>
  );
}
