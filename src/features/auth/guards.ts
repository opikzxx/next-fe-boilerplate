"use server";

import { auth } from "@/auth";

/**
 * Requires an authenticated session (Admin or Creator).
 * @throws When there is no active session.
 */
export async function requireUser() {
  const session = await auth();

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  return session;
}

/**
 * Requires an authenticated session with the Admin role.
 * @throws When there is no active session or the user is not an Admin.
 */
export async function requireAdmin() {
  const session = await requireUser();

  if (!session.user.roles.includes("admin")) {
    throw new Error("Unauthorized");
  }

  return session;
}

/**
 * Requires an authenticated session with the Admin or Creator role.
 * @throws When there is no active session or the user has neither role.
 */
export async function requireCreatorOrAdmin() {
  const session = await requireUser();

  if (
    !session.user.roles.includes("admin") &&
    !session.user.roles.includes("creator")
  ) {
    throw new Error("Unauthorized");
  }

  return session;
}
