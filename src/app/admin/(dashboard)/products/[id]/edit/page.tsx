import React from "react";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ProductEditor } from "@/components/admin/ProductEditor";

export const dynamic = "force-dynamic";

interface EditProductPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditProductPage({ params }: EditProductPageProps) {
  const { id } = await params;

  const product = await prisma.product.findUnique({
    where: { id },
    include: {
      variants: true,
      images: { orderBy: { sortOrder: "asc" } },
    },
  });

  if (!product) {
    notFound();
  }

  return <ProductEditor product={product} />;
}
