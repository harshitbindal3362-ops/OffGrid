"use client";
import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { MarqueeTicker } from "./MarqueeTicker";
import { TextHoverEffect, FooterBackgroundGradient } from "./TextHoverEffect";

interface FooterProps {
  footerTickerText?: string;
}

export const Footer: React.FC<FooterProps> = ({
  footerTickerText = "OFFGRID ARCHIVES · SINGULAR OBJECTS · MODERN UTILITY · HAUZ KHAS VILLAGE NEW DELHI",
}) => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setSubscribed(true);
        setEmail("");
      }
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="w-full bg-[#0E0E12] text-[#F4F4F6] border-t border-white/[0.08]">
      <MarqueeTicker text={footerTickerText} variant="dark" />

      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Brand Col */}
          <div className="md:col-span-6 space-y-6">
            <Link href="/" className="font-display text-3xl text-[#F4F4F6] tracking-tight block">
              OFFGRID<span className="text-[#E2B755]">.</span>
            </Link>
            <p className="text-xs text-[#8E8E98] max-w-sm leading-relaxed">
              An independent archive and design atelier stationed in Hauz Khas Village, New Delhi. Dedicated to the preservation of 1-of-1 vintage relics and the development of architectural, heavyweight staples.
            </p>

            {/* Newsletter */}
            <div className="space-y-3 pt-2">
              <span className="font-mono-code text-[11px] uppercase tracking-widest text-[#E2B755] block">
                Archival Priority Access
              </span>
              {subscribed ? (
                <div className="flex items-center space-x-2 text-xs font-semibold text-[#E2B755] py-2">
                  <Check className="w-4 h-4" />
                  <span>You are enrolled. Private drop notifications will arrive via email.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex max-w-md">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter collector email address"
                    required
                    className="flex-1 bg-[#16161B] border border-white/10 rounded-l-full px-5 py-3 text-xs text-[#F4F4F6] placeholder-[#5C5C66] focus:outline-hidden focus:border-[#E2B755]"
                    id="footer-email-input"
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-[#E2B755] hover:bg-[#F59E0B] text-[#0A0A0C] px-6 rounded-r-full font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer flex items-center justify-center"
                    id="footer-email-submit"
                  >
                    {loading ? "..." : <ArrowRight className="w-4 h-4" />}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-3 space-y-4">
            <span className="font-mono-code text-[11px] uppercase tracking-widest text-[#8E8E98] block">
              Collection
            </span>
            <ul className="space-y-2.5 text-xs font-medium">
              <li>
                <Link href="/shop" className="text-[#8E8E98] hover:text-[#F4F4F6] transition-colors">
                  The Complete Rail
                </Link>
              </li>
              <li>
                <Link href="/shop?condition=THRIFTED" className="text-[#8E8E98] hover:text-[#F4F4F6] transition-colors">
                  Archival 1-of-1 Vintage
                </Link>
              </li>
              <li>
                <Link href="/shop?condition=NEW" className="text-[#8E8E98] hover:text-[#F4F4F6] transition-colors">
                  In-House Heavyweights
                </Link>
              </li>
              <li>
                <Link href="/shop?category=TEES" className="text-[#8E8E98] hover:text-[#F4F4F6] transition-colors">
                  Graphic &amp; Tour Tees
                </Link>
              </li>
              <li>
                <Link href="/shop?category=OUTERWEAR" className="text-[#8E8E98] hover:text-[#F4F4F6] transition-colors">
                  Outerwear &amp; Hoodies
                </Link>
              </li>
            </ul>
          </div>

          {/* Sanctuary Links */}
          <div className="md:col-span-3 space-y-4">
            <span className="font-mono-code text-[11px] uppercase tracking-widest text-[#8E8E98] block">
              Sanctuary
            </span>
            <ul className="space-y-2.5 text-xs font-medium">
              <li>
                <Link href="/store" className="text-[#8E8E98] hover:text-[#F4F4F6] transition-colors">
                  Hauz Khas Village Atelier
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-[#8E8E98] hover:text-[#F4F4F6] transition-colors">
                  Brand Manifesto
                </Link>
              </li>
              <li>
                <Link href="/legal/shipping" className="text-[#8E8E98] hover:text-[#F4F4F6] transition-colors">
                  Insured Transit
                </Link>
              </li>
              <li>
                <Link href="/legal/returns" className="text-[#8E8E98] hover:text-[#F4F4F6] transition-colors">
                  Archive Terms &amp; 1/1 Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* TextHoverEffect Hero Banner */}
      <div className="relative w-full h-40 sm:h-52 overflow-hidden border-t border-white/[0.06] flex items-center justify-center">
        <FooterBackgroundGradient />
        <div className="relative z-10 w-full h-full">
          <TextHoverEffect text="OFFGRID" />
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="px-6 sm:px-10 lg:px-12 py-5 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#5C5C66] font-mono-code">
        <p>© {new Date().getFullYear()} OFFGRID SANCTUARY. ALL RIGHTS RESERVED.</p>
        <p className="mt-2 sm:mt-0">NEW DELHI · GLOBAL DISPATCH</p>
      </div>
    </footer>
  );
};
