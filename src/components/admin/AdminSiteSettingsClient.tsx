"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Check } from "lucide-react";

interface AdminSiteSettingsProps {
  initialSettings: Record<string, string>;
}

export const AdminSiteSettingsClient: React.FC<AdminSiteSettingsProps> = ({
  initialSettings,
}) => {
  const router = useRouter();
  const [settings, setSettings] = useState(initialSettings);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (key: string, value: string) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    setError("");

    try {
      const res = await fetch("/api/admin/site-settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });

      if (!res.ok) throw new Error("Failed to update site settings");

      setSuccess(true);
      router.refresh();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Error saving settings");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl space-y-6">
      <div className="pb-4 border-b-[1.5px] border-[#1A1712]">
        <span className="text-xs font-bold uppercase tracking-widest text-[#8A8574]">
          STOREFRONT COPY CONTROL
        </span>
        <h1 className="font-display text-3xl sm:text-4xl text-[#1A1712] tracking-tight">
          DYNAMIC SITE SETTINGS
        </h1>
        <p className="text-xs text-[#8A8574] mt-1">
          Zero hardcoded marketing text. Changes saved here reflect instantly on the public site without redeployment.
        </p>
      </div>

      {success && (
        <div className="p-3 bg-emerald-100 border border-emerald-500 text-emerald-800 text-xs font-bold flex items-center space-x-2">
          <Check className="w-4 h-4" />
          <span>SITE SETTINGS UPDATED & CACHE REVALIDATED!</span>
        </div>
      )}

      {error && (
        <div className="p-3 bg-red-100 border border-red-500 text-red-700 text-xs font-bold">
          {error}
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        {/* Marquee Tickers */}
        <div className="bg-[#FFFFFF] border-[1.5px] border-[#1A1712] p-6 space-y-4">
          <h2 className="font-display text-lg text-[#1A1712] border-b pb-2">
            MARQUEE TICKERS
          </h2>

          <div className="space-y-1">
            <label className="text-[11px] font-bold uppercase text-[#1A1712]">
              TOP MARQUEE TICKER (YELLOW STRIP)
            </label>
            <input
              type="text"
              value={settings.tickerText || ""}
              onChange={(e) => handleChange("tickerText", e.target.value)}
              className="w-full p-2.5 bg-[#F5F0E1] border border-[#1A1712] text-xs font-bold focus:outline-hidden"
              id="admin-top-ticker-input"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-bold uppercase text-[#1A1712]">
              FOOTER MARQUEE TICKER (DARK STRIP)
            </label>
            <input
              type="text"
              value={settings.footerTickerText || ""}
              onChange={(e) => handleChange("footerTickerText", e.target.value)}
              className="w-full p-2.5 bg-[#F5F0E1] border border-[#1A1712] text-xs font-bold focus:outline-hidden"
              id="admin-footer-ticker-input"
            />
          </div>
        </div>

        {/* Hero Section Copy */}
        <div className="bg-[#FFFFFF] border-[1.5px] border-[#1A1712] p-6 space-y-4">
          <h2 className="font-display text-lg text-[#1A1712] border-b pb-2">
            HOMEPAGE HERO
          </h2>

          <div className="space-y-1">
            <label className="text-[11px] font-bold uppercase text-[#1A1712]">
              ANNOUNCEMENT BADGE
            </label>
            <input
              type="text"
              value={settings.announcementBar || ""}
              onChange={(e) => handleChange("announcementBar", e.target.value)}
              className="w-full p-2.5 bg-[#F5F0E1] border border-[#1A1712] text-xs font-bold uppercase focus:outline-hidden"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-bold uppercase text-[#1A1712]">
              HERO MAIN HEADLINE
            </label>
            <input
              type="text"
              value={settings.heroHeadline || ""}
              onChange={(e) => handleChange("heroHeadline", e.target.value)}
              className="w-full p-2.5 bg-[#F5F0E1] border border-[#1A1712] text-xs font-bold uppercase focus:outline-hidden"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-bold uppercase text-[#1A1712]">
              HERO SUBTITLE / MANIFESTO
            </label>
            <textarea
              rows={2}
              value={settings.heroSubhead || ""}
              onChange={(e) => handleChange("heroSubhead", e.target.value)}
              className="w-full p-2.5 bg-[#F5F0E1] border border-[#1A1712] text-xs font-medium focus:outline-hidden"
            />
          </div>
        </div>

        {/* Stat Numbers */}
        <div className="bg-[#FFFFFF] border-[1.5px] border-[#1A1712] p-6 space-y-4">
          <h2 className="font-display text-lg text-[#1A1712] border-b pb-2">
            STAT STRIP NUMERALS
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="text-[11px] font-bold uppercase text-[#1A1712]">
                PIECES REHOMED
              </label>
              <input
                type="text"
                value={settings.statPiecesRehomed || "12K+"}
                onChange={(e) => handleChange("statPiecesRehomed", e.target.value)}
                className="w-full p-2.5 bg-[#F5F0E1] border border-[#1A1712] text-xs font-bold focus:outline-hidden"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-bold uppercase text-[#1A1712]">
                UNIQUE INVENTORY
              </label>
              <input
                type="text"
                value={settings.statUniqueInventory || "1/1"}
                onChange={(e) => handleChange("statUniqueInventory", e.target.value)}
                className="w-full p-2.5 bg-[#F5F0E1] border border-[#1A1712] text-xs font-bold focus:outline-hidden"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-bold uppercase text-[#1A1712]">
                DISPATCH TIME
              </label>
              <input
                type="text"
                value={settings.statShippingTime || "48H"}
                onChange={(e) => handleChange("statShippingTime", e.target.value)}
                className="w-full p-2.5 bg-[#F5F0E1] border border-[#1A1712] text-xs font-bold focus:outline-hidden"
              />
            </div>
          </div>
        </div>

        {/* Physical Store */}
        <div className="bg-[#FFFFFF] border-[1.5px] border-[#1A1712] p-6 space-y-4">
          <h2 className="font-display text-lg text-[#1A1712] border-b pb-2">
            PHYSICAL STOREFRONT DETAILS (HAUZ KHAS)
          </h2>

          <div className="space-y-1">
            <label className="text-[11px] font-bold uppercase text-[#1A1712]">
              STORE ADDRESS
            </label>
            <input
              type="text"
              value={settings.storeAddress || ""}
              onChange={(e) => handleChange("storeAddress", e.target.value)}
              className="w-full p-2.5 bg-[#F5F0E1] border border-[#1A1712] text-xs font-medium focus:outline-hidden"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-bold uppercase text-[#1A1712]">
              OPERATING HOURS
            </label>
            <input
              type="text"
              value={settings.storeHours || ""}
              onChange={(e) => handleChange("storeHours", e.target.value)}
              className="w-full p-2.5 bg-[#F5F0E1] border border-[#1A1712] text-xs font-medium focus:outline-hidden"
            />
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={loading}
            className="px-8 py-3.5 bg-[#F2C511] text-[#1A1712] font-black text-xs uppercase tracking-widest border-[1.5px] border-[#1A1712] hover:bg-[#D4A70A] transition-colors cursor-pointer"
            id="admin-save-settings-btn"
          >
            {loading ? "UPDATING SETTINGS..." : "PUBLISH SITE SETTINGS"}
          </button>
        </div>
      </form>
    </div>
  );
};
