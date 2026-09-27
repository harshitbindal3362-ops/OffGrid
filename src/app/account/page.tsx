import React from "react";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { verifyCustomerSessionServerSide } from "@/lib/auth";
import Link from "next/link";
import { User, MapPin, Package, LogOut } from "lucide-react";
import { Footer } from "@/components/ui/Footer";

export default async function AccountPage() {
  const userId = await verifyCustomerSessionServerSide();
  if (!userId) redirect("/login");

  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: { savedAddresses: true },
  });

  if (!user) redirect("/login");

  return (
    <div className="w-full min-h-screen flex flex-col bg-[#0A0A0C]">
      <div className="border-b border-white/[0.08] bg-gradient-to-b from-[#121216] to-[#0A0A0C] py-16 px-6 sm:px-10 lg:px-12">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
          <div>
            <span className="inline-block font-mono-code text-xs text-[#E2B755] uppercase tracking-widest mb-3">
              Client Portal
            </span>
            <h1 className="font-display text-4xl sm:text-5xl text-[#F4F4F6] tracking-tight">
              Welcome, {user.name?.split(" ")[0] || "Client"}
            </h1>
          </div>
          <form action="/api/auth/logout" method="POST">
            <button
              type="submit"
              className="inline-flex items-center space-x-2 px-6 py-2.5 rounded-full bg-white/[0.05] border border-white/10 hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/20 text-sm font-bold uppercase tracking-wider text-[#F4F4F6] transition-all cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </form>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 sm:px-10 lg:px-12 py-16 space-y-8 flex-1 w-full text-[#8E8E98] text-sm">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Profile Overview */}
          <div className="luxury-card rounded-2xl p-8 space-y-4">
            <div className="flex items-center space-x-3 mb-6">
              <User className="w-5 h-5 text-[#E2B755]" />
              <h2 className="font-display text-xl text-[#F4F4F6]">Profile Details</h2>
            </div>
            <div className="space-y-1">
              <span className="text-[10px] font-mono-code uppercase tracking-widest text-[#5C5C66]">Full Name</span>
              <p className="text-[#F4F4F6]">{user.name}</p>
            </div>
            <div className="space-y-1 pt-2">
              <span className="text-[10px] font-mono-code uppercase tracking-widest text-[#5C5C66]">Email</span>
              <p className="text-[#F4F4F6]">{user.email}</p>
            </div>
          </div>

          {/* Orders Quick Link */}
          <div className="luxury-card rounded-2xl p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <Package className="w-5 h-5 text-[#E2B755]" />
                <h2 className="font-display text-xl text-[#F4F4F6]">Order Archive</h2>
              </div>
              <p className="text-[#8E8E98] leading-relaxed">
                Track your recent orders and view your purchase history.
              </p>
            </div>
            <Link href="/account/orders" className="inline-flex items-center justify-between w-full mt-6 px-5 py-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/5 transition-colors group">
              <span className="text-sm text-[#F4F4F6] font-medium uppercase tracking-wider">View Orders</span>
              <span className="text-[#E2B755] font-display text-lg group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>

          {/* Saved Addresses */}
          <div className="luxury-card rounded-2xl p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <MapPin className="w-5 h-5 text-[#E2B755]" />
                <h2 className="font-display text-xl text-[#F4F4F6]">Saved Addresses</h2>
              </div>
              {user.savedAddresses.length > 0 ? (
                <div className="space-y-1">
                  <p className="text-[#F4F4F6] font-medium">{user.savedAddresses[0].fullName}</p>
                  <p className="text-[#8E8E98] truncate">{user.savedAddresses[0].address1}</p>
                  <p className="text-[#8E8E98]">{user.savedAddresses[0].city}, {user.savedAddresses[0].pincode}</p>
                </div>
              ) : (
                <p className="text-[#8E8E98] leading-relaxed">No addresses saved yet.</p>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
