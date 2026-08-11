"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/lib/i18n-navigation";
import type { ServiceItem } from "./navbar-data";

function NavbarServiceItemLink(props: { item: ServiceItem; onClick: () => void }) {
  const t = useTranslations("Navbar");

  return (
    <Link
      href={props.item.slug}
      className="group flex items-start gap-3 rounded-lg px-3 py-3 transition-colors duration-150 hover:bg-muted active:bg-muted"
      onClick={props.onClick}
    >
      <props.item.icon className="mt-0.5 size-5 shrink-0 text-dnet-blue transition-transform duration-150 group-hover:scale-110" />
      <span>
        <span className="block text-sm font-semibold text-foreground transition-colors duration-150 group-hover:text-dnet-blue">
          {t(props.item.titleKey)}
        </span>
        <span className="mt-0.5 block text-xs text-muted-foreground">
          {t(props.item.descriptionKey)}
        </span>
      </span>
    </Link>
  );
}

export { NavbarServiceItemLink };
