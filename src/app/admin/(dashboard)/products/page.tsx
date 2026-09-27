import React from "react";
import { prisma } from "@/lib/prisma";
import { AdminProductsClient } from "@/components/admin/AdminProductsClient";

export const dynamic = "force-dynamic";

export default async function AdminProductsPage() {
  const products = await prisma.product.findMany({
    include: {
      variants: true,
      images: { orderBy: { sortOrder: "asc" } },
    },
    orderBy: { createdAt: "desc" },
  });

  return <AdminProductsClient initialProducts={products} />;
}
