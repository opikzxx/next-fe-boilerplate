"use client";

import { ChevronDown, Menu, Sparkles, X } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "@/lib/i18n-navigation";
import { LanguageSwitcher } from "./language-switcher";
import { NavbarLanguageMenu } from "./navbar-language-menu";
import { NavbarMegaMenu } from "./navbar-mega-menu";
import { NavbarMobileMenu } from "./navbar-mobile-menu";
import { cn } from "@/lib/utils";

type DesktopMenu = "services" | "language";

function Navbar() {
  const t = useTranslations("Navbar");
  const [activeMenu, setActiveMenu] = useState<DesktopMenu | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleMenu = (menu: DesktopMenu) => {
    setActiveMenu((current) => (current === menu ? null : menu));
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!isMobileMenuOpen) {
      return;
    }

    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = overflow;
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    if (!activeMenu) {
      return;
    }

    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target as HTMLElement;
      const isInsideTrigger = target.closest(
        `[data-navbar-menu="${activeMenu}"]`,
      );
      const isInsidePanel = target.closest(
        `[data-navbar-panel="${activeMenu}"]`,
      );

      if (!isInsideTrigger && !isInsidePanel) {
        setActiveMenu(null);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [activeMenu]);

  const showLightHeader = isScrolled || isMobileMenuOpen;

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 flex w-full flex-col",
        isMobileMenuOpen && "h-dvh md:h-auto",
      )}
    >
      <div
        className={cn(
          "relative z-50 shrink-0 overflow-hidden px-4 py-4 transition-shadow duration-150 sm:px-6 lg:px-8",
          showLightHeader ? "shadow-sm" : "shadow-none",
        )}
      >
        <div
          aria-hidden
          className={cn(
            "absolute inset-0 bg-white transition-opacity duration-150 ease-out",
            showLightHeader ? "opacity-100" : "opacity-0",
          )}
        />
        <div className="relative z-10 mx-auto flex max-w-6xl items-center justify-between gap-4">
          <Link href="/" aria-label={t("logo_alt")}>
            <Image
              src="/logo.png"
              alt={t("logo_alt")}
              width={228}
              height={72}
              priority
              className="h-8 w-auto sm:h-9"
            />
          </Link>

          <nav
            className={cn(
              "hidden items-center gap-8 text-sm font-medium transition-colors duration-150 md:flex lg:text-base",
              isScrolled ? "text-black" : "text-white",
            )}
          >
            <Link href="/" className="hover:text-foreground">
              {t("home")}
            </Link>
            <button
              type="button"
              data-navbar-menu="services"
              className="inline-flex items-center gap-1 hover:text-foreground"
              aria-expanded={activeMenu === "services"}
              onClick={() => toggleMenu("services")}
            >
              {t("services")}
              <ChevronDown
                className={cn(
                  "size-4 transition-transform",
                  activeMenu === "services" && "rotate-180",
                )}
              />
            </button>
            <Link href="/blog" className="hover:text-foreground">
              {t("blog")}
            </Link>
            <Link href="/contact" className="hover:text-foreground">
              {t("contact_us")}
            </Link>
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <Button
              className={cn(
                "hidden h-9 rounded-full px-5 text-sm shadow-sm transition-all duration-200 ease-out hover:shadow-md sm:inline-flex",
                isScrolled
                  ? "bg-white text-dnet-blue border border-dnet-blue/30 hover:border-dnet-blue hover:bg-dnet-blue hover:text-white"
                  : "bg-white text-dnet-blue hover:bg-white/90",
              )}
            >
              <Sparkles className="size-4 transition-transform duration-200 group-hover/button:rotate-12 group-hover/button:scale-110" />
              {t("ask_ai")}
            </Button>
            <div className="hidden md:block">
              <LanguageSwitcher
                isOpen={activeMenu === "language"}
                onToggle={() => toggleMenu("language")}
                isScrolled={isScrolled}
              />
            </div>
            <button
              type="button"
              className={cn(
                "inline-flex size-9 items-center justify-center rounded-full transition-colors duration-150 md:hidden",
                showLightHeader ? "text-foreground" : "bg-white text-dnet-blue",
              )}
              aria-expanded={isMobileMenuOpen}
              aria-label={isMobileMenuOpen ? t("close_menu") : t("open_menu")}
              onClick={() => setIsMobileMenuOpen((open) => !open)}
            >
              {isMobileMenuOpen ? (
                <X className="size-5" />
              ) : (
                <Menu className="size-5 font-extrabold" />
              )}
            </button>
          </div>
        </div>
      </div>

      <NavbarMegaMenu
        isOpen={activeMenu === "services"}
        onClose={() => setActiveMenu(null)}
      />
      <NavbarLanguageMenu
        isOpen={activeMenu === "language"}
        onClose={() => setActiveMenu(null)}
      />

      {isMobileMenuOpen && (
        <div className="animate-in fade-in flex-1 overflow-y-auto bg-white px-4 py-4 duration-200 md:hidden">
          <NavbarMobileMenu onClose={() => setIsMobileMenuOpen(false)} />
        </div>
      )}
    </header>
  );
}

export { Navbar };
