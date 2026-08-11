import { Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/lib/i18n-navigation";
// import { footerCertifications } from "./footer-data";

async function Footer(props: { locale: string }) {
  const t = await getTranslations({
    locale: props.locale,
    namespace: "Footer",
  });
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-border bg-background text-foreground">
      <div className="mx-auto max-w-6xl px-4 sm:px-0 py-12 sm:py-16">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr]">
          <div>
            <Link href="/" aria-label={t("logo_alt")}>
              <Image
                src="/logo.png"
                alt={t("logo_alt")}
                width={228}
                height={72}
                className="h-8 w-auto sm:h-9"
              />
            </Link>
            <p className="mt-2 text-xs font-medium text-muted-foreground sm:text-sm">
              {t("tagline")}
            </p>

            <div className="mt-6 space-y-3 text-base text-muted-foreground">
              <p className="font-semibold text-foreground">
                {t("company_name")}
              </p>
              <div className="flex gap-2.5">
                <MapPin className="mt-0.5 size-4 shrink-0 text-dnet-blue" />
                <p>
                  {t("address_line1")}
                  <br />
                  {t("address_line2")}
                </p>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="size-4 shrink-0 text-dnet-blue" />
                <p>{t("phone")}</p>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="size-4 shrink-0 text-dnet-blue" />
                <p>{t("email")}</p>
              </div>
            </div>
          </div>

          <div>
            <p className="text-xs font-medium text-muted-foreground sm:text-sm">
              {t("links_heading")}
            </p>
            {/* <nav className="mt-4 flex flex-col gap-3 text-sm font-medium lg:text-base">
              <Link
                href="/about"
                className="w-fit text-foreground transition-colors hover:text-dnet-blue"
              >
                {t("nav_about")}
              </Link>
              <Link
                href="/contact"
                className="w-fit text-foreground transition-colors hover:text-dnet-blue"
              >
                {t("nav_contact")}
              </Link>
              <Link
                href="/career"
                className="w-fit text-foreground transition-colors hover:text-dnet-blue"
              >
                {t("nav_career")}
              </Link>
            </nav> */}
          </div>

          <div>
            <p className="text-xs font-medium text-muted-foreground sm:text-sm">
              {t("certifications_heading")}
            </p>
            {/* <div className="mt-4 grid grid-cols-2 gap-3">
              {footerCertifications.map((cert) => (
                <div
                  key={cert.id}
                  className="flex items-center gap-2 px-2.5 py-2 transition-colors hover:border-dnet-blue/40"
                >
                  <Image
                    src="/assets/icons/icon-stat.webp"
                    alt={t(cert.altKey)}
                    width={28}
                    height={28}
                    className="size-6 shrink-0"
                  />
                </div>
              ))}
            </div> */}
          </div>
        </div>
      </div>

      <div className="bg-dnet-blue py-4 text-dnet-blue-foreground">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-2 px-4 text-center text-xs sm:flex-row sm:justify-between sm:px-6 sm:text-sm lg:px-8">
          <p>{t("copyright", { year })}</p>
          <div className="flex items-center gap-2">
            <span>{t("member_of")}</span>
            <span className="inline-flex items-center rounded-full bg-white p-1">
              <Image
                src="/assets/icons/icon-stat.webp"
                alt={t("member_tower_bersama_alt")}
                width={20}
                height={20}
                className="size-5"
              />
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export { Footer };
