import React from "react";
import { Footer } from "@/components/ui/Footer";
import { Mail, MapPin, Hash } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact — OFFGRID",
  description: "Get in touch with the OFFGRID team.",
};

export default function ContactPage() {
  return (
    <div className="w-full min-h-screen flex flex-col bg-[#0A0A0C]">
      <div className="border-b border-white/[0.08] bg-gradient-to-b from-[#121216] to-[#0A0A0C] py-16 px-6 sm:px-10 lg:px-12 text-center">
        <span className="inline-block font-mono-code text-xs text-[#E2B755] uppercase tracking-widest mb-3">
          Concierge
        </span>
        <h1 className="font-display text-4xl sm:text-5xl text-[#F4F4F6] tracking-tight">
          Contact the Atelier
        </h1>
      </div>

      <div className="max-w-3xl mx-auto px-6 sm:px-10 lg:px-12 py-16 space-y-8 flex-1 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="luxury-card rounded-2xl p-8 space-y-4">
            <Mail className="w-6 h-6 text-[#E2B755]" />
            <h2 className="font-display text-xl text-[#F4F4F6]">Digital Correspondence</h2>
            <p className="text-sm text-[#8E8E98] leading-relaxed">
              For order inquiries, authentication questions, or press, reach our digital concierge team.
            </p>
            <a href="mailto:contact@offgrid.in" className="text-sm font-mono-code text-[#E2B755] hover:text-[#F4F4F6] block pt-2 transition-colors">
              contact@offgrid.in
            </a>
          </div>

          <div className="luxury-card rounded-2xl p-8 space-y-4">
            <MapPin className="w-6 h-6 text-[#E2B755]" />
            <h2 className="font-display text-xl text-[#F4F4F6]">Physical Archive</h2>
            <p className="text-sm text-[#8E8E98] leading-relaxed">
              Visit our sanctuary to view 1-of-1 archive pieces in person. By appointment only.
            </p>
            <p className="text-sm font-mono-code text-[#E2B755] pt-2">
              Hauz Khas Village, New Delhi
            </p>
          </div>
        </div>

        <div className="luxury-card rounded-2xl p-8 text-center space-y-4 bg-[#121216]">
          <Hash className="w-6 h-6 text-[#E2B755] mx-auto" />
          <h2 className="font-display text-xl text-[#F4F4F6]">Social Protocol</h2>
          <p className="text-sm text-[#8E8E98] max-w-md mx-auto">
            We drop new archive pieces weekly on Instagram. Follow the transmission to secure items before they hit the site.
          </p>
          <a href="#" className="inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-white/[0.05] border border-white/10 hover:bg-white/10 text-sm font-bold uppercase tracking-wider text-[#F4F4F6] transition-all">
            <span>@offgrid.in</span>
          </a>
        </div>
      </div>

      <Footer />
    </div>
  );
}
