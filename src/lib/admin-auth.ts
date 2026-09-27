import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const ADMIN_COOKIE_NAME = "offgrid_admin_session";
export const ADMIN_SESSION_SECRET = "offgrid_admin_authenticated_session_token_2026";

export async function verifyAdminServerSide(): Promise<boolean> {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
  return sessionToken === ADMIN_SESSION_SECRET;
}

export function unauthorizedAdminResponse() {
  return NextResponse.json(
    { error: "Unauthorized. Admin role required." },
    { status: 401 }
  );
}
