import React from "react";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ProductDetailClient } from "@/components/shop/ProductDetailClient";
import { Footer } from "@/components/ui/Footer";

export const dynamic = "force-dynamic";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { slug } = await params;

  const product = await prisma.product.findUnique({
    where: { slug },
    include: {
      images: { orderBy: { sortOrder: "asc" } },
      variants: { orderBy: { size: "asc" } },
    },
  });

  if (!product || product.status !== "PUBLISHED") {
    notFound();
  }

  // Related products in the same category
  const related = await prisma.product.findMany({
    where: {
      category: product.category,
      id: { not: product.id },
      status: "PUBLISHED",
    },
    take: 3,
    include: {
      images: { orderBy: { sortOrder: "asc" } },
      variants: true,
    },
  });

  return (
    <div className="w-full min-h-screen flex flex-col bg-[#0A0A0C]">
      <ProductDetailClient product={product} relatedProducts={related} />
      <Footer />
    </div>
  );
}
