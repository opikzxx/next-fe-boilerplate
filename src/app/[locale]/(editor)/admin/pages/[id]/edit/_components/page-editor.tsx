"use client";

import "@measured/puck/puck.css";
import { Puck } from "@measured/puck";
import { ArrowLeft, ExternalLink, EyeOff } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRef, useState } from "react";
import { toast } from "sonner";
import type { Page } from "@/generated/prisma/client";
import { Button } from "@/components/ui/button";
import {
  publishPage,
  unpublishPage,
  updatePageContent,
} from "@/features/pages/api";
import type { PuckData } from "@/features/pages/puck-config";
import { puckConfig } from "@/features/pages/puck-config";
import { Link } from "@/lib/i18n-navigation";
import { cn } from "@/lib/utils";
import { getI18nPath } from "@/utils/helpers";
import { PageMetaPanel } from "./page-meta-panel";

const AUTOSAVE_DELAY_MS = 1500;

export function PageEditor(props: { page: Page }) {
  const t = useTranslations("AdminPageEditorPage");
  const [status, setStatus] = useState(props.page.status);
  const [isPublishing, setIsPublishing] = useState(false);
  const autosaveTimer = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  );

  const handleChange = (data: PuckData) => {
    clearTimeout(autosaveTimer.current);
    autosaveTimer.current = setTimeout(async () => {
      try {
        await updatePageContent(props.page.id, data);
      } catch {
        toast.error(t("toast_autosave_error"));
      }
    }, AUTOSAVE_DELAY_MS);
  };

  const handlePublish = async (data: PuckData) => {
    setIsPublishing(true);
    try {
      await updatePageContent(props.page.id, data);
      await publishPage(props.page.id);
      setStatus("PUBLISHED");
      toast.success(t("toast_published"));
    } catch {
      toast.error(t("toast_action_error"));
    } finally {
      setIsPublishing(false);
    }
  };

  const handleUnpublish = async () => {
    setIsPublishing(true);
    try {
      await unpublishPage(props.page.id);
      setStatus("DRAFT");
      toast.success(t("toast_unpublished"));
    } catch {
      toast.error(t("toast_action_error"));
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <div className="h-svh">
      <Puck
        config={puckConfig}
        // Puck's `data` shape isn't statically known here — it's read back from the DB's untyped Json column.
        data={props.page.puckData as PuckData}
        onChange={handleChange}
        onPublish={handlePublish}
        headerTitle={props.page.title}
        headerPath={`/${props.page.slug}`}
        overrides={{
          header: ({ children }) => (
            <div
              style={{ gridArea: "header" }}
              className="flex items-center gap-2"
            >
              <Button
                type="button"
                variant="ghost"
                size="sm"
                asChild
                className="mx-2 shrink-0"
              >
                <Link href="/admin/pages">
                  <ArrowLeft />
                  {t("back_to_pages")}
                </Link>
              </Button>
              <div className="min-w-0 flex-1">{children}</div>
            </div>
          ),
          headerActions: ({ children }) => (
            <>
              <span
                className={cn(
                  "rounded-full px-2.5 py-1 text-xs font-semibold",
                  status === "PUBLISHED"
                    ? "bg-success/10 text-success"
                    : "bg-warning/10 text-warning",
                )}
              >
                {status === "PUBLISHED"
                  ? t("status_published")
                  : t("status_draft")}
              </span>

              {status === "PUBLISHED" ? (
                <>
                  <Button type="button" variant="ghost" size="sm" asChild>
                    <a
                      href={getI18nPath(
                        `/${props.page.slug}`,
                        props.page.locale,
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink />
                      {t("view_page")}
                    </a>
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    disabled={isPublishing}
                    onClick={handleUnpublish}
                  >
                    <EyeOff />
                    {t("unpublish")}
                  </Button>
                </>
              ) : null}

              <div className="h-5 w-px bg-border" />

              {children}
            </>
          ),
          fields: ({ children, itemSelector }) =>
            itemSelector ? (
              <>{children}</>
            ) : (
              <>
                <PageMetaPanel page={props.page} />
                {children}
              </>
            ),
        }}
      />
    </div>
  );
}
