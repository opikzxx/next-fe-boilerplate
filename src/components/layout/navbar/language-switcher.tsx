"use client";

import { ChevronDown } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { FlagBadge } from "./flag-badge";
import { getLanguageOption } from "./language-data";

function LanguageSwitcher(props: {
  isOpen: boolean;
  onToggle: () => void;
  isScrolled: boolean;
}) {
  const t = useTranslations("Navbar");
  const locale = useLocale();
  const currentLanguage = getLanguageOption(locale);

  return (
    <button
      type="button"
      data-navbar-menu="language"
      className={cn(
        "group inline-flex h-9 items-center gap-1.5 rounded-full border pr-3.5 pl-1.5 text-sm font-medium shadow-sm transition-all duration-200 ease-out aria-expanded:shadow-md",
        props.isScrolled
          ? "border-border bg-white text-dnet-blue hover:bg-white/90 border-dnet-blue/30 hover:border-dnet-blue"
          : "border-transparent bg-white text-dnet-blue hover:bg-white/90",
      )}
      aria-expanded={props.isOpen}
      aria-label={t("language_switcher_label")}
      onClick={props.onToggle}
    >
      <FlagBadge
        flag={currentLanguage?.flag ?? ""}
        className="size-5 transition-transform duration-200"
      />
      {locale.toUpperCase()}
      <ChevronDown
        className={cn(
          "size-3.5 transition-transform duration-200",
          props.isOpen && "rotate-180",
        )}
      />
    </button>
  );
}

export { LanguageSwitcher };
