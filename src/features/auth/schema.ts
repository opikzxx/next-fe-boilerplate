import * as z from "zod";

type AuthValidationMessages = {
  email_invalid: string;
  password_min: (min: number) => string;
};

export function createSignInSchema(messages: AuthValidationMessages) {
  return z.object({
    email: z.email(messages.email_invalid),
    password: z.string().min(8, messages.password_min(8)),
    rememberMe: z.boolean(),
  });
}

export type SignInValues = z.infer<ReturnType<typeof createSignInSchema>>;
