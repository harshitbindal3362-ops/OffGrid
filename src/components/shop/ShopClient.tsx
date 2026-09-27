"use client";

import React, { useState, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { ProductCard } from "@/components/ui/ProductCard";
import { FilterBar } from "@/components/ui/FilterBar";
import { Footer } from "@/components/ui/Footer";
import { Sparkles, RotateCcw } from "lucide-react";

interface ProductType {
  id: string;
  slug: string;
  name: string;
  condition: string;
  category: string;
  isOneOfOne: boolean;
  tag?: string | null;
  price: number;
  compareAtPrice?: number | null;
  createdAt: string | Date;
  images: { url: string; altText?: string | null }[];
  variants: { id: string; size: string; stock: number }[];
}

interface ShopClientProps {
  initialProducts: ProductType[];
  footerTickerText?: string;
}

export const ShopClient: React.FC<ShopClientProps> = ({
  initialProducts,
  footerTickerText,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const conditionParam = searchParams.get("condition")?.toUpperCase() || "ALL";
  const categoryParam = searchParams.get("category")?.toUpperCase() || "ALL";
  const sortParam = searchParams.get("sort") || "newest";

  const [condition, setCondition] = useState(conditionParam);
  const [category, setCategory] = useState(categoryParam);
  const [sort, setSort] = useState(sortParam);

  React.useEffect(() => {
    setCondition(searchParams.get("condition")?.toUpperCase() || "ALL");
    setCategory(searchParams.get("category")?.toUpperCase() || "ALL");
    setSort(searchParams.get("sort") || "newest");
  }, [searchParams]);

  const updateUrl = (newCond: string, newCat: string, newSort: string) => {
    const params = new URLSearchParams();
    if (newCond !== "ALL") params.set("condition", newCond);
    if (newCat !== "ALL") params.set("category", newCat);
    if (newSort !== "newest") params.set("sort", newSort);
    const queryString = params.toString();
    router.replace(`/shop${queryString ? `?${queryString}` : ""}`, { scroll: false });
  };

  const handleConditionChange = (c: string) => {
    setCondition(c);
    updateUrl(c, category, sort);
  };

  const handleCategoryChange = (cat: string) => {
    setCategory(cat);
    updateUrl(condition, cat, sort);
  };

  const handleSortChange = (s: string) => {
    setSort(s);
    updateUrl(condition, category, s);
  };

  const filteredProducts = useMemo(() => {
    return initialProducts
      .filter((p) => {
        if (condition !== "ALL" && p.condition.toUpperCase() !== condition) return false;
        if (category !== "ALL" && p.category.toUpperCase() !== category) return false;
        return true;
      })
      .sort((a, b) => {
        if (sort === "price-asc") return a.price - b.price;
        if (sort === "price-desc") return b.price - a.price;
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      });
  }, [initialProducts, condition, category, sort]);

  return (
    <div className="w-full min-h-screen flex flex-col bg-[#0A0A0C] text-[#F4F4F6]">
      {/* Header Banner */}
      <div className="border-b border-white/[0.08] bg-gradient-to-b from-[#121216] to-[#0A0A0C] py-16 px-6 sm:px-10 lg:px-12 text-center relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#E2B755]/5 rounded-full blur-3xl pointer-events-none" />

        <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-[11px] font-mono-code text-[#E2B755] mb-4">
          <Sparkles className="w-3 h-3" />
          <span>CURRENT ARCHIVE ROTATION</span>
        </span>
        <h1 className="font-display text-4xl sm:text-6xl text-[#F4F4F6] tracking-tight">
          The Entire Rail
        </h1>
        <p className="text-xs sm:text-sm text-[#8E8E98] max-w-lg mx-auto mt-3 leading-relaxed">
          Explore single-origin 90s vintage grails and heavyweight Delhi-milled essentials. Once a vintage piece is claimed, it is permanently locked from the public rail.
        </p>
      </div>

      {/* Sticky Filter Bar */}
      <FilterBar
        selectedCondition={condition}
        onConditionChange={handleConditionChange}
        selectedCategory={category}
        onCategoryChange={handleCategoryChange}
        selectedSort={sort}
        onSortChange={handleSortChange}
        totalPieces={filteredProducts.length}
      />

      {/* Product Grid */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 py-12 flex-1 w-full">
        {filteredProducts.length === 0 ? (
          <div className="py-24 text-center rounded-3xl border border-white/[0.08] bg-[#121216] p-8 space-y-4 max-w-lg mx-auto">
            <h2 className="font-display text-2xl text-[#F4F4F6]">
              No Pieces Found
            </h2>
            <p className="text-xs text-[#8E8E98]">
              No archive relics match your active filters. Try adjusting your condition or category selection.
            </p>
            <button
              onClick={() => {
                handleConditionChange("ALL");
                handleCategoryChange("ALL");
              }}
              className="px-6 py-2.5 rounded-full bg-[#E2B755] hover:bg-[#F59E0B] text-[#0A0A0C] text-xs font-bold uppercase tracking-wider inline-flex items-center space-x-2 transition-all cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Filters</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>

      <Footer footerTickerText={footerTickerText} />
    </div>
  );
};
