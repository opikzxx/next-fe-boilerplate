"use client";

import "@measured/puck/puck.css";
import { Puck } from "@measured/puck";
import { ArrowLeft } from "lucide-react";
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
    <div className="flex h-svh flex-col">
      <div className="flex items-center justify-between gap-4 border-b border-border px-4 py-2">
        <Link
          href="/admin/pages"
          className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          {t("back_to_pages")}
        </Link>
        <div className="flex items-center gap-3">
          <span className="text-xs font-medium text-muted-foreground">
            {status === "PUBLISHED" ? t("status_published") : t("status_draft")}
          </span>
          {status === "PUBLISHED" && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={isPublishing}
              onClick={handleUnpublish}
            >
              {t("unpublish")}
            </Button>
          )}
        </div>
      </div>

      <PageMetaPanel page={props.page} />

      <div className="min-h-0 flex-1">
        <Puck
          config={puckConfig}
          // Puck's `data` shape isn't statically known here — it's read back from the DB's untyped Json column.
          data={props.page.puckData as PuckData}
          onChange={handleChange}
          onPublish={handlePublish}
          headerTitle={props.page.title}
        />
      </div>
    </div>
  );
}
