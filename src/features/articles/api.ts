"use server";

import type {
  CreateArticleValues,
  UpdateArticleContentValues,
  UpdateArticleMetaValues,
} from "@/features/articles/schema";
import {
  createArticleSchema,
  updateArticleContentSchema,
  updateArticleMetaSchema,
} from "@/features/articles/schema";
import { requireAdmin, requireCreatorOrAdmin } from "@/features/auth/guards";
import { db } from "@/lib/db";

/**
 * Loads an article and throws unless the current user is an Admin or the article's author.
 * @param id The article's id.
 * @throws When the article does not exist, or the user is a Creator who does not own it.
 */
async function requireOwnArticle(id: string) {
  const session = await requireCreatorOrAdmin();
  const article = await db.article.findUniqueOrThrow({ where: { id } });

  if (!session.user.roles.includes("admin") && article.authorId !== session.user.id) {
    throw new Error("Unauthorized");
  }

  return { session, article };
}

export async function listArticles() {
  const session = await requireCreatorOrAdmin();

  return db.article.findMany({
    where: session.user.roles.includes("admin")
      ? {}
      : { authorId: session.user.id },
    include: { author: { select: { name: true } } },
    orderBy: { updatedAt: "desc" },
  });
}

export async function getArticle(id: string) {
  const { article } = await requireOwnArticle(id);

  return article;
}

export async function getPublishedArticleBySlug(slug: string, locale: string) {
  return db.article.findFirst({
    where: { slug, locale, status: "PUBLISHED" },
    include: { author: { select: { name: true } } },
  });
}

export async function getArticleTranslations(translationGroupId: string) {
  return db.article.findMany({
    where: { translationGroupId, status: "PUBLISHED" },
  });
}

export async function listPublishedArticles() {
  return db.article.findMany({ where: { status: "PUBLISHED" } });
}

export async function createArticle(values: CreateArticleValues) {
  const session = await requireCreatorOrAdmin();

  const parsed = createArticleSchema({
    title_required: "Title is required",
    slug_invalid: "Invalid slug",
  }).parse(values);

  return db.article.create({
    data: {
      title: parsed.title,
      slug: parsed.slug,
      locale: parsed.locale,
      category: parsed.category,
      translationGroupId: crypto.randomUUID(),
      authorId: session.user.id,
      excerpt: "",
      content: "",
      metaTitle: parsed.title,
      metaDescription: "",
    },
  });
}

export async function updateArticleContent(
  id: string,
  values: UpdateArticleContentValues,
) {
  await requireOwnArticle(id);

  const parsed = updateArticleContentSchema.parse(values);

  return db.article.update({ where: { id }, data: parsed });
}

export async function updateArticleMeta(id: string, values: UpdateArticleMetaValues) {
  await requireOwnArticle(id);

  const parsed = updateArticleMetaSchema.parse(values);

  return db.article.update({ where: { id }, data: parsed });
}

export async function publishArticle(id: string) {
  await requireOwnArticle(id);

  return db.article.update({
    where: { id },
    data: { status: "PUBLISHED", publishedAt: new Date() },
  });
}

export async function unpublishArticle(id: string) {
  await requireOwnArticle(id);

  return db.article.update({ where: { id }, data: { status: "DRAFT" } });
}

export async function deleteArticle(id: string) {
  await requireAdmin();

  await db.article.delete({ where: { id } });
}
