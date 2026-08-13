import { FileText, Plus } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Button } from "@/components/ui/button";
import { listPages } from "@/features/pages/api";
import { Link } from "@/lib/i18n-navigation";
import { PagesGrid } from "./_components/pages-grid";

type AdminPagesIndexPageProps = {
  params: Promise<{ locale: string }>;
};

export default async function AdminPagesIndexPage(
  props: AdminPagesIndexPageProps,
) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "AdminPagesPage" });
  const pages = await listPages();

  return (
    <div className="flex flex-1 flex-col gap-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <FileText className="size-5" />
          </span>
          <div>
            <h1 className="text-2xl font-bold">{t("title")}</h1>
            <p className="text-sm text-muted-foreground">{t("description")}</p>
          </div>
        </div>

        <Button asChild className="w-full sm:w-auto">
          <Link href="/admin/pages/new">
            <Plus />
            {t("new_page")}
          </Link>
        </Button>
      </div>

      <PagesGrid pages={pages} />
    </div>
  );
}
