import React from "react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { formatINR } from "@/lib/utils";
import { Package, ShoppingBag, AlertTriangle, ArrowRight, Plus } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const [productsCount, orders, lowStockVariants] = await Promise.all([
    prisma.product.count({ where: { status: "PUBLISHED" } }),
    prisma.order.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
      include: { items: true },
    }),
    prisma.productVariant.findMany({
      where: {
        stock: { lte: 1 },
      },
      include: {
        product: true,
      },
      take: 6,
    }),
  ]);

  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center pb-4 border-b border-white/[0.08] gap-4">
        <div>
          <span className="text-[11px] font-mono-code uppercase tracking-widest text-[#E2B755]">
            Internal Staff Console
          </span>
          <h1 className="font-display text-3xl sm:text-4xl text-[#F4F4F6] tracking-tight mt-1">
            Brand Control Overview
          </h1>
        </div>

        <div className="flex items-center space-x-3">
          <Link
            href="/admin/products/new"
            className="px-6 py-3 rounded-full bg-[#E2B755] text-[#0A0A0C] font-bold text-xs uppercase tracking-wider hover:bg-[#F59E0B] transition-colors flex items-center space-x-1.5"
            id="admin-new-product-btn"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Piece</span>
          </Link>
        </div>
      </div>

      {/* Snapshot Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-[#16161B] border border-white/[0.08] shadow-lg">
          <span className="text-[11px] font-mono-code uppercase tracking-widest text-[#8E8E98]">
            Active Catalog
          </span>
          <div className="font-display text-3xl text-[#F4F4F6] mt-2">{productsCount} PIECES</div>
          <span className="text-[11px] text-emerald-400 font-mono-code block mt-2">
            Live on the Rail
          </span>
        </div>

        <div className="p-6 rounded-2xl bg-[#16161B] border border-white/[0.08] shadow-lg">
          <span className="text-[11px] font-mono-code uppercase tracking-widest text-[#8E8E98]">
            Recent Sales (Sample)
          </span>
          <div className="font-display text-3xl text-[#E2B755] mt-2">{formatINR(totalRevenue)}</div>
          <span className="text-[11px] text-[#8E8E98] font-mono-code block mt-2">
            From {orders.length} latest customer orders
          </span>
        </div>

        <div className="p-6 rounded-2xl bg-[#16161B] border border-white/[0.08] shadow-lg">
          <span className="text-[11px] font-mono-code uppercase tracking-widest text-[#8E8E98]">
            Critical Inventory
          </span>
          <div className="font-display text-3xl text-amber-500 mt-2">
            {lowStockVariants.length} ALERTS
          </div>
          <span className="text-[11px] text-[#8E8E98] font-mono-code block mt-2">
            1-of-1 or low stock items
          </span>
        </div>
      </div>

      {/* Grid: Low Stock Warnings & Recent Orders */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Low Stock & 1-of-1 Monitor */}
        <div className="lg:col-span-6 rounded-2xl bg-[#16161B] border border-white/[0.08] p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-white/[0.06] pb-4">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="w-4 h-4 text-amber-500" />
              <h2 className="font-display text-lg text-[#F4F4F6]">
                Low Stock &amp; 1-of-1 Monitor
              </h2>
            </div>
            <Link
              href="/admin/products"
              className="text-[11px] font-mono-code uppercase tracking-widest text-[#E2B755] hover:text-[#F59E0B]"
            >
              View All
            </Link>
          </div>

          <div className="divide-y divide-white/[0.06]">
            {lowStockVariants.map((v) => (
              <div key={v.id} className="py-3 flex justify-between items-center text-xs">
                <div>
                  <span className="font-medium text-[#F4F4F6] block line-clamp-1">
                    {v.product.name}
                  </span>
                  <span className="text-[10px] font-mono-code text-[#8E8E98] mt-1 block">
                    SIZE: {v.size} · {v.product.condition}
                  </span>
                </div>
                <div className="shrink-0 ml-4">
                  {v.stock <= 0 ? (
                    <span className="px-2.5 py-1 rounded-md bg-red-500/10 text-red-400 font-mono-code text-[10px] uppercase border border-red-500/20">
                      Sold Out
                    </span>
                  ) : (
                    <span className="px-2.5 py-1 rounded-md bg-amber-500/10 text-amber-400 font-mono-code text-[10px] uppercase border border-amber-500/20">
                      1 Left (1/1)
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Orders */}
        <div className="lg:col-span-6 rounded-2xl bg-[#16161B] border border-white/[0.08] p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-white/[0.06] pb-4">
            <div className="flex items-center space-x-2">
              <ShoppingBag className="w-4 h-4 text-[#E2B755]" />
              <h2 className="font-display text-lg text-[#F4F4F6]">Recent Orders</h2>
            </div>
            <Link
              href="/admin/orders"
              className="text-[11px] font-mono-code uppercase tracking-widest text-[#E2B755] hover:text-[#F59E0B]"
            >
              All Orders
            </Link>
          </div>

          <div className="divide-y divide-white/[0.06]">
            {orders.length === 0 ? (
              <div className="py-6 text-center text-[11px] font-mono-code text-[#8E8E98]">
                No orders placed yet.
              </div>
            ) : (
              orders.map((o) => (
                <div key={o.id} className="py-3 flex justify-between items-center text-xs">
                  <div className="min-w-0 pr-4">
                    <span className="font-mono-code text-[10px] text-[#F4F4F6] block">
                      {o.id.substring(0, 12)}...
                    </span>
                    <span className="text-sm text-[#8E8E98] block truncate mt-0.5">{o.email}</span>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="font-display text-sm text-[#E2B755] block">
                      {formatINR(o.total)}
                    </span>
                    <span className="inline-block mt-1 px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-400 font-mono-code text-[9px] uppercase border border-emerald-500/20">
                      {o.status}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
