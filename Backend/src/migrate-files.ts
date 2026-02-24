import * as mysql from 'mysql2/promise';
import * as fs from 'fs';
import * as path from 'path';
import * as crypto from 'crypto';
import * as dotenv from 'dotenv';

dotenv.config({ path: path.join(__dirname, '../.env') });

const UPLOADS_DIR = path.join(__dirname, '../uploads');

function getExtension(buffer: Buffer): string {
  if (buffer.length >= 4) {
    const hex = buffer.toString('hex', 0, 4).toUpperCase();
    if (hex.startsWith('FFD8FF')) return '.jpg';
    if (hex.startsWith('89504E47')) return '.png';
    if (hex.startsWith('25504446')) return '.pdf';
    if (hex.startsWith('47494638')) return '.gif';
  }
  return '.bin';
}

const tablesToMigrate = [
  { table: 'home_page_image', columns: ['image', 'mobileImage'] },
  { table: 'gallery', columns: ['image'] },
  { table: 'faculty', columns: ['avatar'] },
  { table: 'files', columns: ['file', 'avatar'] },
  { table: 'event', columns: ['image'] },
  { table: 'timetables', columns: ['file'] },
  { table: 'alumni_podcast', columns: ['thumbnail'] },
  { table: 'academic_calendar', columns: ['pdf'] },
];

async function migrate() {
  if (!fs.existsSync(UPLOADS_DIR)) {
    fs.mkdirSync(UPLOADS_DIR, { recursive: true });
  }

  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT) || 3306,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  console.log('Connected to the database');

  for (const tableInfo of tablesToMigrate) {
    const { table, columns } = tableInfo;

    try {
      // Check if table exists
      const [rows]: any = await connection.query(`SHOW TABLES LIKE '${table}'`);
      if (rows.length === 0) {
        console.log(`Table '${table}' does not exist, skipping...`);
        continue;
      }

      for (const col of columns) {
        console.log(`\nMigrating column '${col}' in table '${table}'...`);

        // Identify how many records actually have data that isn't already a short string path
        // LONGBLOB can store strings. We will only migrate if length is > 1000 bytes or just checking length.
        // Or we just check all non-null values.
        const [records]: any = await connection.query(
          `SELECT id, ${col} FROM ${table} WHERE ${col} IS NOT NULL`,
        );

        let migratedCount = 0;

        for (const record of records) {
          const buffer = record[col];

          if (Buffer.isBuffer(buffer)) {
            // Check if this buffer is actually a small string URL
            const text = buffer.toString('utf-8');
            if (text.startsWith('/uploads/')) {
              // Already migrated
              continue;
            }

            // It's a real file
            const ext = getExtension(buffer);
            const filename = `${crypto.randomUUID()}${ext}`;
            const filepath = path.join(UPLOADS_DIR, filename);

            await fs.promises.writeFile(filepath, buffer);
            const fileUrl = `/uploads/${filename}`;

            await connection.query(
              `UPDATE ${table} SET ${col} = ? WHERE id = ?`,
              [fileUrl, record.id],
            );
            migratedCount++;
            console.log(` -> Saved to ${fileUrl}`);
          } else if (
            typeof buffer === 'string' &&
            buffer.startsWith('/uploads/')
          ) {
            // Already migrated string
            continue;
          }
        }

        console.log(`Migrated ${migratedCount} items for '${table}.${col}'.`);
      }
    } catch (error: any) {
      console.error(`Error migrating table ${table}:`, error.message);
    }
  }

  await connection.end();
  console.log('\nMigration completed successfully!');
}

migrate().catch(console.error);
