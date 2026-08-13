"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PasswordInput } from "@/components/ui/password-input";
import { createUser } from "@/features/users/api";
import { createUserSchema } from "@/features/users/schema";
import type { CreateUserValues } from "@/features/users/schema";
import { useRouter } from "@/lib/i18n-navigation";

export function NewUserForm() {
  const t = useTranslations("AdminUserNewPage");
  const router = useRouter();
  const [submitError, setSubmitError] = useState(false);

  const schema = createUserSchema({
    name_required: t("error_name_required"),
    email_invalid: t("error_email_invalid"),
    password_min: (min) => t("error_password_min", { min }),
  });

  const form = useForm<CreateUserValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", email: "", password: "", role: "CREATOR" },
  });

  const handleSubmit = form.handleSubmit(async (values) => {
    setSubmitError(false);

    try {
      await createUser(values);
      router.push("/admin/users");
    } catch {
      setSubmitError(true);
    }
  });

  return (
    <form onSubmit={handleSubmit} className="flex max-w-lg flex-col gap-5">
      <div className="flex flex-col gap-2">
        <Label htmlFor="new-user-name">{t("field_name")}</Label>
        <Input
          id="new-user-name"
          placeholder={t("field_name_placeholder")}
          aria-invalid={!!form.formState.errors.name}
          {...form.register("name")}
        />
        {form.formState.errors.name ? (
          <p className="text-xs text-destructive">
            {form.formState.errors.name.message}
          </p>
        ) : null}
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="new-user-email">{t("field_email")}</Label>
        <Input
          id="new-user-email"
          type="email"
          placeholder={t("field_email_placeholder")}
          aria-invalid={!!form.formState.errors.email}
          {...form.register("email")}
        />
        {form.formState.errors.email ? (
          <p className="text-xs text-destructive">
            {form.formState.errors.email.message}
          </p>
        ) : null}
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="new-user-password">{t("field_password")}</Label>
        <PasswordInput
          id="new-user-password"
          placeholder={t("field_password_placeholder")}
          aria-invalid={!!form.formState.errors.password}
          showPasswordLabel={t("show_password")}
          hidePasswordLabel={t("hide_password")}
          {...form.register("password")}
        />
        {form.formState.errors.password ? (
          <p className="text-xs text-destructive">
            {form.formState.errors.password.message}
          </p>
        ) : null}
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="new-user-role">{t("field_role")}</Label>
        <select
          id="new-user-role"
          className="h-12 w-full rounded-xl border border-transparent bg-black/[0.035] px-4 text-sm outline-none dark:bg-white/5"
          {...form.register("role")}
        >
          <option value="CREATOR">{t("role_creator")}</option>
          <option value="ADMIN">{t("role_admin")}</option>
        </select>
      </div>

      {submitError ? (
        <p className="text-sm text-destructive">{t("error_generic")}</p>
      ) : null}

      <Button type="submit" disabled={form.formState.isSubmitting}>
        {t("submit")}
      </Button>
    </form>
  );
}
