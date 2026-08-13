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
    <details className="border-b border-border bg-muted/30 px-4 py-3">
      <summary className="cursor-pointer text-sm font-semibold">
        {t("meta_panel_title")}
      </summary>
      <form
        onSubmit={handleSubmit}
        className="mt-4 grid max-w-2xl gap-4 sm:grid-cols-2"
      >
        <div className="flex flex-col gap-2">
          <Label htmlFor="meta-page-title">{t("field_page_title")}</Label>
          <Input id="meta-page-title" {...form.register("title")} />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="meta-title">{t("field_meta_title")}</Label>
          <Input id="meta-title" {...form.register("metaTitle")} />
        </div>
        <div className="flex flex-col gap-2 sm:col-span-2">
          <Label htmlFor="meta-description">
            {t("field_meta_description")}
          </Label>
          <Input id="meta-description" {...form.register("metaDescription")} />
        </div>
        <div className="flex flex-col gap-2 sm:col-span-2">
          <Label>{t("field_og_image")}</Label>
          <ImageUploadField
            value={ogImage}
            onChange={(value) => form.setValue("ogImage", value)}
          />
        </div>
        <div className="flex items-center gap-3 sm:col-span-2">
          <Button type="submit" size="sm" disabled={form.formState.isSubmitting}>
            {t("save_meta")}
          </Button>
        </div>
      </form>
    </details>
  );
}
