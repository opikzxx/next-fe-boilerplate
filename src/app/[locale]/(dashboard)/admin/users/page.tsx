import { getTranslations, setRequestLocale } from "next-intl/server";
import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import { listUsers } from "@/features/users/api";
import { Link } from "@/lib/i18n-navigation";
import { UsersTable } from "./_components/users-table";

type AdminUsersIndexPageProps = {
  params: Promise<{ locale: string }>;
};

export default async function AdminUsersIndexPage(
  props: AdminUsersIndexPageProps,
) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "AdminUsersPage" });
  const [users, session] = await Promise.all([listUsers(), auth()]);

  return (
    <div className="flex flex-1 flex-col gap-4 p-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">{t("title")}</h1>
        <Button asChild>
          <Link href="/admin/users/new">{t("new_user")}</Link>
        </Button>
      </div>

      <UsersTable users={users} currentUserId={session?.user.id ?? ""} />
    </div>
  );
}
