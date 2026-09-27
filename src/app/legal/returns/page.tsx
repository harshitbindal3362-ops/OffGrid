import React from "react";
import { Footer } from "@/components/ui/Footer";
import { AlertTriangle, RefreshCw, Package } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Returns & 1-of-1 Policy — OFFGRID",
  description:
    "All vintage 1-of-1 archive pieces are strictly final sale. In-house heavyweight basics may be exchanged within 7 days of delivery.",
};

export default function ReturnsPage() {
  return (
    <div className="w-full min-h-screen flex flex-col bg-[#0A0A0C]">
      <div className="border-b border-white/[0.08] bg-gradient-to-b from-[#121216] to-[#0A0A0C] py-16 px-6 sm:px-10 lg:px-12 text-center">
        <span className="inline-block font-mono-code text-xs text-[#E2B755] uppercase tracking-widest mb-3">
          Legal
        </span>
        <h1 className="font-display text-4xl sm:text-5xl text-[#F4F4F6] tracking-tight">
          Returns &amp; 1-of-1 Policy
        </h1>
      </div>

      <div className="max-w-3xl mx-auto px-6 sm:px-10 lg:px-12 py-16 space-y-6 flex-1 w-full">
        {/* Important banner */}
        <div className="flex items-center space-x-3 px-5 py-4 rounded-xl bg-amber-500/10 border border-amber-500/30">
          <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
          <p className="text-xs font-medium text-amber-400 uppercase tracking-wider">
            Strict Final Sale On All 1-of-1 Vintage Archive Pieces
          </p>
        </div>

        <div className="luxury-card rounded-2xl p-8 space-y-6">
          <div className="flex items-start space-x-4">
            <div className="w-10 h-10 rounded-xl bg-[#E2B755]/10 border border-[#E2B755]/20 flex items-center justify-center shrink-0">
              <Package className="w-4 h-4 text-[#E2B755]" />
            </div>
            <div>
              <h2 className="font-display text-xl text-[#F4F4F6]">Archival Vintage — Final Sale</h2>
              <p className="text-sm text-[#8E8E98] leading-relaxed mt-2">
                Because each thrifted garment in our archive is singular (one-of-one), all sales
                of vintage thrift items are strictly final. We provide comprehensive
                high-resolution photographs, exact sizing measurements, and detailed condition
                notes on every listing. Please review all details carefully before purchasing.
              </p>
            </div>
          </div>

          <div className="border-t border-white/[0.06] pt-6 flex items-start space-x-4">
            <div className="w-10 h-10 rounded-xl bg-[#E2B755]/10 border border-[#E2B755]/20 flex items-center justify-center shrink-0">
              <RefreshCw className="w-4 h-4 text-[#E2B755]" />
            </div>
            <div>
              <h2 className="font-display text-xl text-[#F4F4F6]">In-House Basics — Exchange</h2>
              <p className="text-sm text-[#8E8E98] leading-relaxed mt-2">
                For our new in-house heavyweight basics (hoodies, graphic tees, cargo pants),
                unworn items with tags intact may be exchanged for a different size within{" "}
                <span className="text-[#F4F4F6] font-semibold">7 days of delivery</span>. To
                initiate an exchange, contact our team via WhatsApp or email. We cover return
                shipping on size exchanges.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
