"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Login failed");
      }

      router.push("/account");
      router.refresh();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Authentication error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-20 px-6 bg-[#0A0A0C]">
      <div className="w-full max-w-md luxury-card rounded-3xl p-8 sm:p-10 space-y-8 bg-[#121216] border border-white/[0.08]">
        <div className="text-center space-y-2">
          <h1 className="font-display text-3xl sm:text-4xl text-[#F4F4F6] tracking-tight">
            Client Login
          </h1>
          <p className="text-sm text-[#8E8E98]">
            Enter your credentials to access your archive.
          </p>
        </div>

        {error && (
          <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-medium text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div className="space-y-2">
            <label className="text-[11px] font-mono-code uppercase tracking-widest text-[#8E8E98]">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-5 py-3.5 rounded-xl bg-[#0A0A0C] border border-white/[0.08] text-sm text-[#F4F4F6] placeholder-[#5C5C66] focus:outline-none focus:border-[#E2B755]/50 transition-colors"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[11px] font-mono-code uppercase tracking-widest text-[#8E8E98]">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-5 py-3.5 rounded-xl bg-[#0A0A0C] border border-white/[0.08] text-sm text-[#F4F4F6] placeholder-[#5C5C66] focus:outline-none focus:border-[#E2B755]/50 transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-full bg-[#E2B755] hover:bg-[#F59E0B] disabled:opacity-50 text-[#0A0A0C] font-bold text-sm uppercase tracking-wider flex items-center justify-center space-x-2 transition-all cursor-pointer shadow-lg shadow-[#E2B755]/10 mt-2"
          >
            <span>{loading ? "Authenticating..." : "Sign In"}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center border-t border-white/[0.08] pt-6">
          <p className="text-xs text-[#8E8E98]">
            Do not have an account?{" "}
            <Link href="/signup" className="text-[#E2B755] hover:text-[#F4F4F6] transition-colors underline underline-offset-4">
              Create one here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
