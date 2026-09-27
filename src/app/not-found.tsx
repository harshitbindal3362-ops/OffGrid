import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-6 text-center space-y-6 bg-[#0A0A0C]">
      <div className="relative">
        <span className="font-display text-[160px] sm:text-[240px] text-white/[0.03] leading-none select-none pointer-events-none">
          404
        </span>
        <div className="absolute inset-0 flex flex-col items-center justify-center space-y-2">
          <span className="inline-block font-mono-code text-xs text-[#E2B755] uppercase tracking-widest px-3 py-1 rounded-full bg-[#E2B755]/[0.08] border border-[#E2B755]/20">
            Archive Missing
          </span>
          <h1 className="font-display text-4xl sm:text-6xl text-[#F4F4F6] tracking-tight">
            Piece Not Found
          </h1>
        </div>
      </div>

      <p className="text-xs sm:text-sm text-[#8E8E98] max-w-sm leading-relaxed">
        The piece you are looking for has either sold out, moved to the physical archive in Hauz Khas
        Village, or does not exist.
      </p>

      <Link
        href="/shop"
        className="inline-flex items-center space-x-2 px-8 py-4 rounded-full bg-[#E2B755] hover:bg-[#F59E0B] text-[#0A0A0C] font-bold text-xs uppercase tracking-wider transition-all"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Return to the Archive</span>
      </Link>
    </div>
  );
}
