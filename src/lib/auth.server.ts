import { createHash, randomBytes } from "node:crypto";
import { redirect } from "@tanstack/react-router";
import { deleteCookie, getCookie, getRequestProtocol, setCookie } from "@tanstack/react-start/server";
import { getPool, verifyStoredPassword } from "@/lib/db.server";
import type { AdminUser } from "@/lib/content.types";

const ADMIN_COOKIE_NAME = "paranjpe_admin_session";
const SESSION_DURATION_SECONDS = 60 * 60 * 24 * 7;

function buildCookieOptions() {
  const isSecure = getRequestProtocol({ xForwardedProto: true }) === "https";

  return {
    httpOnly: true,
    sameSite: "lax" as const,
    path: "/",
    secure: isSecure,
    maxAge: SESSION_DURATION_SECONDS,
  };
}

function hashToken(token: string) {
  return createHash("sha256").update(token).digest("hex");
}

function toAdminUser(row: any): AdminUser {
  return {
    id: Number(row.id),
    username: String(row.username),
    displayName: String(row.display_name),
  };
}

export async function getCurrentAdmin() {
  const token = getCookie(ADMIN_COOKIE_NAME);
  if (!token) {
    return null;
  }

  const pool = await getPool();
  const tokenHash = hashToken(token);

  const [rows] = await pool.execute<any[]>(
    `
      SELECT admins.id, admins.username, admins.display_name, admin_sessions.id AS session_id
      FROM admin_sessions
      INNER JOIN admins ON admins.id = admin_sessions.admin_id
      WHERE admin_sessions.token_hash = ? AND admin_sessions.expires_at > NOW()
      LIMIT 1
    `,
    [tokenHash],
  );

  if (!rows.length) {
    deleteCookie(ADMIN_COOKIE_NAME, buildCookieOptions());
    return null;
  }

  return toAdminUser(rows[0]);
}

export async function requireAdmin(options?: { redirectTo?: string }) {
  const admin = await getCurrentAdmin();
  if (!admin) {
    if (options?.redirectTo) {
      throw redirect({ to: options.redirectTo });
    }

    throw new Error("You must be logged in as admin to perform this action.");
  }

  return admin;
}

export async function loginWithCredentials(username: string, password: string) {
  const pool = await getPool();
  const [rows] = await pool.execute<any[]>(
    "SELECT id, username, display_name, password_hash FROM admins WHERE username = ? LIMIT 1",
    [username],
  );

  const adminRow = rows[0];
  if (!adminRow || !verifyStoredPassword(password, String(adminRow.password_hash))) {
    throw new Error("Invalid username or password.");
  }

  const token = randomBytes(32).toString("hex");
  const tokenHash = hashToken(token);

  await pool.execute("DELETE FROM admin_sessions WHERE admin_id = ?", [adminRow.id]);
  await pool.execute(
    "INSERT INTO admin_sessions (admin_id, token_hash, expires_at) VALUES (?, ?, DATE_ADD(NOW(), INTERVAL ? SECOND))",
    [adminRow.id, tokenHash, SESSION_DURATION_SECONDS],
  );

  setCookie(ADMIN_COOKIE_NAME, token, buildCookieOptions());

  return toAdminUser(adminRow);
}

export async function logoutCurrentAdmin() {
  const token = getCookie(ADMIN_COOKIE_NAME);
  const pool = await getPool();

  if (token) {
    await pool.execute("DELETE FROM admin_sessions WHERE token_hash = ?", [hashToken(token)]);
  }

  deleteCookie(ADMIN_COOKIE_NAME, buildCookieOptions());
}
