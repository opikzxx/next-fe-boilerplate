"use client";

import { Check } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/lib/i18n-navigation";
import { cn } from "@/lib/utils";
import { FlagBadge } from "./flag-badge";
import { languageOptions } from "./language-data";

function NavbarLanguageMenu(props: { isOpen: boolean; onClose: () => void }) {
  const t = useTranslations("Navbar");
  const locale = useLocale();
  const pathname = usePathname();

  return (
    <div
      aria-hidden={!props.isOpen}
      data-navbar-panel="language"
      className={cn(
        "absolute inset-x-0 top-full z-50 hidden px-4 transition-all duration-200 ease-out sm:px-6 md:block lg:px-8",
        props.isOpen
          ? "translate-y-0 opacity-100"
          : "pointer-events-none -translate-y-2 opacity-0",
      )}
    >
      <div className="mx-auto flex max-w-6xl justify-end">
        <div className="w-72 rounded-2xl border border-border bg-background p-2 shadow-xl">
          <p className="px-3 pb-2 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
            {t("language_menu_heading")}
          </p>
          {languageOptions.map((option) => (
            <Link
              key={option.locale}
              href={pathname}
              locale={option.locale}
              className={cn(
                "flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                option.locale === locale
                  ? "bg-muted text-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
              )}
              onClick={props.onClose}
            >
              <FlagBadge flag={option.flag} />
              {t(option.labelKey)}
              {option.locale === locale && (
                <Check className="ml-auto size-4 text-dnet-blue" />
              )}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export { NavbarLanguageMenu };
