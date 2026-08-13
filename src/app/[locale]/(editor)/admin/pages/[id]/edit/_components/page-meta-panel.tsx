"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";
import type { Page } from "@/generated/prisma/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ImageUploadField } from "@/features/pages/image-upload-field";
import { updatePageMeta } from "@/features/pages/api";
import { updatePageMetaSchema } from "@/features/pages/schema";
import type { UpdatePageMetaValues } from "@/features/pages/schema";

export function PageMetaPanel(props: { page: Page }) {
  const t = useTranslations("AdminPageEditorPage");

  const form = useForm<UpdatePageMetaValues>({
    resolver: zodResolver(updatePageMetaSchema),
    defaultValues: {
      title: props.page.title,
      metaTitle: props.page.metaTitle,
      metaDescription: props.page.metaDescription,
      ogImage: props.page.ogImage ?? "",
    },
  });

  const handleSubmit = form.handleSubmit(async (values) => {
    try {
      await updatePageMeta(props.page.id, values);
      toast.success(t("saved"));
    } catch {
      toast.error(t("save_error"));
    }
  });

  const ogImage = useWatch({ control: form.control, name: "ogImage" });

  return (
    <div className="flex flex-col gap-4 border-b border-border px-4 py-4">
      <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
        {t("meta_panel_title")}
      </p>
      {/* Not a <form>: this panel is rendered inside Puck's own fields form via
          `overrides.fields`, and nesting <form> inside <form> is invalid HTML. */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <Label htmlFor="meta-page-title">{t("field_page_title")}</Label>
          <Input id="meta-page-title" {...form.register("title")} />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="meta-title">{t("field_meta_title")}</Label>
          <Input id="meta-title" {...form.register("metaTitle")} />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="meta-description">
            {t("field_meta_description")}
          </Label>
          <Input id="meta-description" {...form.register("metaDescription")} />
        </div>
        <div className="flex flex-col gap-2">
          <Label>{t("field_og_image")}</Label>
          <ImageUploadField
            value={ogImage}
            onChange={(value) => form.setValue("ogImage", value)}
          />
        </div>
        <Button
          type="button"
          size="sm"
          disabled={form.formState.isSubmitting}
          onClick={handleSubmit}
        >
          {t("save_meta")}
        </Button>
      </div>
    </div>
  );
}
