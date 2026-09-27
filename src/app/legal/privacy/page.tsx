import React from "react";
import { Footer } from "@/components/ui/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — OFFGRID",
  description: "Privacy policy and data handling procedures for OFFGRID.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="w-full min-h-screen flex flex-col bg-[#0A0A0C]">
      <div className="border-b border-white/[0.08] bg-gradient-to-b from-[#121216] to-[#0A0A0C] py-16 px-6 sm:px-10 lg:px-12 text-center">
        <span className="inline-block font-mono-code text-xs text-[#E2B755] uppercase tracking-widest mb-3">
          Legal
        </span>
        <h1 className="font-display text-4xl sm:text-5xl text-[#F4F4F6] tracking-tight">
          Privacy Policy
        </h1>
      </div>

      <div className="max-w-3xl mx-auto px-6 sm:px-10 lg:px-12 py-16 space-y-8 flex-1 w-full text-[#8E8E98] text-sm leading-relaxed">
        <div className="luxury-card rounded-2xl p-8 space-y-6">
          <p>
            At OFFGRID, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or make a purchase.
          </p>

          <h2 className="font-display text-xl text-[#F4F4F6] pt-4">1. Information We Collect</h2>
          <p>
            We collect personal data that you provide to us directly when creating an account, placing an order, or signing up for our newsletter. This includes your name, email address, shipping address, and phone number.
          </p>

          <h2 className="font-display text-xl text-[#F4F4F6] pt-4">2. Payment Security</h2>
          <p>
            All financial transactions are processed securely through our trusted payment gateways. We do not store or process your credit card information directly on our servers. All transactions are encrypted via 128-bit SSL.
          </p>

          <h2 className="font-display text-xl text-[#F4F4F6] pt-4">3. Use of Your Information</h2>
          <p>
            The information we collect is used strictly for processing orders, providing customer support, and, with your consent, sending updates about new archive drops or exclusive collections.
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
}
