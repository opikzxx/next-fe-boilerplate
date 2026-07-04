import * as z from "zod";

export const metaSchema = z.object({
  page: z.number(),
  per_page: z.number(),
  total: z.number(),
  total_pages: z.number(),
});

export type Meta = z.infer<typeof metaSchema>;

export const errorInfoSchema = z.object({
  code: z.string(),
  message: z.string(),
  details: z.record(z.string(), z.string()).optional(),
  timestamp: z.string(),
  path: z.string(),
  request_id: z.string(),
});

export type ErrorInfo = z.infer<typeof errorInfoSchema>;

export function successResponseSchema<DataSchema extends z.ZodTypeAny>(
  dataSchema: DataSchema,
) {
  return z.object({
    success: z.literal(true),
    data: dataSchema,
    meta: metaSchema.optional(),
  });
}

export const errorResponseSchema = z.object({
  success: z.literal(false),
  error: errorInfoSchema,
});

export function apiResponseSchema<DataSchema extends z.ZodTypeAny>(
  dataSchema: DataSchema,
) {
  return z.discriminatedUnion("success", [
    successResponseSchema(dataSchema),
    errorResponseSchema,
  ]);
}

export class ApiError extends Error {
  code: string;
  details?: Record<string, string>;
  requestId: string;
  path: string;
  timestamp: string;

  constructor(info: ErrorInfo) {
    super(info.message);
    this.name = "ApiError";
    this.code = info.code;
    this.details = info.details;
    this.requestId = info.request_id;
    this.path = info.path;
    this.timestamp = info.timestamp;
  }
}
