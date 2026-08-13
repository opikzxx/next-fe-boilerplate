"use client";

import type { ToasterProps } from "sonner";
import { Toaster as SonnerToaster } from "sonner";

function Toaster(props: ToasterProps) {
  return (
    <SonnerToaster
      theme="light"
      className="toaster group"
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
          "--border-radius": "var(--radius-xl)",
        } as React.CSSProperties
      }
      toastOptions={{
        classNames: {
          toast: "shadow-lg [&[data-type=error]_[data-icon]_svg]:text-destructive",
          title: "font-semibold",
          description: "!text-muted-foreground",
          actionButton: "!bg-secondary !text-secondary-foreground",
          cancelButton: "!bg-muted !text-muted-foreground",
          closeButton: "!border-border !bg-popover !text-muted-foreground",
        },
      }}
      {...props}
    />
  );
}

export { Toaster };
