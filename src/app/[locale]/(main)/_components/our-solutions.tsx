import { getTranslations } from "next-intl/server";
import {
  OurSolutionsCarousel,
  type SolutionItem,
} from "./our-solutions-carousel";

async function OurSolutions(props: { locale: string }) {
  const t = await getTranslations({
    locale: props.locale,
    namespace: "OurSolutions",
  });

  const items: SolutionItem[] = [
    {
      href: "/services",
      image: "/assets/images/banner-1.png",
      imageAlt: t("manufacture_image_alt"),
      title: t("manufacture_title"),
    },
    {
      href: "/services",
      image: "/assets/images/banner-1.png",
      imageAlt: t("education_image_alt"),
      title: t("education_title"),
    },
    {
      href: "/services",
      image: "/assets/images/banner-1.png",
      imageAlt: t("hospitality_image_alt"),
      title: t("hospitality_title"),
    },
    {
      href: "/services",
      image: "/assets/images/banner-1.png",
      imageAlt: t("government_image_alt"),
      title: t("government_title"),
    },
    {
      href: "/services",
      image: "/assets/images/banner-1.png",
      imageAlt: t("healthcare_image_alt"),
      title: t("healthcare_title"),
    },
    {
      href: "/services",
      image: "/assets/images/banner-1.png",
      imageAlt: t("finance_image_alt"),
      title: t("finance_title"),
    },
  ];

  return (
    <section className="w-full py-6 sm:py-10 lg:py-14">
      <div className="mx-auto max-w-2xl px-4 text-center sm:px-6 lg:px-8">
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

      <div className="mt-10 sm:mt-12">
        <OurSolutionsCarousel
          items={items}
          cta={t("cta")}
          prevLabel={t("prev")}
          nextLabel={t("next")}
        />
      </div>
    </section>
  );
}

export { OurSolutions };
