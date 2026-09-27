import React from "react";
import { Footer } from "@/components/ui/Footer";
import { Truck, Package, Shield } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shipping & Dispatch Policy — OFFGRID",
  description:
    "All OFFGRID orders are dispatched within 48 hours from Hauz Khas Village. Free insured shipping on orders above ₹5,000.",
};

export default function ShippingPage() {
  return (
    <div className="w-full min-h-screen flex flex-col bg-[#0A0A0C]">
      <div className="border-b border-white/[0.08] bg-gradient-to-b from-[#121216] to-[#0A0A0C] py-16 px-6 sm:px-10 lg:px-12 text-center">
        <span className="inline-block font-mono-code text-xs text-[#E2B755] uppercase tracking-widest mb-3">
          Legal
        </span>
        <h1 className="font-display text-4xl sm:text-5xl text-[#F4F4F6] tracking-tight">
          Shipping &amp; Dispatch
        </h1>
      </div>

      <div className="max-w-3xl mx-auto px-6 sm:px-10 lg:px-12 py-16 space-y-8 flex-1 w-full">
        <div className="luxury-card rounded-2xl p-8 space-y-6">
          <div className="flex items-start space-x-4">
            <div className="w-10 h-10 rounded-xl bg-[#E2B755]/10 border border-[#E2B755]/20 flex items-center justify-center shrink-0">
              <Truck className="w-4 h-4 text-[#E2B755]" />
            </div>
            <div>
              <h2 className="font-display text-xl text-[#F4F4F6]">48-Hour Dispatch Policy</h2>
              <p className="text-sm text-[#8E8E98] leading-relaxed mt-2">
                All domestic orders are processed, packed in reinforced eco-packaging, and
                dispatched within 48 hours from our Hauz Khas Village studio.
              </p>
            </div>
          </div>

          <div className="border-t border-white/[0.06] pt-6 flex items-start space-x-4">
            <div className="w-10 h-10 rounded-xl bg-[#E2B755]/10 border border-[#E2B755]/20 flex items-center justify-center shrink-0">
              <Package className="w-4 h-4 text-[#E2B755]" />
            </div>
            <div>
              <h2 className="font-display text-xl text-[#F4F4F6]">Insured Express Shipping</h2>
              <p className="text-sm text-[#8E8E98] leading-relaxed mt-2">
                Orders over <span className="text-[#E2B755] font-semibold">₹5,000</span> qualify
                for complimentary insured express courier shipping across India via Bluedart and
                Delhivery (typically 3–5 business days delivery). Orders below ₹5,000 incur a flat{" "}
                <span className="text-[#F4F4F6]">₹150</span> domestic shipping fee.
              </p>
            </div>
          </div>

          <div className="border-t border-white/[0.06] pt-6 flex items-start space-x-4">
            <div className="w-10 h-10 rounded-xl bg-[#E2B755]/10 border border-[#E2B755]/20 flex items-center justify-center shrink-0">
              <Shield className="w-4 h-4 text-[#E2B755]" />
            </div>
            <div>
              <h2 className="font-display text-xl text-[#F4F4F6]">Insured Transit</h2>
              <p className="text-sm text-[#8E8E98] leading-relaxed mt-2">
                Every package is fully insured for its order value during transit. In the unlikely
                event of loss or damage, we will arrange full replacement or refund. Please retain
                all packaging until your piece is inspected.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
