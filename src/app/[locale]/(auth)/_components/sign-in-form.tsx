"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { AuthCard } from "@/app/[locale]/(auth)/_components/auth-card";
import { PasswordInput } from "@/components/ui/password-input";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getPostSignInPath } from "@/features/auth/navigation";
import { createSignInSchema } from "@/features/auth/schema";
import type { SignInValues } from "@/features/auth/schema";
import { Link, useRouter } from "@/lib/i18n-navigation";

export function SignInForm() {
  const t = useTranslations("SignInForm");
  const tValidation = useTranslations("AuthValidation");
  const router = useRouter();
  const [hasAuthError, setHasAuthError] = useState(false);

  const schema = createSignInSchema({
    email_invalid: tValidation("email_invalid"),
    password_min: (min) => tValidation("password_min", { min }),
  });

  const form = useForm<SignInValues>({
    resolver: zodResolver(schema),
    defaultValues: { email: "", password: "", rememberMe: false },
  });

  const handleSubmit = form.handleSubmit(async (values) => {
    setHasAuthError(false);

    const result = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
    });

    if (result?.error) {
      setHasAuthError(true);
      return;
    }

    router.push(await getPostSignInPath());
  });

  return (
    <AuthCard title={t("title")}>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-5 mt-6"
        noValidate
      >
        {/* EMAIL INPUT */}
        <div className="flex flex-col gap-2">
          <Label
            htmlFor="sign-in-email"
            className="text-sm font-semibold text-slate-800 dark:text-slate-200"
          >
            {t("email_label")}
          </Label>
          <Input
            id="sign-in-email"
            type="email"
            autoComplete="email"
            placeholder={t("email_placeholder")}
            aria-invalid={!!form.formState.errors.email}
            {...form.register("email")}
            // Menambahkan background soft, border subtle, dan padding agar mirip mockup
            className="h-12 bg-slate-50/80 dark:bg-slate-900/50 border-slate-100 rounded-xl px-4 text-sm focus-visible:ring-indigo-500"
          />
          {form.formState.errors.email ? (
            <p className="text-destructive text-xs mt-1">
              {form.formState.errors.email.message}
            </p>
          ) : null}
        </div>

        {/* PASSWORD INPUT */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <Label
              htmlFor="sign-in-password"
              className="text-sm font-semibold text-slate-800 dark:text-slate-200"
            >
              {t("password_label")}
            </Label>
            <Link
              href="/forgot-password"
              className="text-xs font-semibold text-indigo-600 hover:text-indigo-500 hover:underline transition-colors"
            >
              {t("forgot_password")}
            </Link>
          </div>
          <div className="relative">
            <PasswordInput
              id="sign-in-password"
              autoComplete="current-password"
              placeholder={t("password_placeholder")}
              aria-invalid={!!form.formState.errors.password}
              showPasswordLabel={t("show_password")}
              hidePasswordLabel={t("hide_password")}
              {...form.register("password")}
              // Diterapkan jika PasswordInput mendukung custom className atau wrapper
              className="h-12 bg-slate-50/80 dark:bg-slate-900/50 border-slate-100 rounded-xl px-4 text-sm focus-visible:ring-indigo-500"
            />
          </div>
          {form.formState.errors.password ? (
            <p className="text-destructive text-xs mt-1">
              {form.formState.errors.password.message}
            </p>
          ) : null}
        </div>

        {hasAuthError ? (
          <p className="text-destructive text-sm">
            {tValidation("sign_in_failed")}
          </p>
        ) : null}

        {/* SUBMIT BUTTON */}
        <Button
          type="submit"
          size="lg"
          className="h-12 w-full rounded-xl text-sm font-bold uppercase bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-200 dark:shadow-none transition-all mt-2"
          disabled={form.formState.isSubmitting}
        >
          {t("submit_button")}
        </Button>
      </form>
    </AuthCard>
  );
}
