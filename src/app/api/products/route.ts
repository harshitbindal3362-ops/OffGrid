import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const condition = searchParams.get("condition");
  const category = searchParams.get("category");
  const sort = searchParams.get("sort") || "newest";

  const where: Record<string, unknown> = {
    status: "PUBLISHED",
  };

  if (condition && condition !== "ALL") {
    where.condition = condition.toUpperCase();
  }

  if (category && category !== "ALL") {
    where.category = category.toUpperCase();
  }

  let orderBy: Record<string, string> = { createdAt: "desc" };
  if (sort === "price-asc") orderBy = { price: "asc" };
  if (sort === "price-desc") orderBy = { price: "desc" };

  const products = await prisma.product.findMany({
    where,
    include: {
      images: { orderBy: { sortOrder: "asc" } },
      variants: true,
    },
    orderBy,
  });

  return NextResponse.json({ products });
}
