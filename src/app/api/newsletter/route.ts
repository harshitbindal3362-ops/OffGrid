import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { NewsletterSchema } from "@/lib/schemas";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = NewsletterSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Please provide a valid email address" },
        { status: 400 }
      );
    }

    const { email } = parsed.data;

    // Check if already subscribed
    const existing = await prisma.newsletterSubscriber.findUnique({
      where: { email },
    });

    if (existing) {
      return NextResponse.json({ ok: true, message: "Already subscribed" });
    }

    await prisma.newsletterSubscriber.create({
      data: { email },
    });

    return NextResponse.json({ ok: true, message: "Subscribed successfully" });
  } catch {
    return NextResponse.json(
      { error: "Subscription failed" },
      { status: 500 }
    );
  }
}
