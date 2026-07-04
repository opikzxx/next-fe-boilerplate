import { setRequestLocale } from "next-intl/server";

import { ProjectStatisticsCard } from "./_components/project-statistics-card";

type DashboardPageProps = {
  params: Promise<{ locale: string }>;
};

export default async function DashboardPage(props: DashboardPageProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  return (
    <div>
      <ProjectStatisticsCard />
    </div>
  );
}
