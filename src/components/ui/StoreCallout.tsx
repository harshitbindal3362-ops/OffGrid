import React from "react";
import Link from "next/link";
import { MapPin, Clock, ArrowUpRight } from "lucide-react";

interface StoreCalloutProps {
  address?: string;
  hours?: string;
}

export const StoreCallout: React.FC<StoreCalloutProps> = ({
  address = "Sanctuary 14, Hauz Khas Village, New Delhi, 110016",
  hours = "Tuesday — Sunday / 13:00 — 21:00",
}) => {
  return (
    <section className="w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 py-20">
      <div className="luxury-card rounded-3xl p-8 sm:p-14 bg-gradient-to-r from-[#14141A] to-[#16161F] border border-white/[0.08] relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Details */}
          <div className="lg:col-span-7 space-y-6">
            <span className="font-mono-code text-xs text-[#E2B755] uppercase tracking-widest block">
              Flagship Atelier
            </span>
            <h2 className="font-display text-4xl sm:text-6xl text-[#F4F4F6] tracking-tight leading-none">
              Visit The Sanctuary in Hauz Khas
            </h2>
            <p className="text-sm text-[#8E8E98] leading-relaxed max-w-lg">
              Step off the street into our New Delhi space. Explore unreleased archive racks, preview prototype cuts, audition vinyl on our custom sound system, and consult directly on sizing and provenance.
            </p>

            <div className="pt-4 space-y-3 text-xs font-medium text-[#8E8E98]">
              <div className="flex items-center space-x-3">
                <MapPin className="w-4 h-4 text-[#E2B755] shrink-0" />
                <span className="text-[#F4F4F6]">{address}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="w-4 h-4 text-[#E2B755] shrink-0" />
                <span>{hours}</span>
              </div>
            </div>

            <div className="pt-4">
              <Link
                href="/store"
                className="inline-flex items-center space-x-2 px-7 py-3.5 rounded-full bg-[#E2B755] hover:bg-[#F59E0B] text-[#0A0A0C] text-xs font-bold uppercase tracking-wider transition-all"
                id="sanctuary-directions-link"
              >
                <span>Store Hours & Private Appointments</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Right Image */}
          <div className="lg:col-span-5 relative aspect-square sm:aspect-4/3 lg:aspect-square rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?w=1000&auto=format&fit=crop&q=85"
              alt="OFFGRID sanctuary in Hauz Khas Village"
              className="w-full h-full object-cover object-center contrast-110"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
