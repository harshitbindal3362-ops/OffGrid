import React from "react";
import Link from "next/link";
import { AdminNav } from "@/components/admin/AdminNav";
import { verifyAdminServerSide } from "@/lib/admin-auth";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isAdmin = await verifyAdminServerSide();

  // If not authenticated and not already on the login page
  if (!isAdmin) {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen bg-[#0A0A0C] text-[#F4F4F6] flex flex-col">
      <AdminNav />
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}
