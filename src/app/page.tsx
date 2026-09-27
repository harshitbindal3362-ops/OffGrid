import React from "react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { MarqueeTicker } from "@/components/ui/MarqueeTicker";
import { SplitPromo } from "@/components/ui/SplitPromo";
import { StoreCallout } from "@/components/ui/StoreCallout";
import { ProductCard } from "@/components/ui/ProductCard";
import { Footer } from "@/components/ui/Footer";
import { ArrowRight, Sparkles, Compass, ShieldCheck } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const settingsRecords = await prisma.siteSetting.findMany();
  const settings: Record<string, string> = {};
  settingsRecords.forEach((s) => {
    settings[s.key] = s.value;
  });

  const featuredCollection = await prisma.collection.findUnique({
    where: { name: "home-picks" },
  });

  let featuredIds: string[] = [];
  if (featuredCollection) {
    try {
      featuredIds = JSON.parse(featuredCollection.items);
    } catch {
      featuredIds = [];
    }
  }

  const products = await prisma.product.findMany({
    where: {
      id: { in: featuredIds },
      status: "PUBLISHED",
    },
    include: {
      images: { orderBy: { sortOrder: "asc" } },
      variants: true,
    },
  });

  const sortedProducts = featuredIds
    .map((id) => products.find((p) => p.id === id))
    .filter(Boolean) as typeof products;

  return (
    <div className="w-full flex flex-col bg-[#0A0A0C] text-[#F4F4F6] min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full pt-16 sm:pt-24 pb-20 sm:pb-28 overflow-hidden border-b border-white/[0.06]">
        {/* Ambient background glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#E2B755]/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Hero Content */}
            <div className="lg:col-span-7 space-y-8">
              {/* Badge */}
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono-code text-[#E2B755]">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{settings.heroBadge || "ARCHIVE DROP 04 // 2026"}</span>
              </div>

              {/* Main Headline */}
              <h1 className="font-display text-5xl sm:text-7xl lg:text-8xl tracking-tight leading-[0.95] text-[#F4F4F6]">
                Singular Provenance.<br />
                <span className="text-[#E2B755]">Archival Relics.</span>
              </h1>

              {/* Subhead */}
              <p className="text-sm sm:text-base text-[#8E8E98] max-w-xl leading-relaxed">
                {settings.heroSubhead ||
                  "A curated sanctuary of authenticated 1-of-1 vintage relics alongside custom-milled heavyweight brutalist staples. Conceived and archived in Hauz Khas Village, New Delhi."}
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  href="/shop"
                  className="px-8 py-4 rounded-full bg-[#E2B755] hover:bg-[#F59E0B] text-[#0A0A0C] font-bold text-xs uppercase tracking-wider transition-all flex items-center space-x-2 shadow-lg hover:shadow-xl hover:shadow-[#E2B755]/10"
                  id="hero-explore-btn"
                >
                  <span>Explore The Collection</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href="/store"
                  className="px-8 py-4 rounded-full bg-white/[0.04] hover:bg-white/[0.08] text-[#F4F4F6] border border-white/10 font-semibold text-xs uppercase tracking-wider transition-all flex items-center space-x-2"
                  id="hero-sanctuary-btn"
                >
                  <Compass className="w-4 h-4 text-[#E2B755]" />
                  <span>The Delhi Sanctuary</span>
                </Link>
              </div>

              {/* Hero Statistics */}
              <div className="pt-8 border-t border-white/[0.08] grid grid-cols-3 gap-6">
                <div>
                  <div className="font-display text-2xl sm:text-4xl text-[#F4F4F6]">
                    {settings.statPiecesRehomed || "14K+"}
                  </div>
                  <div className="text-[11px] font-mono-code text-[#5C5C66] mt-1">
                    PIECES ARCHIVED
                  </div>
                </div>
                <div>
                  <div className="font-display text-2xl sm:text-4xl text-[#E2B755]">
                    {settings.statUniqueInventory || "100%"}
                  </div>
                  <div className="text-[11px] font-mono-code text-[#5C5C66] mt-1">
                    VERIFIED AUTHENTIC
                  </div>
                </div>
                <div>
                  <div className="font-display text-2xl sm:text-4xl text-[#F4F4F6]">
                    {settings.statShippingTime || "48H"}
                  </div>
                  <div className="text-[11px] font-mono-code text-[#5C5C66] mt-1">
                    INSURED DISPATCH
                  </div>
                </div>
              </div>
            </div>

            {/* Right Hero Visual Banner */}
            <div className="lg:col-span-5 relative flex justify-center">
              <div className="relative w-full max-w-[460px] aspect-[4/5] rounded-3xl overflow-hidden border border-white/[0.12] luxury-card shadow-2xl bg-[#121216]">
                {/* Abstract texture overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#1A1A20] via-[#0D0D10] to-[#0A0A0C]" />
                <div className="absolute top-0 left-0 right-0 bottom-0 opacity-30" style={{backgroundImage: 'radial-gradient(circle at 30% 20%, #E2B755 0%, transparent 50%), radial-gradient(circle at 70% 80%, #B8942E 0%, transparent 50%)'}} />
                <div className="absolute inset-0 flex flex-col items-center justify-center space-y-4 z-10">
                  <span className="font-display text-6xl text-[#E2B755]/20 tracking-tighter select-none">OFFGRID</span>
                  <div className="w-16 h-[1px] bg-[#E2B755]/30" />
                  <span className="font-mono-code text-[10px] text-[#5C5C66] uppercase tracking-widest">Delhi Atelier</span>
                </div>
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-[#121216]/80 backdrop-blur-md border border-white/10 flex items-center justify-between z-20">
                  <div>
                    <span className="text-[10px] font-mono-code uppercase text-[#E2B755] block">
                      ARCHIVE SERIES // 2026
                    </span>
                    <span className="font-display text-sm text-[#F4F4F6]">
                      Sanctuary 14, Hauz Khas
                    </span>
                  </div>
                  <ShieldCheck className="w-5 h-5 text-[#E2B755]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Marquee Ticker */}
      <MarqueeTicker
        text={
          settings.tickerText ||
          "SPRING/SUMMER ARCHIVE DROP NOW LIVE · WORLDWIDE INSURED TRANSIT · ALL VINTAGE PIECES 1-OF-1 & AUTHENTICATED · FLAGSHIP SANCTUARY: HAUZ KHAS VILLAGE"
        }
        variant="gold"
      />

      {/* Two Philosophies Split Promo */}
      <SplitPromo />

      {/* Featured Collection Grid */}
      <section className="w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 py-20">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <span className="font-mono-code text-xs text-[#E2B755] uppercase tracking-widest block mb-2">
              Curated Rotation
            </span>
            <h2 className="font-display text-3xl sm:text-5xl text-[#F4F4F6] tracking-tight">
              Featured Acquisitions
            </h2>
          </div>

          <Link
            href="/shop"
            className="text-xs uppercase tracking-widest text-[#8E8E98] hover:text-[#F4F4F6] transition-colors flex items-center space-x-1.5"
            id="view-all-acquisitions"
          >
            <span>View All Pieces</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#E2B755]" />
          </Link>
        </div>

        {/* 3-Column Luxury Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Sanctuary Store Spotlight */}
      <StoreCallout
        address={settings.storeAddress}
        hours={settings.storeHours}
      />

      {/* Footer */}
      <Footer footerTickerText={settings.footerTickerText} />
    </div>
  );
}
