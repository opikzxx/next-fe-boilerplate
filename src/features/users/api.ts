"use server";

import { hash } from "bcryptjs";
import type { CreateUserValues, UpdateUserRoleValues } from "@/features/users/schema";
import { createUserSchema, updateUserRoleSchema } from "@/features/users/schema";
import { requireAdmin } from "@/features/auth/guards";
import { db } from "@/lib/db";

const PASSWORD_HASH_ROUNDS = 12;

export async function listUsers() {
  await requireAdmin();

  return db.user.findMany({
    select: { id: true, name: true, email: true, role: true, createdAt: true },
    orderBy: { createdAt: "desc" },
  });
}

export async function createUser(values: CreateUserValues) {
  await requireAdmin();

  const parsed = createUserSchema({
    name_required: "Name is required",
    email_invalid: "Enter a valid email",
    password_min: (min) => `Password must be at least ${min} characters`,
  }).parse(values);

  const passwordHash = await hash(parsed.password, PASSWORD_HASH_ROUNDS);

  return db.user.create({
    data: {
      name: parsed.name,
      email: parsed.email,
      passwordHash,
      role: parsed.role,
    },
  });
}

export async function updateUserRole(id: string, values: UpdateUserRoleValues) {
  await requireAdmin();

  const parsed = updateUserRoleSchema.parse(values);

  return db.user.update({ where: { id }, data: { role: parsed.role } });
}

export async function deleteUser(id: string) {
  await requireAdmin();

  await db.user.delete({ where: { id } });
}
