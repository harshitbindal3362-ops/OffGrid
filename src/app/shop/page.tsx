import React, { Suspense } from "react";
import { prisma } from "@/lib/prisma";
import { ShopClient } from "@/components/shop/ShopClient";

export const dynamic = "force-dynamic";

export default async function ShopPage() {
  const products = await prisma.product.findMany({
    where: { status: "PUBLISHED" },
    include: {
      images: { orderBy: { sortOrder: "asc" } },
      variants: true,
    },
    orderBy: { createdAt: "desc" },
  });

  const footerSetting = await prisma.siteSetting.findUnique({
    where: { key: "footerTickerText" },
  });

  return (
    <Suspense fallback={<div className="p-12 text-center font-display">LOADING THE RAIL...</div>}>
      <ShopClient
        initialProducts={products}
        footerTickerText={footerSetting?.value}
      />
    </Suspense>
  );
}
