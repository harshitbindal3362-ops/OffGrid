import { prisma } from "@/lib/prisma";
import { format } from "date-fns";
import { User, Package } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminCustomersPage() {
  const users = await prisma.user.findMany({
    where: { role: "CUSTOMER" },
    orderBy: { createdAt: "desc" },
    include: {
      _count: {
        select: { orders: true },
      },
      orders: {
        select: { total: true },
      },
    },
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-display text-[#F4F4F6]">Customers</h1>
          <p className="text-sm text-[#8E8E98] mt-1">
            Manage your registered clients and view their purchase history.
          </p>
        </div>
      </div>

      <div className="bg-[#121216] border border-white/[0.08] rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-[#8E8E98]">
            <thead className="bg-[#0A0A0C] text-[#5C5C66] font-mono-code text-[10px] uppercase tracking-widest border-b border-white/[0.08]">
              <tr>
                <th className="px-6 py-4">Client</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Total Orders</th>
                <th className="px-6 py-4">Total Spent</th>
                <th className="px-6 py-4">Joined</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.05]">
              {users.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-[#5C5C66]">
                    No customers registered yet.
                  </td>
                </tr>
              ) : (
                users.map((user) => {
                  const totalSpent = user.orders.reduce((sum, order) => sum + order.total, 0);
                  
                  return (
                    <tr key={user.id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 rounded-full bg-white/[0.05] border border-white/10 flex items-center justify-center shrink-0">
                            <User className="w-4 h-4 text-[#8E8E98]" />
                          </div>
                          <div>
                            <div className="font-medium text-[#F4F4F6]">{user.name || "Unknown"}</div>
                            <div className="text-xs text-[#5C5C66] font-mono-code">{user.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-mono-code uppercase tracking-widest">
                          Active
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <Package className="w-3.5 h-3.5 text-[#5C5C66]" />
                          <span className="text-[#F4F4F6] font-mono-code">{user._count.orders}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-[#E2B755] font-mono-code">₹{totalSpent.toLocaleString('en-IN')}</span>
                      </td>
                      <td className="px-6 py-4 text-[#5C5C66] font-mono-code text-xs">
                        {format(user.createdAt, "MMM d, yyyy")}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
