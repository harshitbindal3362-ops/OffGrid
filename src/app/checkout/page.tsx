"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/lib/cart-store";
import { formatINR } from "@/lib/utils";
import { Lock, ArrowLeft, CheckCircle2, ShieldCheck, Package, Sparkles } from "lucide-react";
import { FREE_SHIPPING_THRESHOLD, SHIPPING_COST } from "@/lib/shipping";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getSubtotal, clearCart } = useCartStore();
  const subtotal = getSubtotal();
  const isFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD;
  const shippingCost = isFreeShipping ? 0 : SHIPPING_COST;
  const total = subtotal + shippingCost;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    fullName: "",
    address1: "",
    city: "",
    state: "Delhi",
    pincode: "",
    phone: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckoutSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/checkout/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          shippingAddress: formData,
          items: items.map((i) => ({
            productId: i.productId,
            variantId: i.variantId,
            quantity: i.quantity,
          })),
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Checkout failed");
      }

      clearCart();
      router.push(`/checkout/success?orderId=${data.orderId}`);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong processing your order.");
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-6 py-20 space-y-6">
        <div className="w-20 h-20 rounded-full bg-white/[0.03] border border-white/10 flex items-center justify-center">
          <Package className="w-8 h-8 text-[#5C5C66]" />
        </div>
        <div>
          <h1 className="font-display text-3xl text-[#F4F4F6]">Your Bag Is Empty</h1>
          <p className="text-sm text-[#8E8E98] mt-2 max-w-xs mx-auto leading-relaxed">
            You cannot checkout without items in your bag. Return to the archive to claim your piece.
          </p>
        </div>
        <Link
          href="/shop"
          className="inline-flex items-center space-x-2 px-8 py-4 rounded-full bg-[#E2B755] hover:bg-[#F59E0B] text-[#0A0A0C] font-bold text-xs uppercase tracking-wider transition-all"
        >
          <span>Return to Archive</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0A0C]">
      {/* Page Header */}
      <div className="border-b border-white/[0.08] bg-gradient-to-b from-[#121216] to-[#0A0A0C] py-12 px-6 sm:px-10 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <Link
            href="/shop"
            className="inline-flex items-center space-x-2 text-xs font-medium uppercase tracking-wider text-[#8E8E98] hover:text-[#F4F4F6] transition-colors mb-6"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Archive</span>
          </Link>

          <div className="flex items-center space-x-3">
            <Lock className="w-4 h-4 text-[#E2B755]" />
            <span className="font-mono-code text-xs text-[#E2B755] uppercase tracking-widest">
              Encrypted Secure Checkout
            </span>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl text-[#F4F4F6] tracking-tight mt-2">
            Complete Your Order
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Form Area */}
          <div className="lg:col-span-7 space-y-8">
            {error && (
              <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-medium flex flex-col space-y-3">
                <span>{error}</span>
                <button
                  type="button"
                  onClick={() => clearCart()}
                  className="px-4 py-2 self-start rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500 hover:text-white transition-colors"
                >
                  Clear Cart
                </button>
              </div>
            )}

            <form onSubmit={handleCheckoutSubmit} className="space-y-8">
              {/* Contact Info */}
              <div className="luxury-card rounded-2xl p-6 sm:p-8 space-y-4">
                <h2 className="font-display text-xl text-[#F4F4F6] tracking-tight">
                  Contact Information
                </h2>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-mono-code uppercase tracking-widest text-[#8E8E98]">
                    Email Address (for dispatch tracking)
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@domain.com"
                    className="w-full px-5 py-3.5 rounded-xl bg-[#0A0A0C] border border-white/[0.08] text-sm text-[#F4F4F6] placeholder-[#5C5C66] focus:outline-none focus:border-[#E2B755]/50 transition-colors"
                    id="checkout-email-input"
                  />
                </div>
              </div>

              {/* Shipping Destination */}
              <div className="luxury-card rounded-2xl p-6 sm:p-8 space-y-4">
                <h2 className="font-display text-xl text-[#F4F4F6] tracking-tight">
                  Shipping Destination
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2 space-y-1.5">
                    <label className="text-[11px] font-mono-code uppercase tracking-widest text-[#8E8E98]">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      required
                      value={formData.fullName}
                      onChange={handleChange}
                      className="w-full px-5 py-3.5 rounded-xl bg-[#0A0A0C] border border-white/[0.08] text-sm text-[#F4F4F6] placeholder-[#5C5C66] focus:outline-none focus:border-[#E2B755]/50 transition-colors"
                      id="checkout-fullname-input"
                    />
                  </div>
                  <div className="sm:col-span-2 space-y-1.5">
                    <label className="text-[11px] font-mono-code uppercase tracking-widest text-[#8E8E98]">
                      Street Address
                    </label>
                    <input
                      type="text"
                      name="address1"
                      required
                      value={formData.address1}
                      onChange={handleChange}
                      placeholder="House/Flat number, Street, Landmark"
                      className="w-full px-5 py-3.5 rounded-xl bg-[#0A0A0C] border border-white/[0.08] text-sm text-[#F4F4F6] placeholder-[#5C5C66] focus:outline-none focus:border-[#E2B755]/50 transition-colors"
                      id="checkout-address-input"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-mono-code uppercase tracking-widest text-[#8E8E98]">
                      City
                    </label>
                    <input
                      type="text"
                      name="city"
                      required
                      value={formData.city}
                      onChange={handleChange}
                      className="w-full px-5 py-3.5 rounded-xl bg-[#0A0A0C] border border-white/[0.08] text-sm text-[#F4F4F6] placeholder-[#5C5C66] focus:outline-none focus:border-[#E2B755]/50 transition-colors"
                      id="checkout-city-input"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-mono-code uppercase tracking-widest text-[#8E8E98]">
                      Pincode (6-digit)
                    </label>
                    <input
                      type="text"
                      name="pincode"
                      required
                      pattern="[0-9]{6}"
                      value={formData.pincode}
                      onChange={handleChange}
                      placeholder="110016"
                      className="w-full px-5 py-3.5 rounded-xl bg-[#0A0A0C] border border-white/[0.08] text-sm text-[#F4F4F6] placeholder-[#5C5C66] focus:outline-none focus:border-[#E2B755]/50 transition-colors"
                      id="checkout-pincode-input"
                    />
                  </div>
                  <div className="sm:col-span-2 space-y-1.5">
                    <label className="text-[11px] font-mono-code uppercase tracking-widest text-[#8E8E98]">
                      Phone Number (for SMS tracking)
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      pattern="[0-9]{10}"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="9876543210"
                      className="w-full px-5 py-3.5 rounded-xl bg-[#0A0A0C] border border-white/[0.08] text-sm text-[#F4F4F6] placeholder-[#5C5C66] focus:outline-none focus:border-[#E2B755]/50 transition-colors"
                      id="checkout-phone-input"
                    />
                  </div>
                </div>
              </div>

              {/* Trust Badge & Submit */}
              <div className="space-y-4">
                <div className="flex items-center space-x-3 p-4 rounded-xl bg-[#E2B755]/[0.07] border border-[#E2B755]/20">
                  <CheckCircle2 className="w-4 h-4 text-[#E2B755] shrink-0" />
                  <span className="text-xs font-medium text-[#E2B755]">
                    Test checkout mode — instant confirmation &amp; live stock decrement
                  </span>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-5 rounded-full bg-[#E2B755] hover:bg-[#F59E0B] disabled:opacity-50 text-[#0A0A0C] font-bold text-sm uppercase tracking-wider transition-all flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl hover:shadow-[#E2B755]/15 cursor-pointer"
                  id="checkout-submit-button"
                >
                  <Lock className="w-4 h-4" />
                  <span>
                    {loading ? "Verifying stock & placing order…" : `Confirm & Pay ${formatINR(total)}`}
                  </span>
                </button>

                <p className="text-center text-[11px] text-[#5C5C66] font-mono-code">
                  128-BIT SSL ENCRYPTED · INSURED EXPRESS DISPATCH WITHIN 48H
                </p>
              </div>
            </form>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-5">
            <div className="luxury-card rounded-2xl p-6 sm:p-8 space-y-6 sticky top-24">
              <h2 className="font-display text-xl text-[#F4F4F6] tracking-tight">Order Summary</h2>

              {/* Items */}
              <div className="space-y-4">
                {items.map((item) => (
                  <div
                    key={item.variantId}
                    className="flex space-x-4 p-3 rounded-xl bg-[#0A0A0C] border border-white/[0.05]"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-20 object-cover rounded-lg bg-[#121216] border border-white/10 shrink-0"
                    />
                    <div className="flex-1 flex flex-col justify-between min-w-0">
                      <div>
                        <h4 className="font-display text-sm text-[#F4F4F6] leading-snug line-clamp-2">
                          {item.name}
                        </h4>
                        <div className="flex items-center space-x-2 mt-1 text-[10px] font-mono-code text-[#8E8E98]">
                          <span>SIZE: {item.size}</span>
                          {item.isOneOfOne && (
                            <span className="inline-flex items-center space-x-0.5 text-[#E2B755] px-1.5 py-0.5 rounded-full bg-[#E2B755]/10 text-[9px]">
                              <Sparkles className="w-2 h-2" />
                              <span>1/1</span>
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-[11px] text-[#8E8E98] font-mono-code">
                          QTY: {item.quantity}
                        </span>
                        <span className="font-display text-sm text-[#F4F4F6]">
                          {formatINR(item.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="pt-4 border-t border-white/[0.08] space-y-3 text-xs">
                <div className="flex justify-between text-[#8E8E98]">
                  <span>Subtotal</span>
                  <span className="text-[#F4F4F6] font-semibold">{formatINR(subtotal)}</span>
                </div>
                <div className="flex justify-between text-[#8E8E98]">
                  <span>Insured Express Shipping</span>
                  <span className="text-[#F4F4F6]">
                    {isFreeShipping ? "Complimentary" : formatINR(shippingCost)}
                  </span>
                </div>
                {isFreeShipping && (
                  <div className="flex items-center space-x-2 text-[11px] text-[#E2B755] font-mono-code bg-[#E2B755]/[0.07] px-3 py-2 rounded-lg">
                    <ShieldCheck className="w-3 h-3" />
                    <span>Complimentary insured shipping unlocked</span>
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-white/[0.06] flex justify-between items-baseline">
                <span className="font-display text-lg text-[#F4F4F6]">Total</span>
                <span className="font-display text-3xl text-[#E2B755]">
                  {formatINR(total)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
