"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createPage } from "@/features/pages/api";
import { createPageSchema, SLUG_TAKEN_ERROR } from "@/features/pages/schema";
import type { CreatePageValues } from "@/features/pages/schema";
import { useRouter } from "@/lib/i18n-navigation";

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function NewPageForm() {
  const t = useTranslations("AdminPageNewPage");
  const locale = useLocale();
  const router = useRouter();
  const [isSlugTouched, setIsSlugTouched] = useState(false);

  const schema = createPageSchema({
    title_required: t("error_title_required"),
    slug_invalid: t("error_slug_invalid"),
  });

  const form = useForm<CreatePageValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
      slug: "",
    },
  });

  const handleSubmit = form.handleSubmit(async (values) => {
    try {
      const pages = await createPage(values);
      const page = pages.find((created) => created.locale === locale) ?? pages[0];
      toast.success(t("toast_created"));
      router.push(`/admin/pages/${page.id}/edit`);
    } catch (error) {
      if (error instanceof Error && error.message === SLUG_TAKEN_ERROR) {
        form.setError("slug", { message: t("error_slug_taken") });
        return;
      }
      toast.error(t("error_generic"));
    }
  });

  return (
    <form onSubmit={handleSubmit} className="flex max-w-lg flex-col gap-5">
      <div className="flex flex-col gap-2">
        <Label htmlFor="new-page-title">{t("field_title")}</Label>
        <Input
          id="new-page-title"
          placeholder={t("field_title_placeholder")}
          aria-invalid={!!form.formState.errors.title}
          {...form.register("title", {
            onChange: (event) => {
              if (!isSlugTouched) {
                form.setValue("slug", slugify(event.target.value));
              }
            },
          })}
        />
        {form.formState.errors.title ? (
          <p className="text-xs text-destructive">
            {form.formState.errors.title.message}
          </p>
        ) : null}
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="new-page-slug">{t("field_slug")}</Label>
        <Input
          id="new-page-slug"
          aria-invalid={!!form.formState.errors.slug}
          {...form.register("slug", {
            onChange: () => setIsSlugTouched(true),
          })}
        />
        <p className="text-xs text-muted-foreground">{t("field_slug_hint")}</p>
        {form.formState.errors.slug ? (
          <p className="text-xs text-destructive">
            {form.formState.errors.slug.message}
          </p>
        ) : null}
      </div>

      <p className="text-xs text-muted-foreground">{t("dual_locale_hint")}</p>

      <Button type="submit" disabled={form.formState.isSubmitting}>
        {t("submit")}
      </Button>
    </form>
  );
}
