import React from "react";
import Link from "next/link";
import { CheckCircle2, ArrowRight, Package } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { formatINR } from "@/lib/utils";

interface SuccessPageProps {
  searchParams: Promise<{ orderId?: string }>;
}

export default async function CheckoutSuccessPage({ searchParams }: SuccessPageProps) {
  const { orderId } = await searchParams;

  const order = orderId
    ? await prisma.order.findUnique({
        where: { id: orderId },
        include: { items: true },
      })
    : null;

  return (
    <div className="min-h-screen bg-[#0A0A0C] flex flex-col items-center justify-center px-6 py-20">
        {/* Success Icon */}
        <div className="relative mb-8">
          <div className="w-24 h-24 rounded-full bg-[#E2B755]/10 border border-[#E2B755]/30 flex items-center justify-center">
            <CheckCircle2 className="w-12 h-12 text-[#E2B755]" strokeWidth={1.5} />
          </div>
          <div className="absolute inset-0 rounded-full bg-[#E2B755]/10 blur-2xl" />
        </div>

        {/* Heading */}
        <div className="text-center space-y-3 max-w-xl">
          <span className="inline-block font-mono-code text-xs text-[#E2B755] uppercase tracking-widest px-3 py-1 rounded-full bg-[#E2B755]/[0.08] border border-[#E2B755]/20">
            Order Confirmed & Logged
          </span>
          <h1 className="font-display text-4xl sm:text-6xl text-[#F4F4F6] tracking-tight leading-tight">
            Thank You For<br />Digging With Us.
          </h1>
          <p className="text-sm text-[#8E8E98] leading-relaxed max-w-md mx-auto">
            Your piece is secured and packed in our Hauz Khas Village workshop. We will dispatch
            within 48 hours with full insured tracking.
          </p>
        </div>

        {/* Order Details Card */}
        {order && (
          <div className="mt-10 w-full max-w-md luxury-card rounded-2xl p-6 sm:p-8 space-y-5">
            <div className="flex items-center space-x-2 mb-2">
              <Package className="w-4 h-4 text-[#E2B755]" />
              <span className="font-display text-lg text-[#F4F4F6]">Order Details</span>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between items-center py-3 border-b border-white/[0.06]">
                <span className="font-mono-code text-[#8E8E98] uppercase tracking-widest">
                  Order ID
                </span>
                <span className="font-mono text-[#F4F4F6] text-[10px] max-w-[180px] text-right truncate">
                  {order.id}
                </span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-white/[0.06]">
                <span className="font-mono-code text-[#8E8E98] uppercase tracking-widest">
                  Customer
                </span>
                <span className="text-[#F4F4F6] font-medium">{order.email}</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-white/[0.06]">
                <span className="font-mono-code text-[#8E8E98] uppercase tracking-widest">
                  Total Paid
                </span>
                <span className="font-display text-xl text-[#E2B755]">
                  {formatINR(order.total)}
                </span>
              </div>
            </div>

            {/* Items */}
            <div className="space-y-2">
              <span className="font-mono-code text-[10px] text-[#8E8E98] uppercase tracking-widest block">
                Items Secured
              </span>
              {order.items.map((i) => (
                <div
                  key={i.id}
                  className="flex justify-between items-center py-2 border-b border-white/[0.04] text-xs"
                >
                  <span className="text-[#F4F4F6]">
                    {i.productNameSnapshot}{" "}
                    <span className="text-[#8E8E98]">({i.sizeSnapshot}) ×{i.quantity}</span>
                  </span>
                  <span className="font-display text-[#F4F4F6]">
                    {formatINR(i.priceSnapshot * i.quantity)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/shop"
            className="inline-flex items-center space-x-2 px-8 py-4 rounded-full bg-[#E2B755] hover:bg-[#F59E0B] text-[#0A0A0C] font-bold text-xs uppercase tracking-wider transition-all"
          >
            <span>Back to the Archive</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/"
            className="inline-flex items-center space-x-2 px-8 py-4 rounded-full bg-white/[0.04] hover:bg-white/[0.08] text-[#F4F4F6] border border-white/10 font-semibold text-xs uppercase tracking-wider transition-all"
          >
            <span>Return Home</span>
          </Link>
        </div>
      </div>
  );
}
