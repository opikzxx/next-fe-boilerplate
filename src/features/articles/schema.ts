import * as z from "zod";
import { routing } from "@/lib/i18n-routing";
import { slugPattern } from "@/lib/slug";

type CreateArticleValidationMessages = {
  title_required: string;
  slug_invalid: string;
};

export function createArticleSchema(messages: CreateArticleValidationMessages) {
  return z.object({
    title: z.string().min(1, messages.title_required),
    slug: z
      .string()
      .min(1, messages.slug_invalid)
      .regex(slugPattern, messages.slug_invalid),
    locale: z
      .string()
      .refine((value) => routing.locales.includes(value), "Invalid locale"),
    category: z.enum(["NEWS", "PRESS_RELEASE"]),
  });
}

export const updateArticleContentSchema = z.object({
  excerpt: z.string().min(1),
  content: z.string().min(1),
  coverImage: z.string().optional(),
});

export const updateArticleMetaSchema = z.object({
  title: z.string().min(1),
  category: z.enum(["NEWS", "PRESS_RELEASE"]),
  metaTitle: z.string().min(1),
  metaDescription: z.string().min(1),
});

export type CreateArticleValues = z.infer<ReturnType<typeof createArticleSchema>>;
export type UpdateArticleContentValues = z.infer<typeof updateArticleContentSchema>;
export type UpdateArticleMetaValues = z.infer<typeof updateArticleMetaSchema>;
