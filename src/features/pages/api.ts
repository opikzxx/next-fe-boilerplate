"use server";

import type { Prisma } from "@/generated/prisma/client";
import { requireAdmin } from "@/features/auth/guards";
import { db } from "@/lib/db";
import type {
  CreatePageValues,
  UpdatePageMetaValues,
} from "@/features/pages/schema";
import { createPageSchema, updatePageMetaSchema } from "@/features/pages/schema";

export async function listPages() {
  await requireAdmin();

  return db.page.findMany({ orderBy: { updatedAt: "desc" } });
}

export async function getPage(id: string) {
  await requireAdmin();

  return db.page.findUnique({ where: { id } });
}

export async function getPublishedPageBySlug(slug: string, locale: string) {
  return db.page.findFirst({
    where: { slug, locale, status: "PUBLISHED" },
  });
}

export async function getPageTranslations(translationGroupId: string) {
  return db.page.findMany({
    where: { translationGroupId, status: "PUBLISHED" },
  });
}

export async function listPublishedPages() {
  return db.page.findMany({ where: { status: "PUBLISHED" } });
}

export async function createPage(values: CreatePageValues) {
  await requireAdmin();

  const parsed = createPageSchema({
    title_required: "Title is required",
    slug_invalid: "Invalid slug",
  }).parse(values);

  return db.page.create({
    data: {
      title: parsed.title,
      slug: parsed.slug,
      locale: parsed.locale,
      translationGroupId: crypto.randomUUID(),
      metaTitle: parsed.title,
      metaDescription: "",
      puckData: {},
    },
  });
}

export async function updatePageContent(id: string, puckData: Prisma.InputJsonValue) {
  await requireAdmin();

  return db.page.update({ where: { id }, data: { puckData } });
}

export async function updatePageMeta(id: string, values: UpdatePageMetaValues) {
  await requireAdmin();

  const parsed = updatePageMetaSchema.parse(values);

  return db.page.update({ where: { id }, data: parsed });
}

export async function publishPage(id: string) {
  await requireAdmin();

  return db.page.update({
    where: { id },
    data: { status: "PUBLISHED", publishedAt: new Date() },
  });
}

export async function unpublishPage(id: string) {
  await requireAdmin();

  return db.page.update({ where: { id }, data: { status: "DRAFT" } });
}

export async function deletePage(id: string) {
  await requireAdmin();

  await db.page.delete({ where: { id } });
}
