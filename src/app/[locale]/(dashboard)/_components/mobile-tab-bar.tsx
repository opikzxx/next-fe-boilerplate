"use client";

import { useTranslations } from "next-intl";

import { Link, usePathname } from "@/lib/i18n-navigation";
import { cn } from "@/lib/utils";
import { navItems } from "./nav-items";

function MobileTabBar() {
  const t = useTranslations("DashboardNav");
  const pathname = usePathname();

  return (
    <nav className="bg-white fixed inset-x-0 bottom-0 z-40 flex items-center justify-between px-2 py-2 md:hidden">
      {navItems.map((item) => {
        const isActive =
          item.href === "/dashboard"
            ? pathname === item.href
            : pathname.startsWith(item.href);

        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={isActive ? "page" : undefined}
            aria-label={t(`${item.labelKey}_short`)}
            className={cn(
              "relative flex flex-1 items-center justify-center py-3 transition-colors",
              isActive
                ? "text-primary"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            <item.icon className="size-6" />
            {isActive && (
              <span className="bg-primary absolute bottom-1 size-1 rounded-full" />
            )}
          </Link>
        );
      })}
    </nav>
  );
}

export { MobileTabBar };
