import React from "react";
import { prisma } from "@/lib/prisma";
import { formatINR } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function AdminOrdersPage() {
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      items: true,
    },
  });

  return (
    <div className="space-y-6">
      <div className="pb-4 border-b-[1.5px] border-[#1A1712]">
        <span className="text-xs font-bold uppercase tracking-widest text-[#8A8574]">
          FULFILLMENT & REVENUE
        </span>
        <h1 className="font-display text-3xl sm:text-4xl text-[#1A1712] tracking-tight">
          ORDERS LOG ({orders.length})
        </h1>
      </div>

      <div className="bg-[#FFFFFF] border-[1.5px] border-[#1A1712] overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b-[1.5px] border-[#1A1712] bg-[#E8E2CE] text-[#1A1712] font-black uppercase tracking-wider">
              <th className="p-3">ORDER ID</th>
              <th className="p-3">CUSTOMER</th>
              <th className="p-3">DATE</th>
              <th className="p-3">ITEMS</th>
              <th className="p-3">TOTAL</th>
              <th className="p-3">STATUS</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1A1712]/10 font-medium text-[#1A1712]">
            {orders.length === 0 ? (
              <tr>
                <td colSpan={6} className="p-6 text-center text-[#8A8574]">
                  No orders recorded.
                </td>
              </tr>
            ) : (
              orders.map((order) => (
                <tr key={order.id} className="hover:bg-[#F5F0E1]/60">
                  <td className="p-3 font-mono font-bold">{order.id}</td>
                  <td className="p-3 font-bold">{order.email}</td>
                  <td className="p-3 text-[#8A8574]">
                    {new Date(order.createdAt).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>
                  <td className="p-3">
                    {order.items.map((it) => (
                      <div key={it.id} className="text-[11px]">
                        {it.productNameSnapshot} ({it.sizeSnapshot}) x {it.quantity}
                      </div>
                    ))}
                  </td>
                  <td className="p-3 font-bold text-sm">{formatINR(order.total)}</td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 text-[10px] font-bold uppercase bg-emerald-100 text-emerald-800 border border-emerald-300">
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
