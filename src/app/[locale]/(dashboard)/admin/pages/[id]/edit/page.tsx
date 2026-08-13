import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { getPage } from "@/features/pages/api";
import { PageEditor } from "./_components/page-editor";

type AdminPageEditorPageProps = {
  params: Promise<{ locale: string; id: string }>;
};

export default async function AdminPageEditorPage(
  props: AdminPageEditorPageProps,
) {
  const { locale, id } = await props.params;
  setRequestLocale(locale);

  const page = await getPage(id);

  if (!page) {
    notFound();
  }

  return <PageEditor page={page} />;
}
