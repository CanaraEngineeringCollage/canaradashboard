import { S3Client, GetBucketPolicyCommand, GetPublicAccessBlockCommand, GetBucketOwnershipControlsCommand } from '@aws-sdk/client-s3';
import { config } from 'dotenv';
config();

const client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
  },
});

if (!process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_REGION || !process.env.AWS_SECRET_ACCESS_KEY) {
  console.error('❌ Error: Missing AWS variables in .env file.');
  process.exit(1);
}

const bucket = process.env.AWS_S3_BUCKET_NAME;

async function check() {
  console.log(`Checking bucket: ${bucket}...`);

  // 1. Check Public Access Block
  try {
    const pab = await client.send(new GetPublicAccessBlockCommand({ Bucket: bucket }));
    console.log('\n--- Public Access Block ---');
    console.log(JSON.stringify(pab.PublicAccessBlockConfiguration, null, 2));
  } catch (e: any) {
    console.log('\n--- Public Access Block ---');
    console.log('Error (might be empty/default):', e.message);
  }

  // 2. Check Ownership Controls
  try {
    const ownership = await client.send(new GetBucketOwnershipControlsCommand({ Bucket: bucket }));
    console.log('\n--- Ownership Controls ---');
    console.log(JSON.stringify(ownership.OwnershipControls, null, 2));
  } catch (e: any) {
     console.log('\n--- Ownership Controls ---');
     console.log('Error:', e.message);
  }

  // 3. Check Bucket Policy
  try {
    const policy = await client.send(new GetBucketPolicyCommand({ Bucket: bucket }));
    console.log('\n--- Bucket Policy ---');
    if (policy.Policy) {
        console.log(JSON.stringify(JSON.parse(policy.Policy), null, 2));
    } else {
        console.log('No Policy found.');
    }
  } catch (e: any) {
    console.log('\n--- Bucket Policy ---');
    console.log('Error (No policy?):', e.message);
  }
}

check();
