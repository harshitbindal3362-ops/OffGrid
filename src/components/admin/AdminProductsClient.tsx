"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { formatINR } from "@/lib/utils";
import { Plus, Trash2, Edit2, Search } from "lucide-react";

interface AdminProductsClientProps {
  initialProducts: {
    id: string;
    slug: string;
    name: string;
    condition: string;
    category: string;
    isOneOfOne: boolean;
    price: number;
    compareAtPrice?: number | null;
    status: string;
    variants: { id: string; size: string; stock: number }[];
    images: { url: string }[];
  }[];
}

export const AdminProductsClient: React.FC<AdminProductsClientProps> = ({
  initialProducts,
}) => {
  const router = useRouter();
  const [products, setProducts] = useState(initialProducts);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCond, setFilterCond] = useState("ALL");

  const filtered = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCond = filterCond === "ALL" || p.condition === filterCond;
    return matchesSearch && matchesCond;
  });

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete "${name}"?`)) return;

    const res = await fetch(`/api/admin/products/${id}`, { method: "DELETE" });
    if (res.ok) {
      setProducts(products.filter((p) => p.id !== id));
      router.refresh();
    } else {
      alert("Failed to delete product");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center pb-4 border-b-[1.5px] border-[#1A1712] gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-[#8A8574]">
            INVENTORY MANAGEMENT
          </span>
          <h1 className="font-display text-3xl sm:text-4xl text-[#1A1712] tracking-tight">
            PRODUCT ARCHIVE ({products.length})
          </h1>
        </div>

        <Link
          href="/admin/products/new"
          className="px-4 py-2.5 bg-[#F2C511] text-[#1A1712] font-black text-xs uppercase tracking-widest border border-[#1A1712] hover:bg-[#D4A70A] flex items-center space-x-1.5"
          id="admin-add-product-btn"
        >
          <Plus className="w-4 h-4" />
          <span>NEW PRODUCT</span>
        </Link>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-wrap items-center gap-4 bg-[#FFFFFF] border-[1.5px] border-[#1A1712] p-4">
        <div className="flex-1 min-w-[200px] relative">
          <Search className="w-4 h-4 absolute left-3 top-3 text-[#8A8574]" />
          <input
            type="text"
            placeholder="SEARCH PRODUCTS..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-[#F5F0E1] border border-[#1A1712] text-xs font-bold uppercase placeholder-[#8A8574] focus:outline-hidden"
          />
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-xs font-bold uppercase text-[#8A8574]">TYPE:</span>
          <select
            value={filterCond}
            onChange={(e) => setFilterCond(e.target.value)}
            className="bg-[#F5F0E1] border border-[#1A1712] px-3 py-2 text-xs font-bold uppercase cursor-pointer"
          >
            <option value="ALL">ALL CONDITIONS</option>
            <option value="THRIFTED">THRIFTED (1/1)</option>
            <option value="NEW">NEW BASICS</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-[#FFFFFF] border-[1.5px] border-[#1A1712] overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b-[1.5px] border-[#1A1712] bg-[#E8E2CE] text-[#1A1712] font-black uppercase tracking-wider">
              <th className="p-3">PIECE</th>
              <th className="p-3">CONDITION</th>
              <th className="p-3">CATEGORY</th>
              <th className="p-3">PRICE</th>
              <th className="p-3">TOTAL STOCK</th>
              <th className="p-3">STATUS</th>
              <th className="p-3 text-right">ACTIONS</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1A1712]/10 font-medium text-[#1A1712]">
            {filtered.map((product) => {
              const totalStock = product.variants.reduce((s, v) => s + v.stock, 0);
              return (
                <tr key={product.id} className="hover:bg-[#F5F0E1]/60 transition-colors">
                  <td className="p-3 flex items-center space-x-3">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={product.images[0]?.url || "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=100"}
                      alt=""
                      className="w-10 h-10 object-cover bg-[#1A1712] border border-[#1A1712]"
                    />
                    <div>
                      <span className="font-bold uppercase block">{product.name}</span>
                      <span className="text-[10px] text-[#8A8574] font-mono">/{product.slug}</span>
                    </div>
                  </td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 text-[10px] font-bold uppercase bg-[#E8E2CE] border border-[#1A1712]">
                      {product.condition} {product.isOneOfOne ? "(1/1)" : ""}
                    </span>
                  </td>
                  <td className="p-3 uppercase font-bold text-[#8A8574]">{product.category}</td>
                  <td className="p-3 font-bold">{formatINR(product.price)}</td>
                  <td className="p-3">
                    {totalStock <= 0 ? (
                      <span className="text-red-600 font-bold uppercase">SOLD OUT (0)</span>
                    ) : (
                      <span className="font-bold">{totalStock} UNITS</span>
                    )}
                  </td>
                  <td className="p-3">
                    <span className="text-[10px] font-bold uppercase text-emerald-700 bg-emerald-50 px-1.5 py-0.5 border border-emerald-300">
                      {product.status}
                    </span>
                  </td>
                  <td className="p-3 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <Link
                        href={`/admin/products/${product.id}/edit`}
                        className="p-1.5 border border-[#1A1712] bg-[#FFFFFF] hover:bg-[#F2C511] transition-colors"
                        title="Edit Product"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </Link>
                      <button
                        onClick={() => handleDelete(product.id, product.name)}
                        className="p-1.5 border border-[#1A1712] bg-[#FFFFFF] text-red-600 hover:bg-red-500 hover:text-[#FFFFFF] transition-colors cursor-pointer"
                        title="Delete Product"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
