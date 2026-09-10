import { readFileSync } from "fs";
import path from "path";
import bcrypt from "bcryptjs";
import mysql from "mysql2/promise";

async function main() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT || 3306),
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    multipleStatements: true,
  });

  const sql = readFileSync(path.join(process.cwd(), "sql", "001_schema.sql"), "utf8");
  await connection.query(sql);

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
