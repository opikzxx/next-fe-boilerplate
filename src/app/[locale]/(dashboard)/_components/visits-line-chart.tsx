"use client";

import * as React from "react";
import { useTranslations } from "next-intl";

import type { ChartPoint } from "./mock-data";

const WIDTH = 600;
const HEIGHT = 200;
const CHART_HEIGHT_CLASS = "h-48";

function buildSmoothPath(points: { x: number; y: number }[]) {
  if (points.length < 2) {
    return "";
  }

  let d = `M ${points[0].x} ${points[0].y}`;
  for (let i = 0; i < points.length - 1; i++) {
    const current = points[i];
    const next = points[i + 1];
    const controlX = (current.x + next.x) / 2;
    d += ` C ${controlX} ${current.y}, ${controlX} ${next.y}, ${next.x} ${next.y}`;
  }

  return d;
}

function niceMax(value: number) {
  const step = 10000;
  return Math.max(step, Math.ceil(value / step) * step);
}

function VisitsLineChart({ data }: { data: ChartPoint[] }) {
  const t = useTranslations("CreatorPage");
  const defaultIndex = data.reduce(
    (bestIndex, point, index) =>
      point.value > data[bestIndex].value ? index : bestIndex,
    0,
  );
  const [activeIndex, setActiveIndex] = React.useState(defaultIndex);

  const chartMax = niceMax(Math.max(...data.map((point) => point.value)));

  const points = data.map((point, index) => ({
    x: data.length === 1 ? WIDTH / 2 : (WIDTH * index) / (data.length - 1),
    y: HEIGHT - (point.value / chartMax) * HEIGHT,
  }));

  const linePath = buildSmoothPath(points);
  const active = points[activeIndex];
  const activeValue = data[activeIndex];
  const leftPercent = (active.x / WIDTH) * 100;
  const topPercent = (active.y / HEIGHT) * 100;

  function handlePointerMove(event: React.PointerEvent<SVGSVGElement>) {
    const bounds = event.currentTarget.getBoundingClientRect();
    const relativeX = ((event.clientX - bounds.left) / bounds.width) * WIDTH;
    let nearest = 0;
    let nearestDistance = Infinity;
    points.forEach((point, index) => {
      const distance = Math.abs(point.x - relativeX);
      if (distance < nearestDistance) {
        nearestDistance = distance;
        nearest = index;
      }
    });
    setActiveIndex(nearest);
  }

  const yTicks = [1, 0.75, 0.5, 0.25, 0];

  return (
    <div className="w-full">
      <div className="flex gap-2">
        <div
          className={`flex flex-col justify-between text-[11px] text-muted-foreground ${CHART_HEIGHT_CLASS}`}
        >
          {yTicks.map((tick) => (
            <span key={tick}>
              {tick === 0 ? "0" : `${Math.round((chartMax * tick) / 1000)}K`}
            </span>
          ))}
        </div>

        <div className={`relative min-w-0 flex-1 ${CHART_HEIGHT_CLASS}`}>
          <svg
            viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
            preserveAspectRatio="none"
            className="size-full touch-none"
            role="img"
            aria-label={t("visits_chart_label")}
            onPointerMove={handlePointerMove}
            onPointerLeave={() => setActiveIndex(defaultIndex)}
          >
            {yTicks.map((tick) => (
              <line
                key={tick}
                x1={0}
                x2={WIDTH}
                y1={HEIGHT - tick * HEIGHT}
                y2={HEIGHT - tick * HEIGHT}
                className="stroke-border"
                strokeWidth={1}
                vectorEffect="non-scaling-stroke"
              />
            ))}

            <line
              x1={active.x}
              x2={active.x}
              y1={0}
              y2={HEIGHT}
              className="stroke-border"
              strokeWidth={1}
              strokeDasharray="3 3"
              vectorEffect="non-scaling-stroke"
            />

            <path
              d={linePath}
              fill="none"
              className="stroke-chart-1"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              vectorEffect="non-scaling-stroke"
            />

            <circle
              cx={active.x}
              cy={active.y}
              r={5}
              className="stroke-chart-1 fill-chart-1"
              strokeWidth={2}
              vectorEffect="non-scaling-stroke"
            />
            <circle
              cx={active.x}
              cy={active.y}
              r={7}
              fill="none"
              className="stroke-background"
              strokeWidth={2}
              vectorEffect="non-scaling-stroke"
            />
          </svg>

          <div
            className="bg-foreground text-background pointer-events-none absolute w-max min-w-28 -translate-x-1/2 -translate-y-[calc(100%+12px)] rounded-lg px-3 py-2 text-center shadow-lg"
            style={{ left: `${leftPercent}%`, top: `${topPercent}%` }}
          >
            <p className="text-sm font-bold">
              {activeValue.value.toLocaleString()}
            </p>
            <p className="text-background/70 text-xs">
              {t("visits_chart_tooltip")}
            </p>
          </div>
        </div>
      </div>

      <div className="flex gap-2 pt-2">
        <div className="w-6 shrink-0" />
        <div className="flex flex-1 justify-between text-[11px] text-muted-foreground">
          {data.map((point) => (
            <span key={point.label}>{point.label}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

export { VisitsLineChart };
