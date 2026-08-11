"use client";

import { Check, ChevronLeft, ChevronRight, Globe } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link, usePathname } from "@/lib/i18n-navigation";
import { FlagBadge } from "./flag-badge";
import { getLanguageOption, languageOptions } from "./language-data";
import { serviceCategories } from "./navbar-data";
import { NavbarServiceItemLink } from "./navbar-service-item-link";

function DrillBackButton(props: { label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      className="mb-2 inline-flex items-center gap-1 px-3 py-2 text-xs font-semibold tracking-wide text-muted-foreground uppercase"
      onClick={props.onClick}
    >
      <ChevronLeft className="size-4" />
      {props.label}
    </button>
  );
}

type DrillState =
  | { view: "root" }
  | { view: "services" }
  | { view: "category"; categoryId: string }
  | { view: "language" };

function NavbarMobileMenu(props: { onClose: () => void }) {
  const t = useTranslations("Navbar");
  const locale = useLocale();
  const pathname = usePathname();
  const [drill, setDrill] = useState<DrillState>({ view: "root" });

  const activeCategory =
    drill.view === "category"
      ? serviceCategories.find((category) => category.id === drill.categoryId)
      : undefined;

  const currentLanguage = getLanguageOption(locale);

  return (
    <>
      {drill.view === "root" && (
        <div className="flex h-full flex-col">
          <div className="flex flex-col gap-1">
            <Link
              href="/"
              className="rounded-lg px-3 py-3 text-base font-medium text-foreground hover:bg-muted"
              onClick={props.onClose}
            >
              {t("home")}
            </Link>
            <button
              type="button"
              className="flex items-center justify-between rounded-lg px-3 py-3 text-left text-base font-medium text-foreground hover:bg-muted"
              onClick={() => setDrill({ view: "services" })}
            >
              {t("services")}
              <ChevronRight className="size-4" />
            </button>
            <Link
              href="/blog"
              className="rounded-lg px-3 py-3 text-base font-medium text-foreground hover:bg-muted"
              onClick={props.onClose}
            >
              {t("blog")}
            </Link>
            <Link
              href="/contact"
              className="rounded-lg px-3 py-3 text-base font-medium text-foreground hover:bg-muted"
              onClick={props.onClose}
            >
              {t("contact_us")}
            </Link>

            <Button
              className="mt-3 w-full rounded-full bg-dnet-blue text-dnet-blue-foreground hover:bg-dnet-blue/90"
              onClick={props.onClose}
            >
              {t("ask_ai")}
            </Button>
          </div>

          <Button
            variant="ghost"
            type="button"
            className="mt-auto flex items-center justify-between rounded-lg px-3 pt-5 pb-3 text-left text-base font-medium text-foreground hover:bg-muted"
            onClick={() => setDrill({ view: "language" })}
          >
            <span className="flex items-center gap-2.5">
              <Globe className="size-4 text-dnet-blue" />
              {t("language_menu_heading")}
            </span>
            <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <FlagBadge flag={currentLanguage?.flag ?? ""} className="size-5" />
              {locale.toUpperCase()}
              <ChevronRight className="size-4" />
            </span>
          </Button>
        </div>
      )}

      {drill.view === "services" && (
        <div className="flex flex-col gap-1">
          <DrillBackButton
            label={t("back")}
            onClick={() => setDrill({ view: "root" })}
          />
          {serviceCategories.map((category) => (
            <button
              key={category.id}
              type="button"
              className="flex items-center justify-between rounded-lg px-3 py-3 text-left text-base font-medium text-foreground hover:bg-muted"
              onClick={() =>
                setDrill({ view: "category", categoryId: category.id })
              }
            >
              <span className="flex items-center gap-2.5">
                <category.icon className="size-4 text-dnet-blue" />
                {t(category.labelKey)}
              </span>
              <ChevronRight className="size-4" />
            </button>
          ))}
        </div>
      )}

      {drill.view === "category" && activeCategory && (
        <div className="flex flex-col gap-1">
          <DrillBackButton
            label={t(activeCategory.labelKey)}
            onClick={() => setDrill({ view: "services" })}
          />
          {activeCategory.items.map((item) => (
            <NavbarServiceItemLink
              key={item.titleKey}
              item={item}
              onClick={props.onClose}
            />
          ))}
        </div>
      )}

      {drill.view === "language" && (
        <div className="flex flex-col gap-1">
          <h2 className="px-3 pb-3 text-xl font-bold text-foreground">
            {t("language_page_title")}
          </h2>

          {languageOptions.map((option) => (
            <Link
              key={option.locale}
              href={pathname}
              locale={option.locale}
              className="flex items-center gap-3 rounded-lg px-3 py-3 hover:bg-muted"
              onClick={props.onClose}
            >
              <FlagBadge flag={option.flag} className="size-7" />
              <span className="text-base font-medium text-foreground">
                {t(option.labelKey)}
              </span>
              {option.locale === locale && (
                <Check className="ml-auto size-4 text-dnet-blue" />
              )}
            </Link>
          ))}
        </div>
      )}
    </>
  );
}

export { NavbarMobileMenu };
