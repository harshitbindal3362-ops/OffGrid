"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, ArrowRight } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("admin@offgrid.in");
  const [password, setPassword] = useState("admin123");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Login failed");
      }

      router.push("/admin");
      router.refresh();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Authentication error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0C] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-[#16161B] border border-white/[0.1] rounded-2xl p-8 space-y-6 shadow-2xl">
        <div className="space-y-1">
          <div className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-[#E2B755]/10 border border-[#E2B755]/30 text-[10px] font-mono-code text-[#E2B755] uppercase tracking-wider mb-3">
            <Lock className="w-3 h-3" />
            <span>Staff Access Only</span>
          </div>
          <h1 className="font-display text-3xl text-[#F4F4F6] tracking-tight">
            OFFGRID Admin Portal
          </h1>
          <p className="text-xs text-[#8E8E98]">
            Manage products, 1-of-1 inventory, tickers, and orders.
          </p>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-[11px] font-mono-code uppercase tracking-widest text-[#8E8E98]">
              Staff Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-xl bg-[#0A0A0C] border border-white/[0.08] text-sm text-[#F4F4F6] placeholder-[#5C5C66] focus:outline-none focus:border-[#E2B755]/50 transition-colors"
              id="admin-email-input"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[11px] font-mono-code uppercase tracking-widest text-[#8E8E98]">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-xl bg-[#0A0A0C] border border-white/[0.08] text-sm text-[#F4F4F6] placeholder-[#5C5C66] focus:outline-none focus:border-[#E2B755]/50 transition-colors"
              id="admin-password-input"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-full bg-[#E2B755] hover:bg-[#F59E0B] disabled:opacity-50 text-[#0A0A0C] font-bold text-sm uppercase tracking-wider flex items-center justify-center space-x-2 transition-all cursor-pointer"
            id="admin-login-submit"
          >
            <span>{loading ? "Authenticating..." : "Enter Control Dashboard"}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
