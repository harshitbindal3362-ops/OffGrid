"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Package, ShoppingCart, Sliders, Layers, LogOut, ExternalLink, Users } from "lucide-react";
import { cn } from "@/lib/utils";

export const AdminNav: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();

  const navItems = [
    { href: "/admin", label: "Dashboard", icon: Layers },
    { href: "/admin/products", label: "Products", icon: Package },
    { href: "/admin/orders", label: "Orders", icon: ShoppingCart },
    { href: "/admin/customers", label: "Customers", icon: Users },
    { href: "/admin/site-settings", label: "Site Settings", icon: Sliders },
  ];

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <header className="w-full bg-[#121216] text-[#F4F4F6] border-b border-white/[0.08] sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <Link href="/admin" className="font-display text-2xl tracking-tighter text-[#E2B755]">
            OFFGRID // ADMIN
          </Link>

          <nav className="hidden md:flex items-center space-x-4">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-[11px] font-mono-code uppercase tracking-wider transition-colors",
                    isActive
                      ? "bg-[#E2B755]/10 text-[#E2B755]"
                      : "text-[#8E8E98] hover:text-[#F4F4F6] hover:bg-white/[0.04]"
                  )}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="flex items-center space-x-4 text-[11px] font-mono-code uppercase tracking-wider">
          <Link
            href="/"
            target="_blank"
            className="hidden sm:flex items-center space-x-1 text-[#8E8E98] hover:text-[#E2B755]"
          >
            <span>View Live Store</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>

          <button
            onClick={handleLogout}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500 hover:text-white transition-colors cursor-pointer"
            id="admin-logout-button"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
};

