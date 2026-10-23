import bcrypt from "bcryptjs";
import mysql from "mysql2/promise";

async function main() {
  const email = process.env.ADMIN_EMAIL;
  const password = process.argv[2] || process.env.ADMIN_PASSWORD;
  if (!email || !password) {
    console.error("Usage: ADMIN_EMAIL=... node --env-file=.env scripts/set-password.mjs 'new-password'");
    process.exit(1);
  }

  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT || 3306),
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  });

  const passwordHash = await bcrypt.hash(password, 12);
  const [result] = await connection.execute(
    `UPDATE admins SET password_hash = ? WHERE email = ?`,
    [passwordHash, email],
  );
  const affected = result.affectedRows || 0;
  await connection.end();
  if (!affected) {
    console.error(`No admin row for ${email}. Run npm run db:migrate first.`);
    process.exit(1);
  }
  console.log(`Password updated for ${email}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
