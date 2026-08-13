import * as z from "zod";
import { routing } from "@/lib/i18n-routing";

type CreateFaqValidationMessages = {
  question_required: string;
};

export function createFaqSchema(messages: CreateFaqValidationMessages) {
  return z.object({
    question: z.string().min(1, messages.question_required),
    locale: z
      .string()
      .refine((value) => routing.locales.includes(value), "Invalid locale"),
  });
}

export const updateFaqSchema = z.object({
  question: z.string().min(1),
  shortAnswer: z.string().min(1),
  answer: z.string().min(1),
  category: z.string().min(1),
  order: z.number().int(),
});

export type CreateFaqValues = z.infer<ReturnType<typeof createFaqSchema>>;
export type UpdateFaqValues = z.infer<typeof updateFaqSchema>;
