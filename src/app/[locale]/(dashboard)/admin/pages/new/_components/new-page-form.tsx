"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createPage } from "@/features/pages/api";
import { createPageSchema } from "@/features/pages/schema";
import type { CreatePageValues } from "@/features/pages/schema";
import { routing } from "@/lib/i18n-routing";
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
      locale: routing.defaultLocale,
    },
  });

  const handleSubmit = form.handleSubmit(async (values) => {
    try {
      const page = await createPage(values);
      toast.success(t("toast_created"));
      router.push(`/admin/pages/${page.id}/edit`);
    } catch {
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

      <div className="flex flex-col gap-2">
        <Label htmlFor="new-page-locale">{t("field_locale")}</Label>
        <select
          id="new-page-locale"
          className="h-12 w-full rounded-xl border border-transparent bg-black/[0.035] px-4 text-sm outline-none dark:bg-white/5"
          {...form.register("locale")}
        >
          {routing.locales.map((locale) => (
            <option key={locale} value={locale}>
              {t(locale === "en" ? "locale_en" : "locale_id")}
            </option>
          ))}
        </select>
      </div>

      <Button type="submit" disabled={form.formState.isSubmitting}>
        {t("submit")}
      </Button>
    </form>
  );
}
