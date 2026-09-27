import React from "react";
import Link from "next/link";
import { Footer } from "@/components/ui/Footer";
import { ArrowRight, Zap, Heart, Globe } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Manifesto — OFFGRID",
  description:
    "One piece. One owner. No reprints. Learn about the OFFGRID ethos, our archive philosophy, and our roots in Hauz Khas Village, New Delhi.",
};

export default function AboutPage() {
  const pillars = [
    {
      icon: Zap,
      label: "No Reprints",
      body: "Every vintage piece we archive is a single object. Once it leaves the rail, it is gone from the public forever. There is no restocking. No second runs.",
    },
    {
      icon: Heart,
      label: "Textile Preservation",
      body: "We hunt down authentic 90s and early 2000s grails — faded tour tees, aged selvedge denim, and forgotten heavyweight jackets. Each piece carries irreplicable history.",
    },
    {
      icon: Globe,
      label: "Delhi Atelier",
      body: "Conceived and built in Hauz Khas Village. Our in-house heavyweight basics are custom-milled with 450–500 GSM French terry and combed jersey, produced in disciplined limited runs.",
    },
  ];

  return (
    <div className="w-full min-h-screen flex flex-col bg-[#0A0A0C]">
      {/* Hero Header */}
      <div className="relative border-b border-white/[0.08] bg-gradient-to-b from-[#121216] to-[#0A0A0C] py-20 sm:py-28 px-6 sm:px-10 lg:px-12 text-center overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#E2B755]/[0.07] rounded-full blur-[120px] pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto space-y-4">
          <span className="inline-block font-mono-code text-xs text-[#E2B755] uppercase tracking-widest px-3 py-1 rounded-full bg-[#E2B755]/[0.08] border border-[#E2B755]/20">
            Manifesto &amp; Roots
          </span>
          <h1 className="font-display text-5xl sm:text-7xl text-[#F4F4F6] tracking-tight leading-[0.95]">
            Born In<br />
            <span className="text-[#E2B755]">New Delhi.</span>
          </h1>
          <p className="text-sm sm:text-base text-[#8E8E98] max-w-xl mx-auto leading-relaxed">
            Founded at the crossroads of Hauz Khas Village street culture and sustainable textile
            preservation. We reject the disposable. We archive the irreplaceable.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 sm:px-10 lg:px-12 py-16 sm:py-24 space-y-16 flex-1 w-full">
        {/* Brand Statement */}
        <div className="luxury-card rounded-3xl p-8 sm:p-12 space-y-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#E2B755]/[0.05] rounded-full blur-3xl pointer-events-none" />
          <h2 className="font-display text-2xl sm:text-4xl text-[#F4F4F6] tracking-tight">
            One Piece. One Owner.<br />No Reprints.
          </h2>
          <div className="space-y-5 text-sm text-[#8E8E98] leading-relaxed">
            <p>
              OFFGRID was founded at the crossroads of Hauz Khas Village street culture and
              sustainable textile preservation. We reject the disposable nature of fast-fashion
              streetwear. Instead, we hunt down authentic 90s and early 2000s grails that tell a
              story — faded tour tees, workwear denim with real patina, and forgotten heavyweight
              jackets.
            </p>
            <p>
              Alongside our curated thrift archives, we produce our own in-house heavyweight
              basics. Custom-milled 450–500 GSM French terry, double-stitched seams, and boxy
              brutalist drapes built to outlast trends. Made in New Delhi. Made to last a
              generation.
            </p>
          </div>
        </div>

        {/* Three Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {pillars.map(({ icon: Icon, label, body }) => (
            <div
              key={label}
              className="luxury-card rounded-2xl p-6 space-y-3"
            >
              <div className="w-10 h-10 rounded-xl bg-[#E2B755]/10 border border-[#E2B755]/20 flex items-center justify-center">
                <Icon className="w-4 h-4 text-[#E2B755]" />
              </div>
              <h3 className="font-display text-base text-[#F4F4F6]">{label}</h3>
              <p className="text-xs text-[#8E8E98] leading-relaxed">{body}</p>
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div className="flex flex-wrap gap-4 pt-2">
          <Link
            href="/shop"
            className="inline-flex items-center space-x-2 px-8 py-4 rounded-full bg-[#E2B755] hover:bg-[#F59E0B] text-[#0A0A0C] font-bold text-xs uppercase tracking-wider transition-all shadow-lg hover:shadow-xl hover:shadow-[#E2B755]/15"
            id="about-explore-archive"
          >
            <span>Explore The Archive</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/store"
            className="inline-flex items-center space-x-2 px-8 py-4 rounded-full bg-white/[0.04] hover:bg-white/[0.08] text-[#F4F4F6] border border-white/10 font-semibold text-xs uppercase tracking-wider transition-all"
            id="about-visit-sanctuary"
          >
            <span>Visit The Sanctuary</span>
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
}
