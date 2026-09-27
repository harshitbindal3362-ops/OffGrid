"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { X, Trash2, ArrowRight, ShoppingBag, Sparkles } from "lucide-react";
import { useCartStore } from "@/lib/cart-store";
import { formatINR } from "@/lib/utils";
import { FREE_SHIPPING_THRESHOLD, SHIPPING_COST } from "@/lib/shipping";

export const CartDrawer: React.FC = () => {
  const { items, isOpen, closeCart, removeItem, updateQuantity, getSubtotal } = useCartStore();
  const subtotal = getSubtotal();
  const isFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD;
  const shippingCost = isFreeShipping ? 0 : SHIPPING_COST;
  const total = subtotal + shippingCost;
  const amountToFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const progressPercent = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeCart();
    };
    if (isOpen) window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, closeCart]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Dimmed backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={closeCart}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#121216] border-l border-white/[0.08] flex flex-col shadow-2xl text-[#F4F4F6]">
          {/* Header */}
          <div className="p-6 border-b border-white/[0.08] flex items-center justify-between bg-[#16161B]">
            <div className="flex items-center space-x-3">
              <ShoppingBag className="w-5 h-5 text-[#E2B755]" />
              <h2 className="font-display text-xl text-[#F4F4F6] tracking-tight">
                Your Bag ({items.reduce((s, i) => s + i.quantity, 0)})
              </h2>
            </div>
            <button
              onClick={closeCart}
              className="p-2 rounded-full text-[#8E8E98] hover:text-[#F4F4F6] hover:bg-white/[0.05] transition-colors cursor-pointer"
              id="cart-drawer-close"
              aria-label="Close Bag"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Insured Shipping Progress */}
          <div className="p-4 bg-[#0A0A0C] border-b border-white/[0.06] text-xs">
            <div className="flex justify-between items-center text-[#8E8E98] font-medium mb-2">
              <span className="text-[#F4F4F6]">
                {isFreeShipping ? "Insured Express Transit Unlocked" : `Add ${formatINR(amountToFreeShipping)} for Complimentary Insured Shipping`}
              </span>
              <span className="font-mono-code text-[11px] text-[#E2B755]">₹{FREE_SHIPPING_THRESHOLD.toLocaleString()} Goal</span>
            </div>
            <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#E2B755] transition-all duration-300 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Items Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-white/[0.03] border border-white/10 flex items-center justify-center text-[#5C5C66]">
                  <ShoppingBag className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="font-display text-lg text-[#F4F4F6]">Your Bag is Empty</h3>
                  <p className="text-xs text-[#8E8E98] mt-1.5 max-w-xs leading-relaxed">
                    Our 1-of-1 vintage relics and limited in-house runs sell rapidly. Browse the rail to claim your piece.
                  </p>
                </div>
                <Link
                  href="/shop"
                  onClick={closeCart}
                  className="px-6 py-2.5 rounded-full bg-[#E2B755] hover:bg-[#F59E0B] text-[#0A0A0C] text-xs font-bold uppercase tracking-wider transition-all"
                >
                  Explore Collection
                </Link>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.variantId}
                  className="flex space-x-4 p-4 rounded-2xl bg-[#16161B] border border-white/[0.06]"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-24 object-cover rounded-xl bg-[#0A0A0C] border border-white/10"
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h4 className="font-display text-sm text-[#F4F4F6] line-clamp-1 leading-snug">
                          {item.name}
                        </h4>
                        <button
                          onClick={() => removeItem(item.variantId)}
                          className="text-[#5C5C66] hover:text-red-400 p-1 transition-colors cursor-pointer"
                          aria-label={`Remove ${item.name}`}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <div className="flex items-center space-x-2 text-[11px] font-mono-code text-[#8E8E98] mt-1">
                        <span>SIZE: {item.size}</span>
                        {item.isOneOfOne && (
                          <span className="inline-flex items-center text-[#E2B755] px-1.5 py-0.2 rounded-full bg-[#E2B755]/10 text-[9px] font-bold">
                            <Sparkles className="w-2 h-2 mr-1" /> 1/1
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex justify-between items-center mt-3">
                      {item.isOneOfOne ? (
                        <span className="text-[10px] font-mono-code text-[#8E8E98] px-2 py-0.5 rounded-full bg-white/[0.04]">
                          Singular 1/1 Piece
                        </span>
                      ) : (
                        <div className="flex items-center rounded-full border border-white/10 bg-white/[0.02]">
                          <button
                            onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                            className="px-2.5 py-0.5 text-xs text-[#8E8E98] hover:text-[#F4F4F6] cursor-pointer"
                          >
                            -
                          </button>
                          <span className="px-2 text-xs font-semibold">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                            disabled={item.quantity >= item.maxStock}
                            className="px-2.5 py-0.5 text-xs text-[#8E8E98] hover:text-[#F4F4F6] disabled:opacity-20 cursor-pointer"
                          >
                            +
                          </button>
                        </div>
                      )}

                      <span className="font-display text-sm text-[#F4F4F6]">
                        {formatINR(item.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Subtotal */}
          {items.length > 0 && (
            <div className="p-6 border-t border-white/[0.08] bg-[#16161B] space-y-4">
              <div className="space-y-2 text-xs">
                <div className="flex justify-between text-[#8E8E98]">
                  <span>Subtotal</span>
                  <span className="font-semibold text-[#F4F4F6]">{formatINR(subtotal)}</span>
                </div>
                <div className="flex justify-between text-[#8E8E98]">
                  <span>Insured Express Shipping</span>
                  <span className="text-[#F4F4F6]">
                    {isFreeShipping ? "Complimentary" : `+${formatINR(SHIPPING_COST)}`}
                  </span>
                </div>
              </div>

              <div className="pt-3 border-t border-white/[0.06] flex justify-between items-baseline">
                <span className="font-display text-lg text-[#F4F4F6]">Estimated Total</span>
                <span className="font-display text-2xl text-[#E2B755]">
                  {formatINR(total)}
                </span>
              </div>

              <div className="space-y-2 pt-2">
                <Link
                  href="/checkout"
                  onClick={closeCart}
                  className="w-full py-4 rounded-full bg-[#E2B755] hover:bg-[#F59E0B] text-[#0A0A0C] font-bold text-xs uppercase tracking-wider flex items-center justify-center space-x-2 transition-all shadow-lg hover:shadow-xl hover:shadow-[#E2B755]/15"
                  id="cart-checkout-button"
                >
                  <span>Proceed to Secure Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <button
                  onClick={closeCart}
                  className="w-full py-2.5 text-xs uppercase tracking-wider text-[#8E8E98] hover:text-[#F4F4F6] text-center cursor-pointer transition-colors"
                >
                  Continue Browsing
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
