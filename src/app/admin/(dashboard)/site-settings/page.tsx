import React from "react";
import { prisma } from "@/lib/prisma";
import { AdminSiteSettingsClient } from "@/components/admin/AdminSiteSettingsClient";

export const dynamic = "force-dynamic";

export default async function AdminSiteSettingsPage() {
  const records = await prisma.siteSetting.findMany();
  const settings: Record<string, string> = {};
  records.forEach((r) => {
    settings[r.key] = r.value;
  });

  return <AdminSiteSettingsClient initialSettings={settings} />;
}
