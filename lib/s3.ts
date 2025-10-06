import 'server-only' // ✅ ensures this file is server-only

import { S3Client } from "@aws-sdk/client-s3";
import { env } from "./env";

// Tigris S3 client
export const s3 = new S3Client({
  region: env.AWS_REGION,
  credentials: {
    accessKeyId: env.AWS_ACCESS_KEY_ID,
    secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
  },
  endpoint: env.AWS_ENDPOINT_URL_S3,           // Tigris S3 endpoint
  forcePathStyle: true,                        // required for Tigris
});
