import "dotenv/config";
import { hash } from "bcryptjs";
import { db } from "@/lib/db";

const PASSWORD_HASH_ROUNDS = 12;

async function main() {
  const existingAdmin = await db.user.findFirst({ where: { role: "ADMIN" } });

  if (existingAdmin) {
    console.log(`Admin already exists (${existingAdmin.email}), skipping seed.`);
    return;
  }

  const email = process.env.SEED_ADMIN_EMAIL;
  const password = process.env.SEED_ADMIN_PASSWORD;
  const name = process.env.SEED_ADMIN_NAME ?? "Admin";

  if (!email || !password) {
    throw new Error(
      "Set SEED_ADMIN_EMAIL and SEED_ADMIN_PASSWORD to seed the first Admin account.",
    );
  }

  const passwordHash = await hash(password, PASSWORD_HASH_ROUNDS);

  const admin = await db.user.create({
    data: { name, email, passwordHash, role: "ADMIN" },
  });

  console.log(`Created first Admin account: ${admin.email}`);
}

main().finally(() => db.$disconnect());
