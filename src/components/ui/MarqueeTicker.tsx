"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface MarqueeTickerProps {
  text: string;
  variant?: "dark" | "gold";
  className?: string;
}

export const MarqueeTicker: React.FC<MarqueeTickerProps> = ({
  text,
  variant = "dark",
  className,
}) => {
  const bgClass =
    variant === "gold"
      ? "bg-[#E2B755] text-[#0A0A0C] font-bold"
      : "bg-[#121216] text-[#8E8E98] border-y border-white/[0.06]";

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden py-3 font-mono-code text-xs select-none tracking-widest uppercase",
        bgClass,
        className
      )}
    >
      <div className="animate-luxury-marquee flex items-center whitespace-nowrap">
        <span className="mx-8">{text}</span>
        <span className="mx-8">{text}</span>
        <span className="mx-8">{text}</span>
        <span className="mx-8">{text}</span>
      </div>
    </div>
  );
};
