import { Sparkles } from "lucide-react";
import Image from "next/image";
import { getTranslations } from "next-intl/server";

async function Hero(props: { locale: string }) {
  const t = await getTranslations({
    locale: props.locale,
    namespace: "Hero",
  });

  return (
    <section>
      <div className="relative -mt-[70px] w-full overflow-hidden rounded-b-3xl bg-background px-4 pt-[calc(4rem+70px)] pb-26 text-foreground sm:rounded-b-[2.5rem] sm:px-6 sm:pt-[calc(5rem+70px)] sm:pb-36 lg:rounded-b-[3rem] lg:px-8">
        <Image
          src="/assets/images/bg-hero.png"
          alt={t("banner_image_alt")}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-r from-dnet-blue via-dnet-blue/85 via-20% to-transparent" />
        <div className="relative mx-auto grid max-w-6xl gap-10">
          <div className="md:max-w-xl text-left">
            <h1 className="text-4xl text-white leading-tight font-bold md:text-5xl">
              {t.rich("heading", {
                accent: (chunks) => (
                  <span className="text-white">{chunks}</span>
                ),
              })}
            </h1>
            <p className="mt-6 max-w-md text-white/80">
              {t("subtitle")}
            </p>
            <button
              type="button"
              className="group mt-8 inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-6 py-3 text-sm font-semibold text-dnet-blue shadow-lg ring-1 ring-dnet-blue/30 transition-all duration-200 ease-out hover:-translate-y-0.5 hover:text-dnet-blue hover:shadow-xl hover:ring-dnet-blue active:translate-y-0 active:shadow-md sm:rounded-3xl sm:px-7 sm:py-3.5 sm:text-base lg:px-8 lg:py-4 lg:text-lg"
            >
              <Sparkles className="size-4 transition-transform duration-200 group-hover:rotate-12 group-hover:scale-110 sm:size-5" />
              {t("cta")}
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="relative z-10 -translate-y-1/2 grid grid-cols-5 rounded-2xl bg-background shadow-xl sm:rounded-3xl">
          <div className="relative flex items-center justify-center px-2 py-4 sm:px-4">
            <StatItem
              description={`${t("stat_experience_value")} ${t("stat_experience_label")}`}
              iconAlt={t("stat_experience_icon_alt")}
            />
            <StatDivider />
          </div>
          <div className="relative flex items-center justify-center px-2 py-4 sm:px-4">
            <StatItem
              description={`${t("stat_clients_value")} ${t("stat_clients_label")}`}
              iconAlt={t("stat_clients_icon_alt")}
            />
            <StatDivider />
          </div>
          <div className="relative flex items-center justify-center px-2 py-4 sm:px-4">
            <StatItem
              description={`${t("cert_itil_value")} ${t("cert_itil_label")}`}
              iconAlt={t("cert_itil_icon_alt")}
            />
            <StatDivider />
          </div>
          <div className="relative flex items-center justify-center px-2 py-4 sm:px-4">
            <StatItem
              description={`${t("cert_iso9001_value")} ${t("cert_iso9001_label")}`}
              iconAlt={t("cert_iso9001_icon_alt")}
            />
            <StatDivider />
          </div>
          <div className="relative flex items-center justify-center px-2 py-4 sm:px-4">
            <StatItem
              description={`${t("cert_iso27001_value")} ${t("cert_iso27001_label")}`}
              iconAlt={t("cert_iso27001_icon_alt")}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function StatDivider() {
  return (
    <div className="absolute top-1/2 right-0 h-14 w-px -translate-y-1/2 bg-border sm:h-20 lg:h-24" />
  );
}

function StatItem(props: { description: string; iconAlt: string }) {
  return (
    <div className="flex w-full flex-col items-center justify-center text-center">
      <Image
        src="/assets/icons/icon-stat.webp"
        alt={props.iconAlt}
        width={28}
        height={28}
        className="size-6 sm:size-10 lg:size-12"
      />
      <p className="mt-1.5 line-clamp-2 min-h-[2lh] text-[8px] leading-tight font-medium text-muted-foreground sm:text-xs lg:text-sm">
        {props.description}
      </p>
    </div>
  );
}

export { Hero };
