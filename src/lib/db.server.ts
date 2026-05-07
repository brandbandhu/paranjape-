import mysql from "mysql2/promise";
import type { Pool } from "mysql2/promise";
import { randomBytes, scryptSync, timingSafeEqual } from "node:crypto";
import { adminTourCategoryPresets } from "@/data/adminCategories";

const DEFAULT_DB_HOST = process.env.MYSQL_HOST ?? "127.0.0.1";
const DEFAULT_DB_PORT = Number(process.env.MYSQL_PORT ?? "3306");
const DEFAULT_DB_USER = process.env.MYSQL_USER ?? "root";
const DEFAULT_DB_PASSWORD = process.env.MYSQL_PASSWORD ?? "root";
const DEFAULT_DB_NAME = process.env.MYSQL_DATABASE ?? "paranjpe_tours";
const DB_SCHEMA_VERSION = "paranjpe-cms-v2";

const SCRYPT_KEY_LENGTH = 64;

type GlobalWithDatabase = typeof globalThis & {
  __paranjpeMysqlPool?: Pool;
  __paranjpeMysqlReady?: Promise<Pool>;
  __paranjpeMysqlSchemaReady?: Promise<void>;
  __paranjpeMysqlSchemaVersion?: string;
};

function assertSafeIdentifier(identifier: string) {
  if (!/^[a-zA-Z0-9_]+$/.test(identifier)) {
    throw new Error("MYSQL_DATABASE must contain only letters, numbers or underscores.");
  }

  return `\`${identifier}\``;
}

function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, SCRYPT_KEY_LENGTH).toString("hex");
  return `scrypt:${salt}:${hash}`;
}

async function seedDefaultAdmin(pool: Pool) {
  const [rows] = await pool.query<any[]>("SELECT COUNT(*) AS count FROM admins");
  if (rows[0]?.count > 0) {
    return;
  }

  const username = process.env.ADMIN_USERNAME ?? "admin";
  const password = process.env.ADMIN_PASSWORD ?? "admin123";
  const passwordHash = hashPassword(password);

  await pool.execute(
    "INSERT INTO admins (username, password_hash, display_name) VALUES (?, ?, ?)",
    [username, passwordHash, "Administrator"],
  );
}

async function seedDefaultCategories(pool: Pool) {
  for (const category of adminTourCategoryPresets) {
    await pool.execute(
      `
        INSERT INTO categories (name, slug, description)
        VALUES (?, ?, ?)
        ON DUPLICATE KEY UPDATE
          name = VALUES(name),
          slug = VALUES(slug),
          description = IF(categories.description = '', VALUES(description), categories.description)
      `,
      [category.name, category.slug, category.description],
    );
  }
}

async function createTables(pool: Pool) {
  await pool.execute(`
    CREATE TABLE IF NOT EXISTS admins (
      id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
      username VARCHAR(120) NOT NULL UNIQUE,
      password_hash VARCHAR(255) NOT NULL,
      display_name VARCHAR(160) NOT NULL,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);

  await pool.execute(`
    CREATE TABLE IF NOT EXISTS admin_sessions (
      id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
      admin_id INT UNSIGNED NOT NULL,
      token_hash CHAR(64) NOT NULL UNIQUE,
      expires_at DATETIME NOT NULL,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      INDEX idx_admin_sessions_expires_at (expires_at),
      CONSTRAINT fk_admin_sessions_admin
        FOREIGN KEY (admin_id) REFERENCES admins(id)
        ON DELETE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);

  await pool.execute(`
    CREATE TABLE IF NOT EXISTS categories (
      id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL UNIQUE,
      slug VARCHAR(255) NOT NULL UNIQUE,
      description TEXT NOT NULL,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);

  await pool.execute(`
    CREATE TABLE IF NOT EXISTS cms_tours (
      id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
      slug VARCHAR(255) NOT NULL UNIQUE,
      title VARCHAR(255) NOT NULL,
      category_id INT UNSIGNED NULL,
      category_label VARCHAR(255) NOT NULL,
      location VARCHAR(255) NOT NULL,
      duration VARCHAR(255) NOT NULL,
      difficulty VARCHAR(255) NOT NULL,
      best_for VARCHAR(255) NOT NULL,
      best_season VARCHAR(255) NOT NULL,
      group_size VARCHAR(255) NOT NULL,
      price VARCHAR(255) NOT NULL,
      image LONGTEXT NOT NULL,
      gallery_json JSON NOT NULL,
      short_description TEXT NOT NULL,
      overview TEXT NOT NULL,
      history LONGTEXT NOT NULL,
      highlights_json JSON NOT NULL,
      itinerary_json JSON NOT NULL,
      inclusions_json JSON NOT NULL,
      exclusions_json JSON NOT NULL,
      carry_json JSON NOT NULL,
      who_can_join TEXT NOT NULL,
      faqs_json JSON NOT NULL,
      notes_json JSON NULL,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      INDEX idx_cms_tours_category_id (category_id),
      CONSTRAINT fk_cms_tours_category
        FOREIGN KEY (category_id) REFERENCES categories(id)
        ON DELETE SET NULL
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);

  await pool.execute(`
    CREATE TABLE IF NOT EXISTS cms_testimonials (
      id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      role VARCHAR(255) NOT NULL,
      text TEXT NOT NULL,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);

  await pool.execute(`
    CREATE TABLE IF NOT EXISTS shop_items (
      id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
      slug VARCHAR(255) NOT NULL UNIQUE,
      title VARCHAR(255) NOT NULL,
      category VARCHAR(255) NOT NULL,
      badge VARCHAR(255) NOT NULL,
      price VARCHAR(255) NOT NULL,
      description TEXT NOT NULL,
      image LONGTEXT NOT NULL,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);

  await pool.execute(`
    CREATE TABLE IF NOT EXISTS blogs (
      id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
      slug VARCHAR(255) NOT NULL UNIQUE,
      title VARCHAR(255) NOT NULL,
      category VARCHAR(255) NOT NULL,
      excerpt TEXT NOT NULL,
      content LONGTEXT NOT NULL,
      image LONGTEXT NOT NULL,
      published_on DATE NOT NULL,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);

  await pool.execute("ALTER TABLE cms_tours MODIFY image LONGTEXT NOT NULL");
  await pool.execute("ALTER TABLE shop_items MODIFY image LONGTEXT NOT NULL");
  await pool.execute("ALTER TABLE blogs MODIFY image LONGTEXT NOT NULL");
}

async function createDatabaseIfNeeded() {
  const bootstrap = await mysql.createConnection({
    host: DEFAULT_DB_HOST,
    port: DEFAULT_DB_PORT,
    user: DEFAULT_DB_USER,
    password: DEFAULT_DB_PASSWORD,
    connectTimeout: 5000,
  });

  try {
    await bootstrap.query(
      `CREATE DATABASE IF NOT EXISTS ${assertSafeIdentifier(DEFAULT_DB_NAME)} CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`,
    );
  } finally {
    await bootstrap.end();
  }
}

async function initializePool() {
  await createDatabaseIfNeeded();

  const pool = mysql.createPool({
    host: DEFAULT_DB_HOST,
    port: DEFAULT_DB_PORT,
    user: DEFAULT_DB_USER,
    password: DEFAULT_DB_PASSWORD,
    database: DEFAULT_DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    connectTimeout: 5000,
  });

  await createTables(pool);
  await seedDefaultAdmin(pool);
  await seedDefaultCategories(pool);

  return pool;
}

export async function getPool() {
  const globalScope = globalThis as GlobalWithDatabase;

  if (!globalScope.__paranjpeMysqlReady) {
    globalScope.__paranjpeMysqlReady = initializePool().then((pool) => {
      globalScope.__paranjpeMysqlPool = pool;
      return pool;
    });
  }

  const pool = await globalScope.__paranjpeMysqlReady;

  if (globalScope.__paranjpeMysqlSchemaVersion !== DB_SCHEMA_VERSION) {
    if (!globalScope.__paranjpeMysqlSchemaReady) {
      globalScope.__paranjpeMysqlSchemaReady = (async () => {
        await createTables(pool);
        await seedDefaultAdmin(pool);
        await seedDefaultCategories(pool);
        globalScope.__paranjpeMysqlSchemaVersion = DB_SCHEMA_VERSION;
      })().finally(() => {
        globalScope.__paranjpeMysqlSchemaReady = undefined;
      });
    }

    await globalScope.__paranjpeMysqlSchemaReady;
  }

  return pool;
}

export function verifyStoredPassword(password: string, storedHash: string) {
  const [scheme, salt, hash] = storedHash.split(":");
  if (scheme !== "scrypt" || !salt || !hash) {
    return false;
  }

  const incomingHash = scryptSync(password, salt, SCRYPT_KEY_LENGTH);
  const storedBuffer = Buffer.from(hash, "hex");

  if (incomingHash.length !== storedBuffer.length) {
    return false;
  }

  return timingSafeEqual(incomingHash, storedBuffer);
}
