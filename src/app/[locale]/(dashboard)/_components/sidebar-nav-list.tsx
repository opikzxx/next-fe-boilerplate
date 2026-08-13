"use client";

import { useTranslations } from "next-intl";

import { Link, usePathname } from "@/lib/i18n-navigation";
import { cn } from "@/lib/utils";
import { getNavItems, isNavItemActive } from "./nav-items";

function SidebarNavList({
  onNavigate,
  isAdmin,
}: {
  onNavigate?: () => void;
  isAdmin: boolean;
}) {
  const t = useTranslations("DashboardNav");
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-1">
      {getNavItems(isAdmin).map((item) => {
        const isActive = isNavItemActive(pathname, item.href);

        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            aria-current={isActive ? "page" : undefined}
            className={cn(
              "relative flex items-center gap-3 py-3 pl-6 pr-4 text-sm font-medium transition-colors",
              isActive
                ? "bg-primary/10 font-semibold"
                : "hover:bg-muted hover:text-foreground",
            )}
          >
            {isActive && (
              <span className="bg-primary absolute inset-y-1 right-0 w-1 rounded-l-full" />
            )}
            <item.icon className="size-5" />
            {t(item.labelKey)}
          </Link>
        );
      })}
    </nav>
  );
}

export { SidebarNavList };
