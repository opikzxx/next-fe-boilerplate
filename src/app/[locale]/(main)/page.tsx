import { setRequestLocale } from "next-intl/server";
import { Advantages } from "./_components/advantages";
import { Hero } from "./_components/hero";
import { OurSolutions } from "./_components/our-solutions";
import { Services } from "./_components/services";

type IndexPageProps = {
  params: Promise<{ locale: string }>;
};

export default async function IndexPage(props: IndexPageProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  return (
    <>
      <Hero locale={locale} />
      <Services locale={locale} />
      <OurSolutions locale={locale} />
      <Advantages locale={locale} />
    </>
  );
}
