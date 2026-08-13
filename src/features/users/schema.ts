import * as z from "zod";

type CreateUserValidationMessages = {
  name_required: string;
  email_invalid: string;
  password_min: (min: number) => string;
};

export function createUserSchema(messages: CreateUserValidationMessages) {
  return z.object({
    name: z.string().min(1, messages.name_required),
    email: z.email(messages.email_invalid),
    password: z.string().min(8, messages.password_min(8)),
    role: z.enum(["ADMIN", "CREATOR"]),
  });
}

export const updateUserRoleSchema = z.object({
  role: z.enum(["ADMIN", "CREATOR"]),
});

export type CreateUserValues = z.infer<ReturnType<typeof createUserSchema>>;
export type UpdateUserRoleValues = z.infer<typeof updateUserRoleSchema>;
