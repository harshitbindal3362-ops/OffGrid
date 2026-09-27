"use client";

import React, { useState } from "react";
import Link from "next/link";
import { formatINR, cn } from "@/lib/utils";
import { useCartStore } from "@/lib/cart-store";
import { ArrowUpRight, Sparkles } from "lucide-react";

export interface ProductCardProps {
  product: {
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
  };
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addItem } = useCartStore();
  const [isHovered, setIsHovered] = useState(false);

  const totalStock = product.variants.reduce((sum, v) => sum + v.stock, 0);
  const isSoldOut = totalStock <= 0;
  const activeVariant = product.variants[0];

  const primaryImage = product.images[0]?.url || "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800";
  const hoverImage = product.images[1]?.url || primaryImage;

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (isSoldOut || !activeVariant || activeVariant.stock <= 0) return;

    addItem({
      productId: product.id,
      variantId: activeVariant.id,
      name: product.name,
      size: activeVariant.size,
      price: product.price,
      compareAtPrice: product.compareAtPrice,
      image: primaryImage,
      isOneOfOne: product.isOneOfOne,
      condition: product.condition,
      maxStock: activeVariant.stock,
    });
  };

  return (
    <div
      className="group luxury-card relative flex flex-col rounded-2xl overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      id={`product-card-${product.slug}`}
    >
      {/* Product Image Area */}
      <Link
        href={`/shop/${product.slug}`}
        className="relative block aspect-[4/5] w-full bg-[#101014] overflow-hidden"
      >
        {/* Badges */}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5 items-start">
          {product.isOneOfOne ? (
            <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#E2B755] text-[#0A0A0C]">
              <Sparkles className="w-2.5 h-2.5" />
              <span>Archival 1/1</span>
            </span>
          ) : (
            <span className="inline-block px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-white/10 backdrop-blur-md text-[#F4F4F6] border border-white/10">
              {product.condition === "NEW" ? "In-House" : product.condition}
            </span>
          )}
        </div>

        {/* Product Image */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={isHovered ? hoverImage : primaryImage}
          alt={product.images[0]?.altText || product.name}
          className={cn(
            "h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105",
            isSoldOut && "opacity-30 grayscale"
          )}
        />

        {/* Sold Out Overlay */}
        {isSoldOut && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-xs">
            <span className="px-4 py-1.5 rounded-full text-xs font-mono-code tracking-widest text-[#E2B755] border border-[#E2B755]/40 bg-[#0A0A0C]/80">
              EXHAUSTED / SOLD OUT
            </span>
          </div>
        )}
      </Link>

      {/* Meta Content Area */}
      <div className="p-5 flex flex-col justify-between flex-1 gap-4 bg-[#16161B]">
        <div>
          {/* Category & Sizing */}
          <div className="flex justify-between items-center text-[10px] font-mono-code text-[#8E8E98] mb-1.5">
            <span>{product.category}</span>
            <span>
              {product.isOneOfOne
                ? product.variants[0]?.size || "UNIQUE 1/1"
                : `${product.variants.length} SIZES`}
            </span>
          </div>

          {/* Product Title */}
          <Link href={`/shop/${product.slug}`}>
            <h3 className="font-display text-base text-[#F4F4F6] tracking-tight leading-snug line-clamp-1 group-hover:text-[#E2B755] transition-colors">
              {product.name}
            </h3>
          </Link>
        </div>

        {/* Price & Action Row */}
        <div className="flex items-center justify-between pt-3 border-t border-white/[0.06]">
          <div className="flex items-baseline space-x-2">
            <span className="font-display text-lg text-[#F4F4F6]">
              {formatINR(product.price)}
            </span>
            {product.compareAtPrice && product.compareAtPrice > product.price && (
              <span className="text-xs text-[#5C5C66] line-through font-medium">
                {formatINR(product.compareAtPrice)}
              </span>
            )}
          </div>

          {!isSoldOut ? (
            <button
              onClick={handleQuickAdd}
              className="p-2.5 rounded-full bg-white/[0.05] hover:bg-[#E2B755] hover:text-[#0A0A0C] text-[#F4F4F6] border border-white/[0.08] transition-all cursor-pointer"
              id={`add-to-bag-${product.slug}`}
              title="Add to Bag"
              aria-label={`Add ${product.name} to Bag`}
            >
              <ArrowUpRight className="w-4 h-4" />
            </button>
          ) : (
            <span className="text-[10px] font-mono-code text-[#5C5C66]">Archived</span>
          )}
        </div>
      </div>
    </div>
  );
};
