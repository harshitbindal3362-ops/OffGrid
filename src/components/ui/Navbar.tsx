"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCartStore } from "@/lib/cart-store";
import { cn } from "@/lib/utils";
import { ShoppingBag, Menu, X, Heart, Globe } from "lucide-react";

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const { toggleCart, getTotalItems } = useCartStore();
  const [totalCount, setTotalCount] = useState(0);
  const [leftDrawerOpen, setLeftDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setTotalCount(getTotalItems());
    const unsubscribe = useCartStore.subscribe((state) => {
      setTotalCount(state.items.reduce((sum, item) => sum + item.quantity, 0));
    });

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      unsubscribe();
      window.removeEventListener("scroll", handleScroll);
    };
  }, [getTotalItems]);

  const navLinks = [
    { href: "/shop", label: "Collection" },
    { href: "/shop?condition=THRIFTED", label: "Vintage 1/1" },
    { href: "/shop?condition=NEW", label: "Essentials" },
    { href: "/store", label: "Sanctuary" },
    { href: "/about", label: "Manifesto" },
  ];

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled ? "luxury-glass shadow-2xl" : "bg-[#0A0A0C]/90 backdrop-blur-md border-b border-white/[0.06]"
      )}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 h-20 flex items-center justify-between">
        {/* Left: Hamburger & Brand Logo */}
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setLeftDrawerOpen(true)}
            className="p-2 -ml-2 text-[#F4F4F6] hover:text-[#E2B755] transition-colors"
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          <Link
            href="/"
            className="font-display text-2xl sm:text-3xl text-[#F4F4F6] tracking-tight hover:opacity-80 transition-opacity flex items-center"
            id="nav-logo"
          >
            <span>OFFGRID</span>
            <span className="ml-2 w-1.5 h-1.5 rounded-full bg-[#E2B755] animate-pulse" />
          </Link>
          <span className="hidden lg:inline-block text-[10px] uppercase font-mono-code tracking-widest text-[#5C5C66] pl-3 border-l border-white/10">
            Delhi Atelier
          </span>
        </div>

        {/* Center: Curated Navigation Links */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-xs uppercase tracking-wider font-medium transition-colors py-1 relative",
                  isActive
                    ? "text-[#F4F4F6] font-semibold"
                    : "text-[#8E8E98] hover:text-[#F4F4F6]"
                )}
                id={`nav-link-${link.label.toLowerCase().replace(/[^a-z0-9]/g, "-")}`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#E2B755] rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right: Cart Button */}
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleCart}
            className="flex items-center space-x-2.5 px-4 py-2 bg-white/[0.04] hover:bg-white/[0.08] text-[#F4F4F6] border border-white/[0.08] hover:border-white/[0.18] rounded-full text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer"
            id="nav-bag-button"
            aria-label={`Shopping Bag, ${totalCount} items`}
          >
            <ShoppingBag className="w-3.5 h-3.5 text-[#E2B755]" />
            <span>Bag</span>
            <span className="px-1.5 py-0.2 rounded-full bg-[#E2B755] text-[#0A0A0C] font-bold text-[10px]">
              {totalCount}
            </span>
          </button>

          {/* Mobile Menu Toggle (Removed as we have left drawer now) */}
        </div>
      </div>

      {/* Left Sidebar Drawer */}
      {leftDrawerOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 z-[60] backdrop-blur-sm"
            onClick={() => setLeftDrawerOpen(false)}
          />
          
          {/* Drawer */}
          <div className="fixed top-0 left-0 h-[100dvh] w-[280px] sm:w-[320px] bg-[#0A0A0C] border-r border-white/[0.08] z-[70] transform transition-transform duration-300 ease-in-out overflow-y-auto flex flex-col">
            <div className="p-6 flex justify-end">
              <button
                onClick={() => setLeftDrawerOpen(false)}
                className="p-2 text-[#8E8E98] hover:text-[#F4F4F6] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="px-8 pb-8 flex-1 flex flex-col space-y-6">
              <Link href="/" onClick={() => setLeftDrawerOpen(false)} className="text-sm uppercase tracking-widest text-[#F4F4F6] hover:text-[#E2B755] transition-colors font-medium">Home</Link>
              <Link href="/shop" onClick={() => setLeftDrawerOpen(false)} className="text-sm uppercase tracking-widest text-[#F4F4F6] hover:text-[#E2B755] transition-colors font-medium">All products</Link>
              <Link href="/shop?category=TEES" onClick={() => setLeftDrawerOpen(false)} className="text-sm uppercase tracking-widest text-[#F4F4F6] hover:text-[#E2B755] transition-colors font-medium">Tees</Link>
              <Link href="/shop?category=BOTTOMS" onClick={() => setLeftDrawerOpen(false)} className="text-sm uppercase tracking-widest text-[#F4F4F6] hover:text-[#E2B755] transition-colors font-medium">Bottoms</Link>
              <Link href="/shop?category=OUTERWEAR" onClick={() => setLeftDrawerOpen(false)} className="text-sm uppercase tracking-widest text-[#F4F4F6] hover:text-[#E2B755] transition-colors font-medium">Outerwear</Link>
              <Link href="/shop?category=KNITWEAR" onClick={() => setLeftDrawerOpen(false)} className="text-sm uppercase tracking-widest text-[#F4F4F6] hover:text-[#E2B755] transition-colors font-medium">Knitwear</Link>
              <Link href="/contact" onClick={() => setLeftDrawerOpen(false)} className="text-sm uppercase tracking-widest text-[#F4F4F6] hover:text-[#E2B755] transition-colors font-medium pt-4 border-t border-white/[0.08]">Contact Us</Link>
              <Link href="/account/orders" onClick={() => setLeftDrawerOpen(false)} className="text-sm uppercase tracking-widest text-[#F4F4F6] hover:text-[#E2B755] transition-colors font-medium">Order Tracking</Link>
            </div>

            <div className="p-8 border-t border-white/[0.08] flex items-center justify-between">
              <Link href="/account" onClick={() => setLeftDrawerOpen(false)} className="flex items-center space-x-2 text-[#F4F4F6] hover:text-[#E2B755] transition-colors bg-white/[0.04] px-4 py-2 rounded-full border border-white/10">
                <Heart className="w-4 h-4" />
                <span className="text-xs uppercase tracking-wider font-semibold">Wishlist</span>
              </Link>
              <a href="#" className="p-2 text-[#8E8E98] hover:text-[#F4F4F6] transition-colors rounded-full bg-white/[0.04] border border-white/10">
                <Globe className="w-4 h-4" />
              </a>
            </div>
          </div>
        </>
      )}
    </header>
  );
};
