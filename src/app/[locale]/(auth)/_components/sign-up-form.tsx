"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";

import { AuthCard } from "@/app/[locale]/(auth)/_components/auth-card";
import { PasswordInput } from "@/components/ui/password-input";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSignUp } from "@/features/auth/hooks";
import { getPostSignInPath } from "@/features/auth/navigation";
import { createSignUpSchema } from "@/features/auth/schema";
import type { SignUpValues } from "@/features/auth/schema";
import { useRouter } from "@/lib/i18n-navigation";

export function SignUpForm() {
  const t = useTranslations("SignUpForm");
  const tValidation = useTranslations("AuthValidation");
  const router = useRouter();
  const signUp = useSignUp();

  const schema = createSignUpSchema({
    name_required: tValidation("name_required"),
    email_invalid: tValidation("email_invalid"),
    password_min: (min) => tValidation("password_min", { min }),
    confirm_password_required: tValidation("confirm_password_required"),
    password_mismatch: tValidation("password_mismatch"),
  });

  const form = useForm<SignUpValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", email: "", password: "", confirmPassword: "" },
  });

  const handleSubmit = form.handleSubmit(async (values) => {
    try {
      await signUp.mutateAsync({
        name: values.name,
        email: values.email,
        password: values.password,
      });
    } catch {
      return;
    }

    const result = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
    });

    if (result?.error) {
      router.push("/sign-in");
      return;
    }

    router.push(await getPostSignInPath());
  });

  return (
    <AuthCard
      title={t("title")}
      footerText={t("footer_text")}
      footerLinkLabel={t("footer_link")}
      footerLinkHref="/sign-in"
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
        <div className="flex flex-col gap-2">
          <Label htmlFor="sign-up-name" className="text-base font-semibold">
            {t("name_label")}
          </Label>
          <Input
            id="sign-up-name"
            autoComplete="name"
            placeholder={t("name_placeholder")}
            aria-invalid={!!form.formState.errors.name}
            {...form.register("name")}
          />
          {form.formState.errors.name ? (
            <p className="text-destructive text-sm">
              {form.formState.errors.name.message}
            </p>
          ) : null}
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="sign-up-email" className="text-base font-semibold">
            {t("email_label")}
          </Label>
          <Input
            id="sign-up-email"
            type="email"
            autoComplete="email"
            placeholder={t("email_placeholder")}
            aria-invalid={!!form.formState.errors.email}
            {...form.register("email")}
          />
          {form.formState.errors.email ? (
            <p className="text-destructive text-sm">
              {form.formState.errors.email.message}
            </p>
          ) : null}
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="sign-up-password" className="text-base font-semibold">
            {t("password_label")}
          </Label>
          <PasswordInput
            id="sign-up-password"
            autoComplete="new-password"
            placeholder={t("password_placeholder")}
            aria-invalid={!!form.formState.errors.password}
            showPasswordLabel={t("show_password")}
            hidePasswordLabel={t("hide_password")}
            {...form.register("password")}
          />
          {form.formState.errors.password ? (
            <p className="text-destructive text-sm">
              {form.formState.errors.password.message}
            </p>
          ) : null}
        </div>

        <div className="flex flex-col gap-2">
          <Label
            htmlFor="sign-up-confirm-password"
            className="text-base font-semibold"
          >
            {t("confirm_password_label")}
          </Label>
          <PasswordInput
            id="sign-up-confirm-password"
            autoComplete="new-password"
            placeholder={t("confirm_password_placeholder")}
            aria-invalid={!!form.formState.errors.confirmPassword}
            showPasswordLabel={t("show_password")}
            hidePasswordLabel={t("hide_password")}
            {...form.register("confirmPassword")}
          />
          {form.formState.errors.confirmPassword ? (
            <p className="text-destructive text-sm">
              {form.formState.errors.confirmPassword.message}
            </p>
          ) : null}
        </div>

        {signUp.isError ? (
          <p className="text-destructive text-sm">
            {tValidation("sign_up_failed")}
          </p>
        ) : null}

        <Button
          type="submit"
          size="lg"
          className="h-12 w-full rounded-xl text-sm font-bold uppercase bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-200 dark:shadow-none transition-all mt-2"
          disabled={form.formState.isSubmitting || signUp.isPending}
        >
          {t("submit_button")}
        </Button>
      </form>
    </AuthCard>
  );
}
