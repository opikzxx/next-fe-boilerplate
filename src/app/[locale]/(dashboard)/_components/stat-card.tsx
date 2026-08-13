import { cn } from "@/lib/utils";

type StatCardProps = {
  icon: React.ComponentType<{ className?: string }>;
  color: "chart-1" | "chart-2" | "chart-3" | "chart-4";
  value: string;
  percent: string;
  label: string;
};

const colorClasses = {
  "chart-1": { tile: "bg-chart-1/15", icon: "text-chart-1" },
  "chart-2": { tile: "bg-chart-2/15", icon: "text-chart-2" },
  "chart-3": { tile: "bg-chart-3/15", icon: "text-chart-3" },
  "chart-4": { tile: "bg-chart-4/15", icon: "text-chart-4" },
} as const;

function StatCard(props: StatCardProps) {
  const colors = colorClasses[props.color];

  return (
    <div
      className={cn(
        "flex min-w-[200px] flex-1 shrink-0 flex-col gap-4 rounded-2xl p-5 snap-start xl:min-w-0",
        colors.tile,
      )}
    >
      <div className="flex items-center justify-between">
        <span className="bg-background/70 flex size-9 items-center justify-center rounded-full">
          <props.icon className={cn("size-4.5", colors.icon)} />
        </span>
        <span className="text-sm font-semibold">{props.percent}</span>
      </div>

      <div className="min-w-0">
        <p className="text-2xl leading-tight font-bold break-words">
          {props.value}
        </p>
        <p className="text-muted-foreground text-sm">{props.label}</p>
      </div>
    </div>
  );
}

export { StatCard };
