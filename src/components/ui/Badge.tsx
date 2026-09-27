import React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps {
  variant?: "yellow" | "black" | "outline";
  children: React.ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = "yellow",
  children,
  className,
}) => {
  const variantStyles = {
    yellow: "bg-[#F2C511] text-[#1A1712] font-black border border-[#1A1712]",
    black: "bg-[#1A1712] text-[#FFFFFF] font-bold border border-[#1A1712]",
    outline: "bg-transparent text-[#1A1712] border border-[#1A1712] font-bold",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center justify-center px-2 py-0.5 text-xs uppercase tracking-wider select-none",
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  );
};
