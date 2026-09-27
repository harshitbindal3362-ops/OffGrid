import React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, ShieldCheck } from "lucide-react";

export const SplitPromo: React.FC = () => {
  return (
    <section className="w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 py-20">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
        <div>
          <span className="font-mono-code text-xs text-[#E2B755] uppercase tracking-widest block mb-2">
            Curated Duality
          </span>
          <h2 className="font-display text-3xl sm:text-5xl text-[#F4F4F6] tracking-tight">
            Two Philosophies. One Sanctuary.
          </h2>
        </div>
        <Link
          href="/shop"
          className="text-xs uppercase tracking-widest text-[#8E8E98] hover:text-[#F4F4F6] transition-colors flex items-center space-x-1.5"
        >
          <span>Explore Entire Rail</span>
          <ArrowRight className="w-3.5 h-3.5 text-[#E2B755]" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Card 1: Vintage Relics */}
        <div className="luxury-card rounded-3xl p-8 sm:p-12 flex flex-col justify-between relative overflow-hidden bg-gradient-to-br from-[#16161B] via-[#121216] to-[#0A0A0C] border border-white/[0.08]">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#E2B755]/5 rounded-full blur-3xl pointer-events-none" />

          <div className="space-y-4 z-10">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-[11px] font-mono-code text-[#E2B755]">
              <Sparkles className="w-3 h-3" />
              <span>ARCHIVAL THRIFT 1/1</span>
            </div>
            <h3 className="font-display text-3xl sm:text-4xl text-[#F4F4F6] tracking-tight">
              One-of-One Relics
            </h3>
            <p className="text-sm text-[#8E8E98] leading-relaxed max-w-md">
              Individually discovered 90s tour merchandise, aged selvedge workwear, and singular vintage grails. Completely unique in history and wear. When secured, it leaves the archive forever.
            </p>
          </div>

          <div className="pt-10 z-10">
            <Link
              href="/shop?condition=THRIFTED"
              className="inline-flex items-center space-x-2 px-6 py-3.5 rounded-full bg-white/[0.06] hover:bg-white/[0.12] text-[#F4F4F6] border border-white/10 text-xs font-semibold uppercase tracking-wider transition-all"
              id="promo-shop-vintage"
            >
              <span>Explore Archival Vintage</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#E2B755]" />
            </Link>
          </div>
        </div>

        {/* Card 2: In-House Luxury Basics */}
        <div className="luxury-card rounded-3xl p-8 sm:p-12 flex flex-col justify-between relative overflow-hidden bg-gradient-to-br from-[#1A1A22] via-[#14141A] to-[#0A0A0C] border border-[#E2B755]/20">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#E2B755]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="space-y-4 z-10">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#E2B755]/10 border border-[#E2B755]/30 text-[11px] font-mono-code text-[#E2B755]">
              <ShieldCheck className="w-3 h-3" />
              <span>CUSTOM-MILLED ESSENTIALS</span>
            </div>
            <h3 className="font-display text-3xl sm:text-4xl text-[#F4F4F6] tracking-tight">
              Heavyweight In-House
            </h3>
            <p className="text-sm text-[#8E8E98] leading-relaxed max-w-md">
              Bespoke 500 GSM loopback cotton, seamless double-layer hoods, 300 GSM combed jersey tees, and tactical wide-leg trousers. Designed and produced in limited runs in New Delhi.
            </p>
          </div>

          <div className="pt-10 z-10">
            <Link
              href="/shop?condition=NEW"
              className="inline-flex items-center space-x-2 px-6 py-3.5 rounded-full bg-[#E2B755] hover:bg-[#F59E0B] text-[#0A0A0C] text-xs font-bold uppercase tracking-wider transition-all"
              id="promo-shop-basics"
            >
              <span>Explore In-House Staples</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
