import { setRequestLocale } from "next-intl/server";

import { ProjectStatisticsCard } from "@/app/[locale]/(dashboard)/_components/project-statistics-card";

type CreatorPageProps = {
  params: Promise<{ locale: string }>;
};

export default async function CreatorPage(props: CreatorPageProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  return (
    <div>
      <ProjectStatisticsCard />
    </div>
  );
}
