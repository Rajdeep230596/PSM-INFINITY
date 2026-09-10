import mysql from "mysql2/promise";

function required(name: string) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing ${name}`);
  }
  return value;
}

let pool: mysql.Pool | null = null;

export function getPool() {
  if (!pool) {
    pool = mysql.createPool({
      host: required("DB_HOST"),
      port: Number(process.env.DB_PORT || 3306),
      database: required("DB_NAME"),
      user: required("DB_USER"),
      password: required("DB_PASSWORD"),
      waitForConnections: true,
      connectionLimit: 8,
    });
  }
  return pool;
}
