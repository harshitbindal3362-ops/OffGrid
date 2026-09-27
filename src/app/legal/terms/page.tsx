import React from "react";
import { Footer } from "@/components/ui/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions — OFFGRID",
  description: "Terms and conditions of service for OFFGRID.",
};

export default function TermsPage() {
  return (
    <div className="w-full min-h-screen flex flex-col bg-[#0A0A0C]">
      <div className="border-b border-white/[0.08] bg-gradient-to-b from-[#121216] to-[#0A0A0C] py-16 px-6 sm:px-10 lg:px-12 text-center">
        <span className="inline-block font-mono-code text-xs text-[#E2B755] uppercase tracking-widest mb-3">
          Legal
        </span>
        <h1 className="font-display text-4xl sm:text-5xl text-[#F4F4F6] tracking-tight">
          Terms &amp; Conditions
        </h1>
      </div>

      <div className="max-w-3xl mx-auto px-6 sm:px-10 lg:px-12 py-16 space-y-8 flex-1 w-full text-[#8E8E98] text-sm leading-relaxed">
        <div className="luxury-card rounded-2xl p-8 space-y-6">
          <p>
            Welcome to OFFGRID. By accessing or using our website, you agree to be bound by the following terms and conditions. Please read them carefully before making any purchases.
          </p>

          <h2 className="font-display text-xl text-[#F4F4F6] pt-4">1. 1-of-1 Archive Pieces</h2>
          <p>
            Due to the vintage and singular nature of our archival pieces, all sales for 1-of-1 garments are strictly final. We guarantee the authenticity and provenance of each item. Minor distress and wear are inherent characteristics of vintage garments.
          </p>

          <h2 className="font-display text-xl text-[#F4F4F6] pt-4">2. Intellectual Property</h2>
          <p>
            All content on this website, including but not limited to text, graphics, logos, images, and software, is the property of OFFGRID and is protected by international copyright laws.
          </p>

          <h2 className="font-display text-xl text-[#F4F4F6] pt-4">3. Governing Law</h2>
          <p>
            These Terms shall be governed by and construed in accordance with the laws of India. Any disputes arising out of these terms will be subject to the exclusive jurisdiction of the courts in New Delhi.
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
}
