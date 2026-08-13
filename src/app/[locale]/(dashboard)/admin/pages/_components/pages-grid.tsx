"use client";

import {
  Clock,
  Eye,
  EyeOff,
  ExternalLink,
  Globe,
  MoreVertical,
  Pencil,
  Trash2,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import type { Page } from "@/generated/prisma/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ModalConfirmation } from "@/components/shared/modal-confirmation";
import { deletePage, publishPage, unpublishPage } from "@/features/pages/api";
import { Link, useRouter } from "@/lib/i18n-navigation";
import { cn } from "@/lib/utils";
import { getI18nPath } from "@/utils/helpers";

export function PagesGrid(props: { pages: Page[] }) {
  const t = useTranslations("AdminPagesPage");
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [pageIdToDelete, setPageIdToDelete] = useState<string | null>(null);

  if (props.pages.length === 0) {
    return (
      <div className="flex flex-col items-center gap-1 rounded-2xl border border-dashed border-border py-16 text-center">
        <p className="font-semibold">{t("empty_title")}</p>
        <p className="text-sm text-muted-foreground">{t("empty_description")}</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-1">
        {props.pages.map((page) => (
          <Card key={page.id} className="gap-4 py-5 transition-shadow hover:shadow-md">
            <CardHeader className="gap-2 px-5">
              <div className="flex items-start justify-between gap-2">
                <h2 className="line-clamp-2 text-lg font-bold">{page.title}</h2>

                <div className="flex shrink-0 items-center gap-2">
                  <span
                    className={cn(
                      "rounded-full px-2.5 py-1 text-xs font-semibold",
                      page.status === "PUBLISHED"
                        ? "bg-success/10 text-success"
                        : "bg-warning/10 text-warning",
                    )}
                  >
                    {page.status === "PUBLISHED"
                      ? t("status_published")
                      : t("status_draft")}
                  </span>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon-sm"
                        aria-label={t("column_actions")}
                      >
                        <MoreVertical />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      {page.status === "PUBLISHED" ? (
                        <DropdownMenuItem asChild>
                          <a
                            href={getI18nPath(`/${page.slug}`, page.locale)}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <ExternalLink />
                            {t("action_view")}
                          </a>
                        </DropdownMenuItem>
                      ) : null}

                      <DropdownMenuItem asChild>
                        <Link href={`/admin/pages/${page.id}/edit`}>
                          <Pencil />
                          {t("action_edit")}
                        </Link>
                      </DropdownMenuItem>

                      <DropdownMenuItem
                        disabled={isPending}
                        onSelect={() =>
                          startTransition(async () => {
                            try {
                              if (page.status === "PUBLISHED") {
                                await unpublishPage(page.id);
                                toast.success(t("toast_unpublished"));
                              } else {
                                await publishPage(page.id);
                                toast.success(t("toast_published"));
                              }
                              router.refresh();
                            } catch {
                              toast.error(t("toast_publish_error"));
                            }
                          })
                        }
                      >
                        {page.status === "PUBLISHED" ? <EyeOff /> : <Eye />}
                        {page.status === "PUBLISHED"
                          ? t("action_unpublish")
                          : t("action_publish")}
                      </DropdownMenuItem>

                      <DropdownMenuSeparator />

                      <DropdownMenuItem
                        variant="destructive"
                        onSelect={() => setPageIdToDelete(page.id)}
                      >
                        <Trash2 />
                        {t("action_delete")}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              <p className="truncate text-sm text-muted-foreground">
                /{page.slug}
              </p>
            </CardHeader>

            <CardContent className="flex flex-1 items-center gap-3 px-5 text-xs text-muted-foreground">
              <span className="flex items-center gap-1 rounded-full bg-muted px-2 py-1 font-medium uppercase">
                <Globe className="size-3.5" />
                {page.locale}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="size-3.5" />
                {new Intl.DateTimeFormat("id-ID", {
                  dateStyle: "medium",
                  timeStyle: "short",
                }).format(page.updatedAt)}
              </span>
            </CardContent>
          </Card>
        ))}
      </div>

      <ModalConfirmation
        open={pageIdToDelete !== null}
        onOpenChange={(open) => !open && setPageIdToDelete(null)}
        title={t("delete_confirm_title")}
        description={t("delete_confirm_description")}
        confirmLabel={t("action_delete")}
        variant="destructive"
        isLoading={isPending}
        onConfirm={() =>
          startTransition(async () => {
            if (!pageIdToDelete) {
              return;
            }
            try {
              await deletePage(pageIdToDelete);
              setPageIdToDelete(null);
              toast.success(t("toast_deleted"));
              router.refresh();
            } catch {
              setPageIdToDelete(null);
              toast.error(t("toast_delete_error"));
            }
          })
        }
      />
    </>
  );
}
