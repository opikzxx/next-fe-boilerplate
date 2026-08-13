import type { CSSProperties } from "react";

export type ColorTokenOption = {
  value: string;
  label: string;
  previewStyle?: CSSProperties;
};

export const BACKGROUND_COLOR_TOKENS: ColorTokenOption[] = [
  { value: "none", label: "None" },
  {
    value: "background",
    label: "Background",
    previewStyle: { backgroundColor: "var(--background)" },
  },
  { value: "card", label: "Card", previewStyle: { backgroundColor: "var(--card)" } },
  { value: "muted", label: "Muted", previewStyle: { backgroundColor: "var(--muted)" } },
  {
    value: "secondary",
    label: "Secondary",
    previewStyle: { backgroundColor: "var(--secondary)" },
  },
  { value: "accent", label: "Accent", previewStyle: { backgroundColor: "var(--accent)" } },
  { value: "primary", label: "Primary", previewStyle: { backgroundColor: "var(--primary)" } },
  {
    value: "dnet-blue",
    label: "DNET Blue",
    previewStyle: { backgroundColor: "var(--dnet-blue)" },
  },
  {
    value: "dnet-orange",
    label: "DNET Orange",
    previewStyle: { backgroundColor: "var(--dnet-orange)" },
  },
  {
    value: "dnet-green",
    label: "DNET Green",
    previewStyle: { backgroundColor: "var(--dnet-green)" },
  },
  {
    value: "dnet-dark",
    label: "DNET Dark",
    previewStyle: { backgroundColor: "var(--dnet-dark)" },
  },
];

export const TEXT_COLOR_TOKENS: ColorTokenOption[] = [
  { value: "default", label: "Default", previewStyle: { backgroundColor: "var(--foreground)" } },
  {
    value: "muted",
    label: "Muted",
    previewStyle: { backgroundColor: "var(--muted-foreground)" },
  },
  { value: "primary", label: "Primary", previewStyle: { backgroundColor: "var(--primary)" } },
  {
    value: "white",
    label: "White",
    previewStyle: { backgroundColor: "#ffffff", border: "1px solid var(--border)" },
  },
  {
    value: "dnet-blue",
    label: "DNET Blue",
    previewStyle: { backgroundColor: "var(--dnet-blue)" },
  },
  {
    value: "dnet-orange",
    label: "DNET Orange",
    previewStyle: { backgroundColor: "var(--dnet-orange)" },
  },
  {
    value: "dnet-green",
    label: "DNET Green",
    previewStyle: { backgroundColor: "var(--dnet-green)" },
  },
  {
    value: "dnet-dark",
    label: "DNET Dark",
    previewStyle: { backgroundColor: "var(--dnet-dark)" },
  },
];

const BACKGROUND_CLASSES: Record<string, { bg: string; text: string }> = {
  none: { bg: "", text: "" },
  background: { bg: "bg-background", text: "text-foreground" },
  card: { bg: "bg-card", text: "text-card-foreground" },
  muted: { bg: "bg-muted", text: "text-muted-foreground" },
  secondary: { bg: "bg-secondary", text: "text-secondary-foreground" },
  accent: { bg: "bg-accent", text: "text-accent-foreground" },
  primary: { bg: "bg-primary", text: "text-primary-foreground" },
  "dnet-blue": { bg: "bg-dnet-blue", text: "text-dnet-blue-foreground" },
  "dnet-orange": { bg: "bg-dnet-orange", text: "text-dnet-orange-foreground" },
  "dnet-green": { bg: "bg-dnet-green", text: "text-dnet-green-foreground" },
  "dnet-dark": { bg: "bg-dnet-dark", text: "text-dnet-dark-foreground" },
};

const TEXT_CLASSES: Record<string, string> = {
  default: "text-foreground",
  muted: "text-muted-foreground",
  primary: "text-primary",
  white: "text-white",
  "dnet-blue": "text-dnet-blue",
  "dnet-orange": "text-dnet-orange",
  "dnet-green": "text-dnet-green",
  "dnet-dark": "text-dnet-dark",
};

/**
 * Resolves a stored background color token to its Tailwind background/text class pair.
 * @param token The color token stored on a block's props.
 * @returns The matching `bg-*`/`text-*` class pair, falling back to no color.
 */
export function getColorClasses(token: string) {
  return BACKGROUND_CLASSES[token] ?? BACKGROUND_CLASSES.none;
}

/**
 * Resolves a stored text color token to its Tailwind text class.
 * @param token The color token stored on a block's props.
 * @returns The matching `text-*` class, falling back to the default foreground.
 */
export function getTextColorClass(token: string) {
  return TEXT_CLASSES[token] ?? TEXT_CLASSES.default;
}

const OVERLAY_GRADIENT_CLASSES: Record<string, string> = {
  none: "",
  background: "bg-linear-to-r from-background via-background/85 via-20% to-transparent",
  card: "bg-linear-to-r from-card via-card/85 via-20% to-transparent",
  muted: "bg-linear-to-r from-muted via-muted/85 via-20% to-transparent",
  secondary: "bg-linear-to-r from-secondary via-secondary/85 via-20% to-transparent",
  accent: "bg-linear-to-r from-accent via-accent/85 via-20% to-transparent",
  primary: "bg-linear-to-r from-primary via-primary/85 via-20% to-transparent",
  "dnet-blue": "bg-linear-to-r from-dnet-blue via-dnet-blue/85 via-20% to-transparent",
  "dnet-orange": "bg-linear-to-r from-dnet-orange via-dnet-orange/85 via-20% to-transparent",
  "dnet-green": "bg-linear-to-r from-dnet-green via-dnet-green/85 via-20% to-transparent",
  "dnet-dark": "bg-linear-to-r from-dnet-dark via-dnet-dark/85 via-20% to-transparent",
};

const OVERLAY_SOLID_CLASSES: Record<string, string> = {
  none: "",
  background: "bg-background/70",
  card: "bg-card/70",
  muted: "bg-muted/70",
  secondary: "bg-secondary/70",
  accent: "bg-accent/70",
  primary: "bg-primary/70",
  "dnet-blue": "bg-dnet-blue/70",
  "dnet-orange": "bg-dnet-orange/70",
  "dnet-green": "bg-dnet-green/70",
  "dnet-dark": "bg-dnet-dark/70",
};

/**
 * Resolves a stored background color token to a tint overlay class, for tinting an
 * image so overlaid text stays readable.
 * @param token The color token stored on a block's props.
 * @param style Whether the tint fades left-to-right or covers the image evenly.
 * @returns The matching overlay class, or an empty string for no tint.
 */
export function getOverlayClasses(token: string, style: "none" | "gradient" | "solid") {
  if (style === "none") {
    return "";
  }

  const classes = style === "gradient" ? OVERLAY_GRADIENT_CLASSES : OVERLAY_SOLID_CLASSES;
  return classes[token] ?? "";
}
