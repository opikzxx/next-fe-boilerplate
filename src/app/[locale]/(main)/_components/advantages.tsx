import { Headset, ShieldCheck, Zap } from "lucide-react";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { cn } from "@/lib/utils";

async function Advantages(props: { locale: string }) {
  const t = await getTranslations({
    locale: props.locale,
    namespace: "Advantages",
  });

  return (
    <section className="mx-auto max-w-6xl px-4  sm:px-0 py-6 sm:py-10 lg:py-14">
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
      </div>

      <div className="mt-10 grid gap-6 sm:mt-12 lg:grid-cols-2 lg:items-stretch">
        <div className="relative min-h-64 overflow-hidden rounded-2xl sm:min-h-80 sm:rounded-3xl lg:min-h-0">
          <Image
            src="/assets/images/hero-banner.png"
            alt={t("image_alt")}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </div>

        <div className="grid gap-4 sm:gap-5">
          <AdvantageCard
            icon={<ShieldCheck className="size-5 sm:size-6" />}
            title={t("focus_title")}
            description={t("focus_description")}
            className="bg-dnet-orange"
          />
          <AdvantageCard
            icon={<Headset className="size-5 sm:size-6" />}
            title={t("support_title")}
            description={t("support_description")}
            className="bg-dnet-blue"
          />
          <AdvantageCard
            icon={<Zap className="size-5 sm:size-6" />}
            title={t("reliable_title")}
            description={t("reliable_description")}
            className="bg-dnet-green"
          />
        </div>
      </div>
    </section>
  );
}

function AdvantageCard(props: {
  icon: React.ReactNode;
  title: string;
  description: string;
  className: string;
}) {
  return (
    <div
      className={cn(
        "flex items-start gap-4 rounded-2xl p-5 text-white sm:rounded-3xl sm:p-6",
        props.className,
      )}
    >
      <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-white/20 sm:size-12">
        {props.icon}
      </span>
      <div>
        <h3 className="text-base font-semibold sm:text-lg">{props.title}</h3>
        <p className="mt-1 text-sm text-white/85">{props.description}</p>
      </div>
    </div>
  );
}

export { Advantages };
