import axios from "axios";
import { Env } from "@/lib/env";
import { ApiError, errorResponseSchema } from "@/lib/api/response";

export const apiClient = axios.create({
  baseURL: Env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (axios.isAxiosError(error)) {
      const envelope = errorResponseSchema.safeParse(error.response?.data);
      if (envelope.success) {
        return Promise.reject(new ApiError(envelope.data.error));
      }
    }

    return Promise.reject(
      error instanceof Error ? error : new Error("Unexpected error"),
    );
  },
);
