import { apiClient } from "@/lib/api/client";
import { successResponseSchema } from "@/lib/api/response";
import { authDataSchema } from "@/features/auth/schema";
import type { SignInValues, SignUpValues } from "@/features/auth/schema";

const authResponseSchema = successResponseSchema(authDataSchema);

export async function signIn(values: Omit<SignInValues, "rememberMe">) {
  const response = await apiClient.post("/auth/login", values);
  return authResponseSchema.parse(response.data).data;
}

export async function signUp(values: Omit<SignUpValues, "confirmPassword">) {
  const response = await apiClient.post("/auth/register", values);
  return authResponseSchema.parse(response.data).data;
}

export async function refreshToken(refreshToken: string) {
  const response = await apiClient.post("/auth/refresh", {
    refresh_token: refreshToken,
  });
  return authResponseSchema.parse(response.data).data;
}
