"use client";

import { useTranslations } from "next-intl";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogoutButton } from "./logout-button";
import { SidebarNavList } from "./sidebar-nav-list";
import { getInitials } from "@/lib/utils";

function DesktopSidebar({
  name,
  image,
  isAdmin,
}: {
  name: string;
  image?: string | null;
  isAdmin: boolean;
}) {
  const t = useTranslations("DashboardNav");

  return (
    <aside className="bg-primary/5 sticky top-0 hidden h-svh w-64 shrink-0 flex-col gap-10 py-10 md:flex">
      <div className="flex flex-col items-center gap-3 px-4 text-center">
        <Avatar className="ring-primary/30 size-20 ring-4">
          <AvatarImage src={image ?? undefined} alt={name} />
          <AvatarFallback>{getInitials(name)}</AvatarFallback>
        </Avatar>
        <div>
          <p className="text-muted-foreground text-sm">{t("welcome_back")}</p>
          <p className="text-lg font-bold">{name}</p>
        </div>
      </div>

      <SidebarNavList isAdmin={isAdmin} />

      <LogoutButton className="mt-auto justify-center px-4" />
    </aside>
  );
}

export { DesktopSidebar };
