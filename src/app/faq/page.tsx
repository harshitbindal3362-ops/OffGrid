import React from "react";
import { Footer } from "@/components/ui/Footer";
import { Plus } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ — OFFGRID",
  description: "Frequently asked questions about OFFGRID.",
};

export default function FAQPage() {
  const faqs = [
    {
      q: "Are the 1-of-1 archive pieces actually authentic?",
      a: "Yes. Every vintage piece is meticulously authenticated, inspected, and documented by our curation team before it enters the sanctuary. We pride ourselves on provenance.",
    },
    {
      q: "Can I return a 1-of-1 piece if it doesn't fit?",
      a: "No. Because each thrifted garment in our archive is singular, all sales of vintage items are strictly final. We provide comprehensive exact sizing measurements on every listing. Please check these against your own garments before purchasing.",
    },
    {
      q: "When will my order arrive?",
      a: "All domestic orders are processed and dispatched within 48 hours. With our insured express shipping partners (Bluedart/Delhivery), expect delivery within 3–5 business days.",
    },
    {
      q: "How does the 'In-House Basics' exchange work?",
      a: "For our new in-house heavyweight basics (hoodies, tees, cargos), unworn items with tags intact may be exchanged for a different size within 7 days of delivery. We cover the return shipping.",
    },
  ];

  return (
    <div className="w-full min-h-screen flex flex-col bg-[#0A0A0C]">
      <div className="border-b border-white/[0.08] bg-gradient-to-b from-[#121216] to-[#0A0A0C] py-16 px-6 sm:px-10 lg:px-12 text-center">
        <span className="inline-block font-mono-code text-xs text-[#E2B755] uppercase tracking-widest mb-3">
          Support
        </span>
        <h1 className="font-display text-4xl sm:text-5xl text-[#F4F4F6] tracking-tight">
          Frequently Asked Questions
        </h1>
      </div>

      <div className="max-w-3xl mx-auto px-6 sm:px-10 lg:px-12 py-16 space-y-8 flex-1 w-full">
        <div className="luxury-card rounded-2xl p-8 divide-y divide-white/[0.08]">
          {faqs.map((faq, index) => (
            <div key={index} className="py-6 first:pt-0 last:pb-0 space-y-3">
              <h3 className="font-display text-lg text-[#F4F4F6] flex items-center space-x-2">
                <Plus className="w-4 h-4 text-[#E2B755]" />
                <span>{faq.q}</span>
              </h3>
              <p className="text-sm text-[#8E8E98] leading-relaxed pl-6">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
