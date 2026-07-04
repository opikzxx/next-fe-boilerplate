"use client";

import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import { useTranslations } from "next-intl";
import { useState } from "react";

import { ModalConfirmation } from "@/components/shared/modal-confirmation";
import { cn } from "@/lib/utils";

function LogoutButton({ className }: { className?: string }) {
  const t = useTranslations("DashboardNav");
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={cn(
          "text-muted-foreground hover:bg-muted hover:text-foreground flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition-colors",
          className,
        )}
      >
        <LogOut className="size-5" />
        {t("logout")}
      </button>

      <ModalConfirmation
        open={open}
        onOpenChange={setOpen}
        title={t("logout_confirm_title")}
        description={t("logout_confirm_description")}
        confirmLabel={t("logout")}
        variant="destructive"
        onConfirm={() => signOut({ redirectTo: "/sign-in" })}
      />
    </>
  );
}

export { LogoutButton };
