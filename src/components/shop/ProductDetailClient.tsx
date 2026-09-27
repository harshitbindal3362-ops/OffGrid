"use client";

import React, { useState } from "react";
import Link from "next/link";
import { formatINR, cn } from "@/lib/utils";
import { ProductCard } from "@/components/ui/ProductCard";
import { useCartStore } from "@/lib/cart-store";
import { ShieldCheck, Truck, RefreshCw, ArrowLeft, Sparkles, Check } from "lucide-react";

interface ProductDetailClientProps {
  product: {
    id: string;
    slug: string;
    name: string;
    description: string;
    condition: string;
    category: string;
    isOneOfOne: boolean;
    tag?: string | null;
    price: number;
    compareAtPrice?: number | null;
    images: { url: string; altText?: string | null }[];
    variants: { id: string; size: string; stock: number }[];
  };
  relatedProducts: {
    id: string;
    slug: string;
    name: string;
    condition: string;
    category: string;
    isOneOfOne: boolean;
    tag?: string | null;
    price: number;
    compareAtPrice?: number | null;
    images: { url: string; altText?: string | null }[];
    variants: { id: string; size: string; stock: number }[];
  }[];
}

export const ProductDetailClient: React.FC<ProductDetailClientProps> = ({
  product,
  relatedProducts,
}) => {
  const { addItem } = useCartStore();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [added, setAdded] = useState(false);

  const images = product.images.length > 0
    ? product.images
    : [{ url: "", altText: product.name }];

  const totalStock = product.variants.reduce((sum, v) => sum + v.stock, 0);
  const isSoldOut = totalStock <= 0;
  const activeVariant = product.variants[selectedVariantIndex] || product.variants[0];

  const handleAddToBag = () => {
    if (isSoldOut || !activeVariant || activeVariant.stock <= 0) return;

    addItem({
      productId: product.id,
      variantId: activeVariant.id,
      name: product.name,
      size: activeVariant.size,
      price: product.price,
      compareAtPrice: product.compareAtPrice,
      image: images[0].url,
      isOneOfOne: product.isOneOfOne,
      condition: product.condition,
      maxStock: activeVariant.stock,
    });

    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 py-10 flex-1">
      {/* Back button */}
      <div className="mb-8">
        <Link
          href="/shop"
          className="inline-flex items-center space-x-2 text-xs uppercase tracking-widest text-[#8E8E98] hover:text-[#F4F4F6] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Collection</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        {/* Left: Product Gallery */}
        <div className="lg:col-span-7 flex flex-col-reverse md:flex-row gap-4">
          {/* Thumbnails */}
          {images.length > 1 && (
            <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto max-h-[600px]">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={cn(
                    "w-20 h-24 shrink-0 rounded-xl overflow-hidden border transition-all cursor-pointer",
                    selectedImageIndex === idx
                      ? "border-[#E2B755] ring-2 ring-[#E2B755]/20"
                      : "border-white/10 hover:border-white/25"
                  )}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={img.url} alt={img.altText || ""} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Primary View */}
          <div className="flex-1 relative aspect-[4/5] rounded-3xl overflow-hidden bg-[#121216] border border-white/[0.08]">
            <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
              {product.isOneOfOne ? (
                <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#E2B755] text-[#0A0A0C]">
                  <Sparkles className="w-3 h-3" />
                  <span>Archival 1-of-1 Piece</span>
                </span>
              ) : (
                <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-black/60 backdrop-blur-md text-[#F4F4F6] border border-white/10">
                  {product.condition}
                </span>
              )}
            </div>

            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={images[selectedImageIndex]?.url || images[0].url}
              alt={product.name}
              className={cn("w-full h-full object-cover object-center", isSoldOut && "opacity-30 grayscale")}
            />

            {isSoldOut && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-xs">
                <span className="px-6 py-2.5 rounded-full text-sm font-mono-code tracking-widest text-[#E2B755] border border-[#E2B755]/40 bg-[#0A0A0C]/80">
                  ARCHIVE EXHAUSTED / SOLD OUT
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Right: Product Details & Buying Actions */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
          <div className="space-y-6">
            <div className="flex items-center space-x-3 text-xs font-mono-code text-[#8E8E98]">
              <span>{product.category}</span>
              <span>·</span>
              <span className={isSoldOut ? "text-red-400" : "text-[#E2B755]"}>
                {isSoldOut ? "PERMANENTLY ARCHIVED" : "AVAILABLE IN SANCTUARY"}
              </span>
            </div>

            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl text-[#F4F4F6] tracking-tight leading-tight">
              {product.name}
            </h1>

            {/* Pricing */}
            <div className="flex items-baseline space-x-3 pt-2">
              <span className="font-display text-3xl text-[#F4F4F6]">
                {formatINR(product.price)}
              </span>
              {product.compareAtPrice && product.compareAtPrice > product.price && (
                <span className="text-base text-[#5C5C66] line-through font-medium">
                  {formatINR(product.compareAtPrice)}
                </span>
              )}
            </div>

            {/* Description */}
            <div className="pt-4 border-t border-white/[0.08]">
              <p className="text-sm text-[#8E8E98] leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Size Selector */}
            <div className="pt-4 border-t border-white/[0.08] space-y-3">
              <div className="flex justify-between text-xs font-semibold uppercase tracking-wider text-[#F4F4F6]">
                <span>SELECT PROPORTION / SIZE</span>
                {product.isOneOfOne && (
                  <span className="text-[#E2B755]">SINGULAR SPECIFICATION</span>
                )}
              </div>

              <div className="grid grid-cols-3 gap-2.5">
                {product.variants.map((variant, idx) => {
                  const isSelected = selectedVariantIndex === idx;
                  const isOutOfStock = variant.stock <= 0;
                  return (
                    <button
                      key={variant.id}
                      type="button"
                      onClick={() => setSelectedVariantIndex(idx)}
                      disabled={isOutOfStock}
                      className={cn(
                        "py-3 px-2 rounded-xl text-xs font-semibold uppercase tracking-wider border transition-all cursor-pointer",
                        isSelected
                          ? "bg-[#E2B755] text-[#0A0A0C] border-[#E2B755] font-bold"
                          : "bg-white/[0.03] text-[#F4F4F6] border-white/10 hover:border-white/20",
                        isOutOfStock && "opacity-30 line-through cursor-not-allowed border-white/5"
                      )}
                    >
                      {variant.size}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Add to Bag CTA */}
            <div className="pt-4">
              <button
                onClick={handleAddToBag}
                disabled={isSoldOut || (activeVariant && activeVariant.stock <= 0)}
                className={cn(
                  "w-full py-4 rounded-full text-xs font-bold uppercase tracking-widest transition-all cursor-pointer flex items-center justify-center space-x-2",
                  isSoldOut || (activeVariant && activeVariant.stock <= 0)
                    ? "bg-white/5 text-[#5C5C66] cursor-not-allowed border border-white/5"
                    : added
                    ? "bg-emerald-500 text-[#0A0A0C]"
                    : "bg-[#E2B755] hover:bg-[#F59E0B] text-[#0A0A0C] shadow-lg hover:shadow-xl hover:shadow-[#E2B755]/15"
                )}
                id="pdp-add-to-bag-button"
              >
                {isSoldOut ? (
                  <span>Sold Out / In Archive</span>
                ) : added ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Added to Bag</span>
                  </>
                ) : (
                  <span>Add to Bag · {formatINR(product.price)}</span>
                )}
              </button>
            </div>
          </div>

          {/* Luxury Assurance Card */}
          <div className="luxury-card rounded-2xl p-5 space-y-4 text-xs bg-[#121216]/60 border border-white/[0.06]">
            <div className="flex items-start space-x-3">
              <ShieldCheck className="w-4 h-4 text-[#E2B755] shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-[#F4F4F6] block">
                  100% Provenance & Authenticity Verification
                </span>
                <span className="text-[#8E8E98]">
                  Every archive piece is inspected for weave density, wash distress authenticity, and historical origin.
                </span>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Truck className="w-4 h-4 text-[#E2B755] shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-[#F4F4F6] block">
                  Insured Priority Transit
                </span>
                <span className="text-[#8E8E98]">
                  Hand-packed in reinforced sustainable protective cases. Dispatched within 48 hours from New Delhi.
                </span>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <RefreshCw className="w-4 h-4 text-[#E2B755] shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-[#F4F4F6] block">
                  1-of-1 Archival Policy
                </span>
                <span className="text-[#8E8E98]">
                  All vintage sales are final due to their individual singularity. Exchanges available on new in-house basics.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="mt-28 pt-12 border-t border-white/[0.08]">
          <h3 className="font-display text-2xl sm:text-3xl text-[#F4F4F6] tracking-tight mb-8">
            Complementary Relics
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
