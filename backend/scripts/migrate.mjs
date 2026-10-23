import { readdirSync, readFileSync } from "fs";
import path from "path";
import bcrypt from "bcryptjs";
import mysql from "mysql2/promise";

async function ensureMediaColumns(connection) {
  const [rows] = await connection.query(
    `SELECT COLUMN_NAME AS name FROM INFORMATION_SCHEMA.COLUMNS
     WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'media'`,
  );
  const existing = new Set(rows.map((row) => row.name));
  const additions = [
    ["original_name", "ALTER TABLE media ADD COLUMN original_name VARCHAR(255) NULL AFTER url"],
    ["mime_type", "ALTER TABLE media ADD COLUMN mime_type VARCHAR(120) NULL AFTER original_name"],
    ["file_size", "ALTER TABLE media ADD COLUMN file_size INT UNSIGNED NULL AFTER mime_type"],
  ];
  for (const [name, sql] of additions) {
    if (!existing.has(name)) {
      await connection.query(sql);
      console.log(`Added media.${name}`);
    }
  }
}

async function main() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT || 3306),
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    multipleStatements: true,
  });

  const sqlDir = path.join(process.cwd(), "sql");
  const files = readdirSync(sqlDir)
    .filter((name) => name.endsWith(".sql"))
    .sort();

  for (const file of files) {
    const sql = readFileSync(path.join(sqlDir, file), "utf8");
    await connection.query(sql);
    console.log(`Applied ${file}`);
  }

  await ensureMediaColumns(connection);

  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;
  if (email && password) {
    const passwordHash = await bcrypt.hash(password, 12);
    await connection.execute(
      `INSERT INTO admins (email, password_hash) VALUES (?, ?)
       ON DUPLICATE KEY UPDATE password_hash = VALUES(password_hash)`,
      [email, passwordHash],
    );
    console.log(`Owner account ready: ${email}`);
  }

  await connection.end();
  console.log("Migration complete.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
