"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { Link } from "@/lib/i18n-navigation";
import { cn } from "@/lib/utils";
import { serviceCategories } from "./navbar-data";
import { NavbarServiceItemLink } from "./navbar-service-item-link";

function NavbarMegaMenu(props: { isOpen: boolean; onClose: () => void }) {
  const t = useTranslations("Navbar");
  const [activeCategoryId, setActiveCategoryId] = useState(
    serviceCategories[0].id,
  );

  const activeCategory =
    serviceCategories.find((category) => category.id === activeCategoryId) ??
    serviceCategories[0];

  return (
    <div
      aria-hidden={!props.isOpen}
      data-navbar-panel="services"
      className={cn(
        "absolute inset-x-0 top-full z-50 hidden px-4 transition-all duration-200 ease-out sm:px-6 md:block lg:px-8",
        props.isOpen
          ? "translate-y-0 opacity-100"
          : "pointer-events-none -translate-y-2 opacity-0",
      )}
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-[180px_1fr] gap-6 rounded-2xl border border-border bg-background p-6 shadow-xl lg:grid-cols-[220px_1fr_260px] lg:gap-8">
          <div className="flex flex-col gap-1">
            <p className="px-3 pb-2 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
              {t("services_menu_heading")}
            </p>
            {serviceCategories.map((category) => (
              <button
                key={category.id}
                type="button"
                className={cn(
                  "flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-left text-sm font-medium transition-colors",
                  category.id === activeCategoryId
                    ? "bg-muted text-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                )}
                onClick={() => setActiveCategoryId(category.id)}
              >
                <category.icon className="size-4 shrink-0" />
                {t(category.labelKey)}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-x-6 gap-y-1 border-border md:border-l md:pl-6">
            {activeCategory.items.map((item) => (
              <NavbarServiceItemLink
                key={item.titleKey}
                item={item}
                onClick={props.onClose}
              />
            ))}
          </div>

          <div className="hidden flex-col justify-between rounded-xl bg-dnet-blue p-5 text-dnet-blue-foreground lg:flex">
            <div>
              <p className="text-xs font-semibold tracking-wide uppercase opacity-80">
                {t("mega_promo_label")}
              </p>
              <p className="mt-2 text-lg font-bold leading-tight">
                {t("mega_promo_title")}
              </p>
              <p className="mt-2 text-sm opacity-90">
                {t("mega_promo_description")}
              </p>
            </div>
            <Link
              href="/contact"
              className="mt-4 inline-flex items-center justify-center rounded-full bg-background px-4 py-2 text-sm font-semibold text-foreground transition-colors duration-150 hover:bg-background/90"
              onClick={props.onClose}
            >
              {t("mega_promo_cta")}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export { NavbarMegaMenu };
