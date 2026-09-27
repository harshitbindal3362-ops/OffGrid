import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyAdminServerSide, unauthorizedAdminResponse } from "@/lib/admin-auth";
import { ProductInputSchema } from "@/lib/schemas";

export async function POST(req: Request) {
  if (!(await verifyAdminServerSide())) {
    return unauthorizedAdminResponse();
  }

  try {
    const body = await req.json();
    const parsed = ProductInputSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: "Validation error", details: parsed.error.format() }, { status: 400 });
    }

    const { name, slug, description, condition, category, isOneOfOne, tag, price, compareAtPrice, status, variants, images } = parsed.data;

    // Check slug uniqueness
    const existing = await prisma.product.findUnique({ where: { slug } });
    if (existing) {
      return NextResponse.json({ error: "A product with this slug already exists" }, { status: 400 });
    }

    const product = await prisma.product.create({
      data: {
        name,
        slug,
        description,
        condition,
        category,
        isOneOfOne,
        tag,
        price,
        compareAtPrice,
        status,
        variants: {
          create: variants.map((v) => ({
            size: v.size,
            stock: v.stock,
          })),
        },
        images: {
          create: images.map((img, idx) => ({
            url: img.url,
            sortOrder: img.sortOrder ?? idx,
            altText: img.altText || name,
          })),
        },
      },
      include: {
        variants: true,
        images: true,
      },
    });

    return NextResponse.json({ ok: true, product });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Internal server error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
