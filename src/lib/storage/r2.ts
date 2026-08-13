import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { Env } from "@/lib/env";

const r2Client = new S3Client({
  region: "auto",
  endpoint: `https://${Env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: Env.R2_ACCESS_KEY_ID,
    secretAccessKey: Env.R2_SECRET_ACCESS_KEY,
  },
});

/**
 * Uploads a file to the R2 bucket and returns its public URL.
 * @param key The object key (path) to store the file under.
 * @param body The file contents.
 * @param contentType The file's MIME type.
 * @returns The public URL of the uploaded object.
 */
export async function uploadToR2(
  key: string,
  body: Buffer,
  contentType: string,
) {
  await r2Client.send(
    new PutObjectCommand({
      Bucket: Env.R2_BUCKET,
      Key: key,
      Body: body,
      ContentType: contentType,
    }),
  );

  return `${Env.R2_PUBLIC_URL}/${key}`;
}
