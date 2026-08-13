import type { SlotComponent } from "@measured/puck";
import { ChevronDown, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  getColorClasses,
  getOverlayClasses,
  getTextColorClass,
} from "@/features/pages/color-tokens";
import { cn } from "@/lib/utils";

const SPACER_HEIGHT = {
  sm: "h-8",
  md: "h-16",
  lg: "h-24",
};

const CONTAINER_LAYOUT = {
  "flex-row": "flex flex-row flex-wrap",
  "flex-col": "flex flex-col",
  "grid-2": "grid grid-cols-1 sm:grid-cols-2",
  "grid-2-60-40": "grid grid-cols-1 sm:grid-cols-[3fr_2fr]",
  "grid-2-70-30": "grid grid-cols-1 sm:grid-cols-[7fr_3fr]",
  "grid-2-40-60": "grid grid-cols-1 sm:grid-cols-[2fr_3fr]",
  "grid-2-30-70": "grid grid-cols-1 sm:grid-cols-[3fr_7fr]",
  "grid-3": "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
  "grid-4": "grid grid-cols-2 lg:grid-cols-4",
};

const CONTAINER_GAP = {
  none: "gap-0",
  sm: "gap-2",
  md: "gap-6",
  lg: "gap-10",
};

const CONTAINER_PADDING = {
  none: "py-0",
  sm: "py-6",
  md: "py-12",
  lg: "py-20",
};

const HEADING_SIZE = {
  sm: "text-xl md:text-2xl",
  md: "text-2xl md:text-3xl",
  lg: "text-4xl md:text-5xl",
  xl: "text-5xl md:text-6xl",
};

const PARAGRAPH_SIZE = {
  sm: "text-sm",
  base: "text-base",
  lg: "text-lg",
};

export function HeroBlock(props: {
  heading: string;
  subtitle: string;
  ctaLabel: string;
  ctaHref: string;
  ctaIcon: boolean;
  image: string;
  imageAlt: string;
  color: string;
  overlay: "none" | "gradient" | "solid";
  textColor: string;
  showStats: boolean;
  stats: { value: string; label: string }[];
}) {
  const colorClasses = getColorClasses(props.color);
  const overlayClasses = props.image
    ? getOverlayClasses(props.color, props.overlay)
    : "";
  const textColorClass = getTextColorClass(props.textColor);
  const showStats = props.showStats && props.stats.length > 0;

  return (
    <section className="relative w-full">
      <div
        className={cn(
          "relative w-full overflow-hidden rounded-b-3xl px-4 pt-16 sm:rounded-b-[2.5rem] sm:px-6 sm:pt-20 lg:rounded-b-[3rem] lg:px-8 lg:pt-24",
          showStats ? "pb-26 sm:pb-36" : "pb-16 sm:pb-20",
          !props.image && colorClasses.bg,
        )}
      >
        {props.image && (
          <Image
            src={props.image}
            alt={props.imageAlt}
            fill
            unoptimized
            className="object-cover"
            sizes="100vw"
          />
        )}
        {overlayClasses && (
          <div className={cn("absolute inset-0", overlayClasses)} />
        )}
        <div className={cn("relative mx-auto max-w-6xl", textColorClass)}>
          <div className="max-w-xl text-left">
            {props.heading && (
              <h1 className="text-4xl font-bold leading-tight md:text-5xl">
                {props.heading}
              </h1>
            )}
            {props.subtitle && (
              <p className="mt-6 max-w-md text-base opacity-80">
                {props.subtitle}
              </p>
            )}
            {props.ctaLabel && props.ctaHref && (
              <Link
                href={props.ctaHref}
                className="mt-8 inline-flex items-center justify-center gap-2 rounded-2xl bg-background px-6 py-3 text-sm font-semibold text-foreground sm:text-base lg:text-lg"
              >
                {props.ctaIcon && <Sparkles className="size-4" />}
                {props.ctaLabel}
              </Link>
            )}
          </div>
        </div>
      </div>
      {showStats && (
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div
            className="relative z-10 grid -translate-y-1/2 rounded-2xl bg-background shadow-xl sm:rounded-3xl"
            style={{
              gridTemplateColumns: `repeat(${props.stats.length}, minmax(0, 1fr))`,
            }}
          >
            {props.stats.map((stat, index) => (
              <div
                key={index}
                className="relative flex items-center justify-center px-2 py-4 sm:px-4"
              >
                <div className="flex w-full flex-col items-center justify-center text-center">
                  <p className="text-sm font-bold text-foreground sm:text-xl lg:text-2xl">
                    {stat.value}
                  </p>
                  <p className="mt-1 line-clamp-2 min-h-[2lh] text-[8px] leading-tight font-medium text-muted-foreground sm:text-xs lg:text-sm">
                    {stat.label}
                  </p>
                </div>
                {index < props.stats.length - 1 && (
                  <div className="absolute top-1/2 right-0 h-14 w-px -translate-y-1/2 bg-border sm:h-20 lg:h-24" />
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

export function RichTextBlock(props: {
  heading: string;
  body: string;
  color: string;
}) {
  const colorClasses = getColorClasses(props.color);

  return (
    <section className={cn(colorClasses.bg, colorClasses.text)}>
      <div className="mx-auto w-full max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        {props.heading && (
          <h2 className="text-4xl font-bold leading-tight md:text-5xl">
            {props.heading}
          </h2>
        )}
        {props.body && (
          <p className="mt-4 whitespace-pre-wrap text-base">{props.body}</p>
        )}
      </div>
    </section>
  );
}

export function ImageWithTextBlock(props: {
  heading: string;
  body: string;
  image: string;
  imagePosition: "left" | "right";
}) {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <div
        className={`grid items-center gap-10 md:grid-cols-2 ${
          props.imagePosition === "right" ? "" : "md:[&>*:first-child]:order-2"
        }`}
      >
        <div className="relative aspect-video w-full overflow-hidden rounded-2xl">
          {props.image && (
            <Image
              src={props.image}
              alt=""
              fill
              unoptimized
              className="object-cover"
              sizes="(min-width: 768px) 50vw, 100vw"
            />
          )}
        </div>
        <div>
          {props.heading && (
            <h2 className="text-4xl font-bold leading-tight md:text-5xl">
              {props.heading}
            </h2>
          )}
          {props.body && (
            <p className="mt-4 whitespace-pre-wrap text-base">{props.body}</p>
          )}
        </div>
      </div>
    </section>
  );
}

export function CTABannerBlock(props: {
  heading: string;
  body: string;
  ctaLabel: string;
  ctaHref: string;
  color: string;
}) {
  const colorClasses = getColorClasses(props.color || "primary");

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <div
        className={cn(
          "rounded-3xl px-8 py-12 text-center",
          colorClasses.bg,
          colorClasses.text,
        )}
      >
        {props.heading && (
          <h2 className="text-4xl font-bold leading-tight md:text-5xl">
            {props.heading}
          </h2>
        )}
        {props.body && <p className="mt-4 text-base">{props.body}</p>}
        {props.ctaLabel && props.ctaHref && (
          <Link
            href={props.ctaHref}
            className="mt-8 inline-flex items-center justify-center rounded-2xl bg-background px-6 py-3 text-sm font-semibold text-foreground sm:text-base lg:text-lg"
          >
            {props.ctaLabel}
          </Link>
        )}
      </div>
    </section>
  );
}

export function GalleryBlock(props: {
  images: { image: string; alt: string }[];
}) {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
        {props.images.map((item, index) => (
          <div
            key={index}
            className="relative aspect-square w-full overflow-hidden rounded-xl"
          >
            {item.image && (
              <Image
                src={item.image}
                alt={item.alt}
                fill
                unoptimized
                className="object-cover"
                sizes="(min-width: 768px) 33vw, 50vw"
              />
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

export function AccordionBlock(props: {
  items: { question: string; answer: string }[];
}) {
  return (
    <section className="mx-auto w-full max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-3">
        {props.items.map((item, index) => (
          <details
            key={index}
            className="group rounded-xl border border-border p-4"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-semibold sm:text-base lg:text-lg">
              {item.question}
              <ChevronDown className="size-4 shrink-0 transition-transform group-open:rotate-180" />
            </summary>
            <p className="mt-3 whitespace-pre-wrap text-base">
              {item.answer}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}

export function SpacerBlock(props: { size: "sm" | "md" | "lg" }) {
  return <div className={SPACER_HEIGHT[props.size]} />;
}

export function HeadingBlock(props: {
  text: string;
  level: "h2" | "h3";
  size: keyof typeof HEADING_SIZE;
  color: string;
}) {
  const Tag = props.level;

  return (
    <div className="mx-auto w-full max-w-3xl px-4 sm:px-6 lg:px-8">
      <Tag
        className={cn(
          "font-bold leading-tight",
          HEADING_SIZE[props.size],
          getTextColorClass(props.color),
        )}
      >
        {props.text}
      </Tag>
    </div>
  );
}

export function ParagraphBlock(props: {
  text: string;
  size: keyof typeof PARAGRAPH_SIZE;
  color: string;
}) {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 sm:px-6 lg:px-8">
      <p
        className={cn(
          "whitespace-pre-wrap",
          PARAGRAPH_SIZE[props.size],
          getTextColorClass(props.color),
        )}
      >
        {props.text}
      </p>
    </div>
  );
}

export function ImageBlock(props: { image: string; alt: string }) {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8">
      {/* `min-w` keeps this box from collapsing to 0 width: its only content is a
      `fill` (absolutely-positioned) <Image>, which flex's shrink-to-fit sizing ignores
      when this block sits inside a "Row (flex)" Container. */}
      <div className="relative aspect-video w-full min-w-64 overflow-hidden rounded-2xl">
        {props.image && (
          <Image
            src={props.image}
            alt={props.alt}
            fill
            unoptimized
            className="object-cover"
            sizes="100vw"
          />
        )}
      </div>
    </div>
  );
}

export function ContainerBlock(props: {
  layout: keyof typeof CONTAINER_LAYOUT;
  gap: keyof typeof CONTAINER_GAP;
  padding: keyof typeof CONTAINER_PADDING;
  color: string;
  children: SlotComponent;
  puck: { dragRef: ((element: Element | null) => void) | null };
}) {
  const colorClasses = getColorClasses(props.color);

  // The padding/max-width live on the slot's own wrapper (via className), not on a
  // separate ancestor div — Puck's drop-zone collision math is known to misbehave when
  // a padded/margined element sits between the drop zone and its parent (puckeditor/puck#918).
  //
  // `puck.dragRef` is Puck's own callback-ref prop (required for `inline: true` components,
  // per Puck's docs), not a `useRef().current` read — the react-compiler lint's ref heuristic
  // can't tell the two apart and flags this whole block as a false positive.
  /* eslint-disable react-hooks/refs */
  return (
    <section
      ref={props.puck.dragRef}
      className={cn(colorClasses.bg, colorClasses.text)}
    >
      {props.children({
        className: cn(
          "mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8",
          CONTAINER_LAYOUT[props.layout],
          CONTAINER_GAP[props.gap],
          CONTAINER_PADDING[props.padding],
        ),
        collisionAxis: "dynamic",
        minEmptyHeight: 160,
      })}
    </section>
  );
  /* eslint-enable react-hooks/refs */
}

export type HeroBlockProps = Parameters<typeof HeroBlock>[0];
export type RichTextBlockProps = Parameters<typeof RichTextBlock>[0];
export type ImageWithTextBlockProps = Parameters<typeof ImageWithTextBlock>[0];
export type CTABannerBlockProps = Parameters<typeof CTABannerBlock>[0];
export type GalleryBlockProps = Parameters<typeof GalleryBlock>[0];
export type AccordionBlockProps = Parameters<typeof AccordionBlock>[0];
export type SpacerBlockProps = Parameters<typeof SpacerBlock>[0];
export type ContainerBlockProps = Parameters<typeof ContainerBlock>[0];
export type HeadingBlockProps = Parameters<typeof HeadingBlock>[0];
export type ParagraphBlockProps = Parameters<typeof ParagraphBlock>[0];
export type ImageBlockProps = Parameters<typeof ImageBlock>[0];
