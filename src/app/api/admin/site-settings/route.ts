import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyAdminServerSide, unauthorizedAdminResponse } from "@/lib/admin-auth";
import { SiteSettingsSchema } from "@/lib/schemas";

export async function PATCH(req: Request) {
  if (!(await verifyAdminServerSide())) {
    return unauthorizedAdminResponse();
  }

  try {
    const body = await req.json();
    const parsed = SiteSettingsSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid settings format" }, { status: 400 });
    }

    const entries = Object.entries(parsed.data);

    for (const [key, value] of entries) {
      await prisma.siteSetting.upsert({
        where: { key },
        update: { value },
        create: { key, value },
      });
    }

    return NextResponse.json({ ok: true });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Error saving site settings";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
