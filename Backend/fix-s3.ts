import { S3Client, PutPublicAccessBlockCommand, PutBucketPolicyCommand } from '@aws-sdk/client-s3';
import { config } from 'dotenv';
config();

const bucket = process.env.AWS_S3_BUCKET_NAME;
const region = process.env.AWS_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

console.log(`Checking credentials for bucket: ${bucket}...`);

if (!bucket || !region || !accessKeyId || !secretAccessKey) {
  console.error('❌ Error: Missing AWS variables in .env file.');
  process.exit(1);
}

const client = new S3Client({
  region,
  credentials: { accessKeyId, secretAccessKey },
});

async function fixPermissions() {
  try {
    // 1. Disable "Block Public Access"
    console.log('Step 1: Disabling "Block Public Access"...');
    await client.send(new PutPublicAccessBlockCommand({
      Bucket: bucket,
      PublicAccessBlockConfiguration: {
        BlockPublicAcls: false,
        IgnorePublicAcls: false,
        BlockPublicPolicy: false,
        RestrictPublicBuckets: false,
      },
    }));
    console.log('✅ Block Public Access disabled.');

    // 2. Apply Public Read Policy
    console.log('Step 2: Applying Public Bucket Policy...');
    const policy = {
      Version: "2012-10-17",
      Statement: [
        {
          Sid: "PublicReadGetObject",
          Effect: "Allow",
          Principal: "*",
          Action: "s3:GetObject",
          Resource: `arn:aws:s3:::${bucket}/*`
        }
      ]
    };

    await client.send(new PutBucketPolicyCommand({
      Bucket: bucket,
      Policy: JSON.stringify(policy),
    }));
    console.log('✅ Bucket Policy applied.');
    console.log('\n🎉 SUCCESS: Your videos should now be visible publicly.');

  } catch (error: any) {
    console.error('\n❌ FAILED:', error.message);
  }
}

fixPermissions();