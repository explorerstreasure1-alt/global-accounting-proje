import crypto from "node:crypto";
import { cookies } from "next/headers";

export const SESSION_COOKIE_NAME = "ga_admin_session";
const SESSION_PAYLOAD = "admin.v1";

function adminPassword(): string {
  return process.env.ADMIN_PASSWORD?.trim() || "global2026";
}

function sessionSecret(): string {
  return (
    process.env.ADMIN_SESSION_SECRET?.trim() ||
    `global-accounting-session::${adminPassword()}`
  );
}

function sign(payload: string): string {
  return crypto.createHmac("sha256", sessionSecret()).update(payload).digest("hex");
}

function safeEqual(a: string, b: string): boolean {
  const bufferA = Buffer.from(a);
  const bufferB = Buffer.from(b);
  if (bufferA.length !== bufferB.length) return false;
  return crypto.timingSafeEqual(bufferA, bufferB);
}

export function createSessionToken(): string {
  return `${SESSION_PAYLOAD}.${sign(SESSION_PAYLOAD)}`;
}

export function isValidSessionToken(token: string | undefined | null): boolean {
  if (!token) return false;
  const separator = token.lastIndexOf(".");
  if (separator < 0) return false;
  const payload = token.slice(0, separator);
  const signature = token.slice(separator + 1);
  if (payload !== SESSION_PAYLOAD) return false;
  return safeEqual(signature, sign(payload));
}

export function verifyPassword(input: string): boolean {
  if (!input) return false;
  return safeEqual(
    crypto.createHash("sha256").update(input).digest("hex"),
    crypto.createHash("sha256").update(adminPassword()).digest("hex"),
  );
}

export async function isAuthenticated(): Promise<boolean> {
  const store = await cookies();
  return isValidSessionToken(store.get(SESSION_COOKIE_NAME)?.value);
}

export const sessionCookieOptions = {
  httpOnly: true,
  sameSite: "lax" as const,
  path: "/",
  secure: process.env.NODE_ENV === "production",
  maxAge: 60 * 60 * 12,
};
