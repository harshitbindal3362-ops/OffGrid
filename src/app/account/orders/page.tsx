import React from "react";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { verifyCustomerSessionServerSide } from "@/lib/auth";
import Link from "next/link";
import { ArrowLeft, Package, Clock } from "lucide-react";
import { formatINR } from "@/lib/utils";
import { Footer } from "@/components/ui/Footer";

export default async function OrdersPage() {
  const userId = await verifyCustomerSessionServerSide();
  if (!userId) redirect("/login");

  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      orders: {
        orderBy: { createdAt: "desc" },
        include: { items: true },
      },
    },
  });

  if (!user) redirect("/login");

  return (
    <div className="w-full min-h-screen flex flex-col bg-[#0A0A0C]">
      <div className="border-b border-white/[0.08] bg-gradient-to-b from-[#121216] to-[#0A0A0C] py-12 px-6 sm:px-10 lg:px-12">
        <div className="max-w-5xl mx-auto">
          <Link
            href="/account"
            className="inline-flex items-center space-x-2 text-xs font-medium uppercase tracking-wider text-[#8E8E98] hover:text-[#F4F4F6] transition-colors mb-6"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Account</span>
          </Link>
          <h1 className="font-display text-4xl text-[#F4F4F6] tracking-tight">
            Order Archive
          </h1>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 sm:px-10 lg:px-12 py-12 space-y-8 flex-1 w-full">
        {user.orders.length === 0 ? (
          <div className="text-center py-20 px-6 space-y-6 luxury-card rounded-3xl border border-white/[0.08] bg-[#121216]">
            <div className="w-20 h-20 mx-auto rounded-full bg-white/[0.03] border border-white/10 flex items-center justify-center">
              <Package className="w-8 h-8 text-[#5C5C66]" />
            </div>
            <div>
              <h2 className="font-display text-2xl text-[#F4F4F6]">No orders found</h2>
              <p className="text-[#8E8E98] mt-2">You haven't added any pieces to your archive yet.</p>
            </div>
            <Link
              href="/shop"
              className="inline-flex items-center space-x-2 px-8 py-3.5 rounded-full bg-[#E2B755] hover:bg-[#F59E0B] text-[#0A0A0C] font-bold text-xs uppercase tracking-wider transition-all"
            >
              <span>Explore Collection</span>
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {user.orders.map((order) => (
              <div key={order.id} className="luxury-card rounded-2xl overflow-hidden border border-white/[0.08] bg-[#121216]">
                <div className="bg-[#1A1A20] px-6 py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/[0.05]">
                  <div className="flex items-center space-x-4">
                    <div>
                      <span className="text-[10px] font-mono-code uppercase tracking-widest text-[#8E8E98] block">Date Placed</span>
                      <span className="text-sm text-[#F4F4F6] font-medium mt-0.5">{order.createdAt.toLocaleDateString()}</span>
                    </div>
                    <div className="h-8 w-px bg-white/10"></div>
                    <div>
                      <span className="text-[10px] font-mono-code uppercase tracking-widest text-[#8E8E98] block">Total Amount</span>
                      <span className="text-sm text-[#F4F4F6] font-medium mt-0.5">{formatINR(order.total)}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-[10px] font-mono-code uppercase tracking-widest text-[#8E8E98]">Order #</span>
                    <span className="font-mono-code text-sm text-[#F4F4F6] bg-white/[0.05] px-2 py-1 rounded">{order.id.slice(-8).toUpperCase()}</span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center space-x-2 mb-6">
                    <Clock className="w-4 h-4 text-[#E2B755]" />
                    <span className="text-xs font-mono-code uppercase tracking-widest text-[#E2B755]">{order.status}</span>
                  </div>

                  <div className="divide-y divide-white/[0.05]">
                    {order.items.map((item) => (
                      <div key={item.id} className="py-4 first:pt-0 last:pb-0 flex items-center justify-between gap-4">
                        <div className="min-w-0">
                          <h3 className="font-display text-lg text-[#F4F4F6] truncate">{item.productNameSnapshot}</h3>
                          <p className="text-xs font-mono-code text-[#8E8E98] mt-1">
                            SIZE: {item.sizeSnapshot} · QTY: {item.quantity}
                          </p>
                        </div>
                        <div className="shrink-0 text-right">
                          <span className="font-display text-lg text-[#F4F4F6]">{formatINR(item.priceSnapshot * item.quantity)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
}
