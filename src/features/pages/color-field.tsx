"use client";

import { Check } from "lucide-react";
import type { ColorTokenOption } from "@/features/pages/color-tokens";
import { cn } from "@/lib/utils";

export function ColorField(props: {
  value: string | undefined;
  onChange: (value: string) => void;
  tokens: ColorTokenOption[];
  fallback: string;
}) {
  const value = props.value ?? props.fallback;

  return (
    <div className="flex flex-wrap gap-2">
      {props.tokens.map((token) => (
        <button
          key={token.value}
          type="button"
          title={token.label}
          aria-label={token.label}
          onClick={() => props.onChange(token.value)}
          className={cn(
            "flex size-7 items-center justify-center rounded-full border-2",
            value === token.value ? "border-foreground" : "border-border",
            !token.previewStyle &&
              "bg-[repeating-conic-gradient(#d4d4d8_0%_25%,transparent_0%_50%)] bg-[length:8px_8px]",
          )}
          style={token.previewStyle}
        >
          {value === token.value && (
            <Check className="size-3.5 text-white mix-blend-difference" />
          )}
        </button>
      ))}
    </div>
  );
}
