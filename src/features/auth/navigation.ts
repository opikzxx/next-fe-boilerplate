import { getSession } from "next-auth/react";

export async function getPostSignInPath() {
  const session = await getSession();
  return session?.user.roles.includes("admin") ? "/dashboard/admin" : "/dashboard";
}
