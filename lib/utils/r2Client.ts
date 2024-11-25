import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';

const r2Client = new S3Client({
  region: 'auto',
  endpoint: `https://${process.env.CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
  },
});

export async function uploadToR2(key: string, body: Buffer, contentType: string) {
  const command = new PutObjectCommand({
    Bucket: process.env.R2_BUCKET_NAME,
    Key: key,
    Body: body,
    ContentType: contentType,
    Metadata: {
      'Content-Disposition': `attachment; filename="${key}"`,
    },
  });
  await r2Client.send(command);
  return `https://${process.env.R2_PUBLIC_URL}/${key}`;
}

export async function deleteFromR2(key: string) {
  const command = new DeleteObjectCommand({
    Bucket: process.env.R2_BUCKET_NAME,
    Key: key,
  });
  return r2Client.send(command);
}

export { r2Client };
