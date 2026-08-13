"use client";

import { Activity, BarChart3, Clock, TrendingUp } from "lucide-react";
import { useTranslations } from "next-intl";
import * as React from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getChartData, getStatsData, type StatKey } from "./mock-data";
import { StatCard } from "./stat-card";
import { VisitsLineChart } from "./visits-line-chart";

const statIcons: Record<
  StatKey,
  {
    icon: React.ComponentType<{ className?: string }>;
    color: "chart-1" | "chart-2" | "chart-3" | "chart-4";
  }
> = {
  bounce_rate: { icon: BarChart3, color: "chart-1" },
  pages_per_visit: { icon: Activity, color: "chart-4" },
  monthly_visits: { icon: TrendingUp, color: "chart-2" },
  visit_duration: { icon: Clock, color: "chart-3" },
};

function ProjectStatisticsCard() {
  const t = useTranslations("CreatorPage");

  const chartData = getChartData("90d");
  const statsData = getStatsData("90d");

  return (
    <Card className="border-none shadow-none gap-2 md:gap-4">
      <CardHeader className="flex-row items-center justify-between">
        <CardTitle className="text-lg md:text-xl font-bold">
          {t("project_statistics")}
        </CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col gap-6 xl:flex-row">
        <div className="rounded-2xl border p-4 xl:flex-[1.6]">
          <p className="text-muted-foreground mb-2 text-sm font-medium">
            {t("total_visits")}
          </p>
          <VisitsLineChart data={chartData} />
        </div>

        <div className="flex gap-4 overflow-x-auto pb-1 snap-x snap-mandatory xl:grid xl:flex-1 xl:grid-cols-2 xl:overflow-visible">
          {statsData.map((stat) => (
            <StatCard
              key={stat.key}
              icon={statIcons[stat.key].icon}
              color={statIcons[stat.key].color}
              value={stat.value}
              percent={stat.percent}
              label={t(`stat_${stat.key}`)}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export { ProjectStatisticsCard };
