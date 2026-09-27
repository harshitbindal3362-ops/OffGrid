import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { ADMIN_COOKIE_NAME, ADMIN_SESSION_SECRET } from "@/lib/admin-auth";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user || user.role !== "ADMIN" || user.passwordHash !== password) {
      return NextResponse.json(
        { error: "Invalid admin credentials" },
        { status: 401 }
      );
    }

    const cookieStore = await cookies();
    cookieStore.set(ADMIN_COOKIE_NAME, ADMIN_SESSION_SECRET, {
      path: "/",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Auth server error" }, { status: 500 });
  }
}
