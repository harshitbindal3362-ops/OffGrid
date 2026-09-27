"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { SlidersHorizontal } from "lucide-react";

interface FilterBarProps {
  selectedCondition: string;
  onConditionChange: (condition: string) => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  selectedSort: string;
  onSortChange: (sort: string) => void;
  totalPieces: number;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  selectedCondition,
  onConditionChange,
  selectedCategory,
  onCategoryChange,
  selectedSort,
  onSortChange,
  totalPieces,
}) => {
  const conditions = [
    { id: "ALL", label: "All Relics" },
    { id: "THRIFTED", label: "Vintage 1/1" },
    { id: "NEW", label: "In-House Basics" },
  ];

  const categories = [
    { id: "ALL", label: "All Categories" },
    { id: "TEES", label: "Tees" },
    { id: "OUTERWEAR", label: "Outerwear" },
    { id: "BOTTOMS", label: "Bottoms" },
    { id: "KNITWEAR", label: "Knitwear" },
  ];

  return (
    <div className="w-full bg-[#0A0A0C]/90 backdrop-blur-md border-b border-white/[0.08] py-4 sticky top-20 z-30">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 space-y-4">
        {/* Top Summary Row */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <span className="font-display text-xl sm:text-2xl text-[#F4F4F6] tracking-tight" id="pieces-counter">
              {totalPieces} Pieces
            </span>
            <span className="text-[11px] font-mono-code text-[#5C5C66] tracking-wider uppercase">
              Live in Sanctuary
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#8E8E98]" />
            <select
              id="sort-select"
              value={selectedSort}
              onChange={(e) => onSortChange(e.target.value)}
              aria-label="Sort products by"
              className="bg-[#16161B] text-[#F4F4F6] border border-white/10 rounded-full px-4 py-1.5 text-xs font-medium focus:outline-hidden focus:border-[#E2B755] cursor-pointer"
            >
              <option value="newest">Newest Arrivals</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Filter Controls Row */}
        <div className="flex flex-wrap items-center gap-4 pt-2 border-t border-white/[0.04]">
          {/* Condition Pills */}
          <div className="flex items-center space-x-1.5 p-1 rounded-full bg-white/[0.03] border border-white/[0.06]">
            {conditions.map((c) => {
              const isActive = selectedCondition === c.id;
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => onConditionChange(c.id)}
                  className={cn(
                    "px-3.5 py-1 rounded-full text-xs font-medium transition-all cursor-pointer",
                    isActive
                      ? "bg-[#E2B755] text-[#0A0A0C] font-bold shadow-md"
                      : "text-[#8E8E98] hover:text-[#F4F4F6]"
                  )}
                  id={`filter-condition-${c.id.toLowerCase()}`}
                >
                  {c.label}
                </button>
              );
            })}
          </div>

          {/* Category Pills */}
          <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 max-w-full">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => onCategoryChange(cat.id)}
                  className={cn(
                    "px-3.5 py-1 rounded-full text-xs font-medium transition-all whitespace-nowrap cursor-pointer",
                    isActive
                      ? "bg-white/15 text-[#F4F4F6] border border-white/20 font-semibold"
                      : "bg-white/[0.03] text-[#8E8E98] border border-white/[0.05] hover:text-[#F4F4F6]"
                  )}
                  id={`filter-category-${cat.id.toLowerCase()}`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
