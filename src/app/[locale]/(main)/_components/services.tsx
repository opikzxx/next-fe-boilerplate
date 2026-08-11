import { ArrowRight, Briefcase, Cloud, Settings2, Wifi } from "lucide-react";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import type { LucideIcon } from "lucide-react";
import { Link } from "@/lib/i18n-navigation";
import { cn } from "@/lib/utils";

async function Services(props: { locale: string }) {
  const t = await getTranslations({
    locale: props.locale,
    namespace: "Services",
  });

  return (
    <section className="w-full mx-auto max-w-6xl py-6 px-4 sm:py-10 lg:py-14">
      <div className="mx-auto max-w-2xl text-center">
        <span className="inline-flex items-center rounded-full bg-accent px-4 py-1.5 text-xs font-medium text-dnet-blue sm:text-sm">
          {t("badge")}
        </span>
        <h2 className="mt-4 text-3xl font-bold leading-tight md:text-4xl">
          {t.rich("heading", {
            accent: (chunks) => (
              <span className="text-dnet-blue">{chunks}</span>
            ),
          })}
        </h2>
        <p className="mt-4 text-base text-muted-foreground">{t("subtitle")}</p>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-6 sm:mt-12 lg:grid-cols-2">
        <ServiceCard
          image="/assets/images/dc.png"
          imageAlt={t("connectivity_image_alt")}
          icon={Wifi}
          iconColor="text-dnet-orange"
          title={t("connectivity_title")}
          description={t("connectivity_description")}
          cta={t("cta")}
        />
        <ServiceCard
          image="/assets/images/cloud.png"
          imageAlt={t("cloud_image_alt")}
          icon={Cloud}
          iconColor="text-dnet-blue"
          title={t("cloud_title")}
          description={t("cloud_description")}
          cta={t("cta")}
        />
        <ServiceCard
          image="/assets/images/network.webp"
          imageAlt={t("business_image_alt")}
          icon={Briefcase}
          iconColor="text-sky-500"
          title={t("business_title")}
          description={t("business_description")}
          cta={t("cta")}
        />
        <ServiceCard
          image="/assets/images/network.webp"
          imageAlt={t("managed_image_alt")}
          icon={Settings2}
          iconColor="text-amber-400"
          title={t("managed_title")}
          description={t("managed_description")}
          cta={t("cta")}
        />
      </div>

      <div className="mt-10 flex justify-center sm:mt-12">
        <Link
          href="/services"
          className="group inline-flex items-center justify-center gap-2 rounded-full bg-dnet-blue px-6 py-3 text-sm font-semibold text-dnet-blue-foreground transition-all duration-200 ease-out hover:-translate-y-0.5 hover:bg-dnet-blue/90 hover:shadow-lg sm:px-7 sm:py-3.5 sm:text-base lg:px-8 lg:py-4 lg:text-lg"
        >
          {t("see_more")}
          <ArrowRight className="size-4 transition-transform duration-150 group-hover:translate-x-0.5 sm:size-5" />
        </Link>
      </div>
    </section>
  );
}

function ServiceCard(props: {
  image: string;
  imageAlt: string;
  icon: LucideIcon;
  iconColor: string;
  title: string;
  description: string;
  cta: string;
}) {
  return (
    <div className="group relative min-h-64 overflow-hidden rounded-2xl sm:min-h-80 sm:rounded-3xl">
      <Image
        src={props.image}
        alt={props.imageAlt}
        fill
        sizes="(min-width: 1024px) 50vw, 100vw"
        className="object-cover transition-transform duration-300 ease-out group-hover:scale-110"
      />
      <p className="sr-only">{props.description}</p>

      <div className="absolute inset-x-3 bottom-3 flex items-center justify-between gap-3 rounded-2xl bg-dnet-dark/90 p-4 text-dnet-dark-foreground shadow-lg shadow-black/20 ring-1 ring-white/10 backdrop-blur-sm sm:inset-x-4 sm:bottom-4 sm:rounded-3xl">
        <span className="flex min-w-0 items-start gap-2.5">
          <props.icon
            className={cn("mt-0.5 size-5 shrink-0 sm:size-6", props.iconColor)}
          />
          <span className="min-w-0 break-words text-sm font-semibold leading-tight sm:text-base">
            {props.title}
          </span>
        </span>
        <Link
          href="/services"
          className="shrink-0 rounded-full bg-dnet-blue px-4 py-2 text-xs font-semibold text-dnet-blue-foreground transition-colors duration-150 hover:bg-dnet-blue/90 sm:text-sm"
        >
          {props.cta}
        </Link>
      </div>
    </div>
  );
}

export { Services };
