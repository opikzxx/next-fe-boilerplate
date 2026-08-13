"use server";

import type { CreateFaqValues, UpdateFaqValues } from "@/features/faq/schema";
import { createFaqSchema, updateFaqSchema } from "@/features/faq/schema";
import { requireAdmin } from "@/features/auth/guards";
import { db } from "@/lib/db";

export async function listFaqs() {
  await requireAdmin();

  return db.faq.findMany({ orderBy: [{ category: "asc" }, { order: "asc" }] });
}

export async function getFaq(id: string) {
  await requireAdmin();

  return db.faq.findUnique({ where: { id } });
}

export async function listPublishedFaqs(locale: string) {
  return db.faq.findMany({
    where: { locale, status: "PUBLISHED" },
    orderBy: [{ category: "asc" }, { order: "asc" }],
  });
}

export async function createFaq(values: CreateFaqValues) {
  await requireAdmin();

  const parsed = createFaqSchema({
    question_required: "Question is required",
  }).parse(values);

  return db.faq.create({
    data: {
      question: parsed.question,
      locale: parsed.locale,
      translationGroupId: crypto.randomUUID(),
      shortAnswer: "",
      answer: "",
      category: "general",
    },
  });
}

export async function updateFaq(id: string, values: UpdateFaqValues) {
  await requireAdmin();

  const parsed = updateFaqSchema.parse(values);

  return db.faq.update({ where: { id }, data: parsed });
}

export async function publishFaq(id: string) {
  await requireAdmin();

  return db.faq.update({ where: { id }, data: { status: "PUBLISHED" } });
}

export async function unpublishFaq(id: string) {
  await requireAdmin();

  return db.faq.update({ where: { id }, data: { status: "DRAFT" } });
}

export async function deleteFaq(id: string) {
  await requireAdmin();

  await db.faq.delete({ where: { id } });
}
