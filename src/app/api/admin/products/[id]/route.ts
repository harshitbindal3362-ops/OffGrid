import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyAdminServerSide, unauthorizedAdminResponse } from "@/lib/admin-auth";
import { ProductInputSchema } from "@/lib/schemas";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await verifyAdminServerSide())) {
    return unauthorizedAdminResponse();
  }

  try {
    const { id } = await params;
    const body = await req.json();
    const parsed = ProductInputSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: "Validation error", details: parsed.error.format() }, { status: 400 });
    }

    const { name, slug, description, condition, category, isOneOfOne, tag, price, compareAtPrice, status, variants, images } = parsed.data;

    // Run transaction: update product, re-sync variants and images
    const updated = await prisma.$transaction(async (tx) => {
      // 1. Update product root fields
      const p = await tx.product.update({
        where: { id },
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
        },
      });

      // 2. Re-create variants or update
      await tx.productVariant.deleteMany({ where: { productId: id } });
      await tx.productVariant.createMany({
        data: variants.map((v) => ({
          productId: id,
          size: v.size,
          stock: v.stock,
        })),
      });

      // 3. Re-create images
      await tx.productImage.deleteMany({ where: { productId: id } });
      await tx.productImage.createMany({
        data: images.map((img, idx) => ({
          productId: id,
          url: img.url,
          sortOrder: img.sortOrder ?? idx,
          altText: img.altText || name,
        })),
      });

      return p;
    });

    return NextResponse.json({ ok: true, product: updated });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Internal server error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await verifyAdminServerSide())) {
    return unauthorizedAdminResponse();
  }

  try {
    const { id } = await params;
    await prisma.product.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Failed to delete product";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
