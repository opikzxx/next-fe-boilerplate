import { cn } from "@/lib/utils";

function FlagBadge(props: { flag: string; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex size-6 shrink-0 items-center justify-center overflow-hidden rounded-full bg-muted text-base leading-none ring-1 ring-border",
        props.className,
      )}
    >
      {props.flag}
    </span>
  );
}

export { FlagBadge };
