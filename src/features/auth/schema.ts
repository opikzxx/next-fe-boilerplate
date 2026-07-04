import * as z from "zod";

type AuthValidationMessages = {
  email_invalid: string;
  password_min: (min: number) => string;
  name_required?: string;
  confirm_password_required?: string;
  password_mismatch?: string;
};

export function createSignInSchema(messages: AuthValidationMessages) {
  return z.object({
    email: z.email(messages.email_invalid),
    password: z.string().min(8, messages.password_min(8)),
    rememberMe: z.boolean(),
  });
}

export function createSignUpSchema(messages: Required<AuthValidationMessages>) {
  return z
    .object({
      name: z.string().min(1, messages.name_required),
      email: z.email(messages.email_invalid),
      password: z.string().min(8, messages.password_min(8)),
      confirmPassword: z.string().min(1, messages.confirm_password_required),
    })
    .refine((values) => values.password === values.confirmPassword, {
      message: messages.password_mismatch,
      path: ["confirmPassword"],
    });
}

export type SignInValues = z.infer<ReturnType<typeof createSignInSchema>>;
export type SignUpValues = z.infer<ReturnType<typeof createSignUpSchema>>;

export const authDataSchema = z.object({
  access_token: z.string(),
  refresh_token: z.string(),
  token_type: z.string(),
  expires_in: z.number(),
  user: z.object({
    id: z.number(),
    name: z.string(),
    email: z.email(),
    roles: z.array(z.string()),
    created_at: z.string(),
    updated_at: z.string(),
  }),
});

export type AuthData = z.infer<typeof authDataSchema>;
