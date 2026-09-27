import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const CUSTOMER_COOKIE_NAME = "offgrid_customer_session";
// Ensure there's a fallback for development
const SECRET_KEY = new TextEncoder().encode(
  process.env.NEXTAUTH_SECRET || "fallback_development_secret_key_minimum_length_32"
);

export async function createCustomerSession(userId: string) {
  const token = await new SignJWT({ userId })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("30d")
    .sign(SECRET_KEY);

  const cookieStore = await cookies();
  cookieStore.set(CUSTOMER_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  });
}

export async function verifyCustomerSessionServerSide(): Promise<string | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(CUSTOMER_COOKIE_NAME)?.value;

  if (!token) return null;

  try {
    const { payload } = await jwtVerify(token, SECRET_KEY);
    return payload.userId as string;
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.warn("[auth] Customer token verification failed:", error);
    }
    return null;
  }
}

export async function clearCustomerSession() {
  const cookieStore = await cookies();
  cookieStore.delete(CUSTOMER_COOKIE_NAME);
}

// Middleware helper
export async function verifyCustomerToken(request: NextRequest): Promise<string | null> {
  const token = request.cookies.get(CUSTOMER_COOKIE_NAME)?.value;
  if (!token) return null;

  try {
    const { payload } = await jwtVerify(token, SECRET_KEY);
    return payload.userId as string;
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.warn("[auth] Middleware token verification failed:", error);
    }
    return null;
  }
}
