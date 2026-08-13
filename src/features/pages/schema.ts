import * as z from "zod";
import { slugPattern } from "@/lib/slug";

export const SLUG_TAKEN_ERROR = "SLUG_TAKEN";

type CreatePageValidationMessages = {
  title_required: string;
  slug_invalid: string;
};

export function createPageSchema(messages: CreatePageValidationMessages) {
  return z.object({
    title: z.string().min(1, messages.title_required),
    slug: z
      .string()
      .min(1, messages.slug_invalid)
      .regex(slugPattern, messages.slug_invalid),
  });
}

export const updatePageMetaSchema = z.object({
  title: z.string().min(1),
  metaTitle: z.string().min(1),
  metaDescription: z.string().min(1),
  ogImage: z.string().optional(),
});

export type CreatePageValues = z.infer<ReturnType<typeof createPageSchema>>;
export type UpdatePageMetaValues = z.infer<typeof updatePageMetaSchema>;
