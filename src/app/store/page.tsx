import React from "react";
import { prisma } from "@/lib/prisma";
import { Footer } from "@/components/ui/Footer";
import { MapPin, Clock, Phone, Navigation, Wifi, Music } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Sanctuary — OFFGRID, Hauz Khas Village",
  description:
    "Visit OFFGRID's flagship atelier in Hauz Khas Village, New Delhi. Browse unreleased archive racks, feel the fabrics, and consult directly on sizing and provenance.",
};

export const dynamic = "force-dynamic";

export default async function StorePage() {
  const settingsRecords = await prisma.siteSetting.findMany();
  const settings: Record<string, string> = {};
  settingsRecords.forEach((s) => {
    settings[s.key] = s.value;
  });

  const address = settings.storeAddress || "Shop 14, Hauz Khas Village, New Delhi, India 110016";
  const hours = settings.storeHours || "Tuesday to Sunday: 13:00 – 21:00 (Mondays Closed)";

  const features = [
    { icon: Music, label: "Vinyl on the System", desc: "A curated selection plays while you browse" },
    { icon: Wifi, label: "Private Consultations", desc: "In-depth sizing and provenance sessions" },
    { icon: MapPin, label: "Archive Racks", desc: "Unreleased pieces not yet live online" },
  ];

  return (
    <div className="w-full min-h-screen flex flex-col bg-[#0A0A0C]">
      {/* Header */}
      <div className="relative border-b border-white/[0.08] bg-gradient-to-b from-[#121216] to-[#0A0A0C] py-20 sm:py-28 px-6 sm:px-10 lg:px-12 text-center overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#E2B755]/[0.07] rounded-full blur-[120px] pointer-events-none" />
        <div className="relative z-10 space-y-3 max-w-2xl mx-auto">
          <span className="inline-block font-mono-code text-xs text-[#E2B755] uppercase tracking-widest px-3 py-1 rounded-full bg-[#E2B755]/[0.08] border border-[#E2B755]/20">
            Hauz Khas Village · Flagship Atelier
          </span>
          <h1 className="font-display text-5xl sm:text-7xl text-[#F4F4F6] tracking-tight leading-[0.95]">
            The Sanctuary
          </h1>
          <p className="text-sm sm:text-base text-[#8E8E98] max-w-lg mx-auto leading-relaxed">
            Where our archive pieces live before they drop online. Come browse unreleased vintage
            racks, feel the fabrics, and listen to vinyl.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 py-16 sm:py-24 flex-1 w-full space-y-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Photos Grid */}
          <div className="lg:col-span-7 grid grid-cols-2 gap-4">
            <div className="aspect-square rounded-2xl overflow-hidden border border-white/[0.08]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?w=800&auto=format&fit=crop&q=80"
                alt="Store exterior"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="aspect-square rounded-2xl overflow-hidden border border-white/[0.08]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&auto=format&fit=crop&q=80"
                alt="Racks inside store"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="col-span-2 aspect-video rounded-2xl overflow-hidden border border-white/[0.08]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=1200&auto=format&fit=crop&q=80"
                alt="Archive display table"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>

          {/* Info Card */}
          <div className="lg:col-span-5 luxury-card rounded-3xl p-8 sm:p-10 space-y-6 sticky top-24">
            <div>
              <span className="inline-block px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono-code text-[10px] uppercase tracking-widest">
                Open to Public
              </span>
              <h2 className="font-display text-3xl text-[#F4F4F6] tracking-tight mt-3">
                Visit The Archive
              </h2>
            </div>

            <div className="space-y-5 divide-y divide-white/[0.06]">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 rounded-xl bg-[#E2B755]/10 flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4 text-[#E2B755]" />
                </div>
                <div>
                  <span className="font-mono-code text-[10px] uppercase tracking-widest text-[#8E8E98] block mb-1">
                    Location
                  </span>
                  <span className="text-sm text-[#F4F4F6] font-medium">{address}</span>
                  <span className="block text-xs text-[#8E8E98] mt-0.5">
                    Near Deer Park Lake gate, Hauz Khas Village
                  </span>
                </div>
              </div>

              <div className="pt-4 flex items-start space-x-4">
                <div className="w-8 h-8 rounded-xl bg-[#E2B755]/10 flex items-center justify-center shrink-0 mt-0.5">
                  <Clock className="w-4 h-4 text-[#E2B755]" />
                </div>
                <div>
                  <span className="font-mono-code text-[10px] uppercase tracking-widest text-[#8E8E98] block mb-1">
                    Operating Hours
                  </span>
                  <span className="text-sm text-[#F4F4F6] font-medium">{hours}</span>
                  <span className="block text-xs text-[#E2B755]/80 mt-0.5">
                    *Mondays closed for thrift sourcing runs
                  </span>
                </div>
              </div>

              <div className="pt-4 flex items-start space-x-4">
                <div className="w-8 h-8 rounded-xl bg-[#E2B755]/10 flex items-center justify-center shrink-0 mt-0.5">
                  <Phone className="w-4 h-4 text-[#E2B755]" />
                </div>
                <div>
                  <span className="font-mono-code text-[10px] uppercase tracking-widest text-[#8E8E98] block mb-1">
                    Contact Store
                  </span>
                  <span className="text-sm text-[#F4F4F6] font-medium">+91 98712 34567</span>
                  <span className="block text-xs text-[#8E8E98] mt-0.5">
                    WhatsApp concierge available during store hours
                  </span>
                </div>
              </div>
            </div>

            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent("Hauz Khas Village New Delhi")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-4 rounded-full bg-[#E2B755] hover:bg-[#F59E0B] text-[#0A0A0C] font-bold text-xs uppercase tracking-wider flex items-center justify-center space-x-2 transition-all"
              id="google-maps-directions-link"
            >
              <Navigation className="w-4 h-4" />
              <span>Open In Google Maps</span>
            </a>
          </div>
        </div>

        {/* Features Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {features.map(({ icon: Icon, label, desc }) => (
            <div key={label} className="luxury-card rounded-2xl p-6 flex items-start space-x-4">
              <div className="w-10 h-10 rounded-xl bg-[#E2B755]/10 border border-[#E2B755]/20 flex items-center justify-center shrink-0">
                <Icon className="w-4 h-4 text-[#E2B755]" />
              </div>
              <div>
                <h3 className="font-display text-sm text-[#F4F4F6]">{label}</h3>
                <p className="text-xs text-[#8E8E98] leading-relaxed mt-1">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
