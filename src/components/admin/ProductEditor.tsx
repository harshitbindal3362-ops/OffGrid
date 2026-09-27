"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Plus, Trash2, GripVertical, Check } from "lucide-react";

interface ProductEditorProps {
  product?: {
    id: string;
    slug: string;
    name: string;
    description: string;
    condition: string;
    category: string;
    isOneOfOne: boolean;
    tag?: string | null;
    price: number;
    compareAtPrice?: number | null;
    status: string;
    variants: { id?: string; size: string; stock: number }[];
    images: { id?: string; url: string; sortOrder: number; altText?: string | null }[];
  };
}

export const ProductEditor: React.FC<ProductEditorProps> = ({ product }) => {
  const router = useRouter();
  const isEditing = !!product;

  const [formData, setFormData] = useState({
    name: product?.name || "",
    slug: product?.slug || "",
    description: product?.description || "",
    condition: product?.condition || "THRIFTED",
    category: product?.category || "TEES",
    isOneOfOne: product?.isOneOfOne ?? true,
    tag: product?.tag || "",
    price: product?.price?.toString() || "",
    compareAtPrice: product?.compareAtPrice?.toString() || "",
    status: product?.status || "PUBLISHED",
  });

  const [variants, setVariants] = useState(
    product?.variants && product.variants.length > 0
      ? product.variants
      : [{ size: "ONE SIZE", stock: 1 }]
  );

  const [images, setImages] = useState(
    product?.images && product.images.length > 0
      ? product.images
      : [{ url: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800", sortOrder: 0, altText: "" }]
  );

  const [newImageUrl, setNewImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // Auto-generate slug from name if new
  const handleNameChange = (nameVal: string) => {
    setFormData((prev) => ({
      ...prev,
      name: nameVal,
      slug: !isEditing
        ? nameVal.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")
        : prev.slug,
    }));
  };

  // Drag and drop reordering simulation for images
  const moveImage = (index: number, direction: "up" | "down") => {
    const newIdx = direction === "up" ? index - 1 : index + 1;
    if (newIdx < 0 || newIdx >= images.length) return;
    const updated = [...images];
    const temp = updated[index];
    updated[index] = updated[newIdx];
    updated[newIdx] = temp;
    // update sortOrders
    setImages(updated.map((img, i) => ({ ...img, sortOrder: i })));
  };

  const addImage = () => {
    if (!newImageUrl || !newImageUrl.startsWith("http")) return;
    setImages([...images, { url: newImageUrl, sortOrder: images.length, altText: formData.name }]);
    setNewImageUrl("");
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  // Variants management
  const addVariant = () => {
    setVariants([...variants, { size: "M", stock: 1 }]);
  };

  const removeVariant = (index: number) => {
    setVariants(variants.filter((_, i) => i !== index));
  };

  const updateVariant = (index: number, field: "size" | "stock", val: string | number) => {
    const updated = [...variants];
    updated[index] = { ...updated[index], [field]: val };
    setVariants(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const payload = {
        name: formData.name,
        slug: formData.slug,
        description: formData.description,
        condition: formData.condition,
        category: formData.category,
        isOneOfOne: formData.isOneOfOne,
        tag: formData.tag || null,
        price: parseFloat(formData.price),
        compareAtPrice: formData.compareAtPrice ? parseFloat(formData.compareAtPrice) : null,
        status: formData.status,
        variants: variants.map((v) => ({
          id: v.id,
          size: v.size,
          stock: Number(v.stock),
        })),
        images: images.map((img, i) => ({
          url: img.url,
          sortOrder: i,
          altText: img.altText || formData.name,
        })),
      };

      const url = isEditing ? `/api/admin/products/${product.id}` : "/api/admin/products";
      const method = isEditing ? "PATCH" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to save product");
      }

      setSuccess(true);
      router.refresh();
      if (!isEditing) {
        router.push("/admin/products");
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Error saving product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between pb-4 border-b-[1.5px] border-[#1A1712]">
        <Link
          href="/admin/products"
          className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-[#8A8574] hover:text-[#1A1712]"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>BACK TO INVENTORY</span>
        </Link>
        <span className="font-mono text-xs font-bold text-[#8A8574]">
          {isEditing ? `EDITING: ${product.slug}` : "NEW PIECE CREATION"}
        </span>
      </div>

      {error && (
        <div className="p-3 bg-red-100 border border-red-500 text-red-700 text-xs font-bold">
          {error}
        </div>
      )}

      {success && (
        <div className="p-3 bg-emerald-100 border border-emerald-500 text-emerald-800 text-xs font-bold flex items-center space-x-2">
          <Check className="w-4 h-4" />
          <span>PRODUCT SAVED & REVALIDATED ON PUBLIC STORE!</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Core Product Info */}
        <div className="bg-[#FFFFFF] border-[1.5px] border-[#1A1712] p-6 space-y-4">
          <h2 className="font-display text-lg text-[#1A1712] border-b pb-2">
            ESSENTIAL METADATA
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[11px] font-bold uppercase text-[#1A1712]">PIECE NAME</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleNameChange(e.target.value)}
                required
                placeholder="FADED TOUR TEE '98"
                className="w-full p-2.5 bg-[#F5F0E1] border border-[#1A1712] text-xs font-bold uppercase focus:outline-hidden"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-bold uppercase text-[#1A1712]">URL SLUG</label>
              <input
                type="text"
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                required
                placeholder="faded-tour-tee-98"
                className="w-full p-2.5 bg-[#F5F0E1] border border-[#1A1712] text-xs font-mono focus:outline-hidden"
              />
            </div>

            <div className="sm:col-span-2 space-y-1">
              <label className="text-[11px] font-bold uppercase text-[#1A1712]">EDITORIAL DESCRIPTION</label>
              <textarea
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
                className="w-full p-2.5 bg-[#F5F0E1] border border-[#1A1712] text-xs font-medium focus:outline-hidden"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-bold uppercase text-[#1A1712]">CONDITION</label>
              <select
                value={formData.condition}
                onChange={(e) => {
                  const cond = e.target.value;
                  setFormData({
                    ...formData,
                    condition: cond,
                    isOneOfOne: cond === "THRIFTED",
                  });
                }}
                className="w-full p-2.5 bg-[#F5F0E1] border border-[#1A1712] text-xs font-bold uppercase"
              >
                <option value="THRIFTED">THRIFTED (VINTAGE ARCHIVE)</option>
                <option value="NEW">NEW (IN-HOUSE HEAVYWEIGHT)</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-bold uppercase text-[#1A1712]">CATEGORY</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full p-2.5 bg-[#F5F0E1] border border-[#1A1712] text-xs font-bold uppercase"
              >
                <option value="TEES">TEES</option>
                <option value="OUTERWEAR">OUTERWEAR</option>
                <option value="BOTTOMS">BOTTOMS</option>
                <option value="KNITWEAR">KNITWEAR</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-bold uppercase text-[#1A1712]">SELLING PRICE (₹)</label>
              <input
                type="number"
                step="1"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                required
                placeholder="1499"
                className="w-full p-2.5 bg-[#F5F0E1] border border-[#1A1712] text-xs font-bold"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-bold uppercase text-[#1A1712]">COMPARE-AT PRICE (₹ OPTIONAL)</label>
              <input
                type="number"
                step="1"
                value={formData.compareAtPrice}
                onChange={(e) => setFormData({ ...formData, compareAtPrice: e.target.value })}
                placeholder="2499"
                className="w-full p-2.5 bg-[#F5F0E1] border border-[#1A1712] text-xs font-bold"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-bold uppercase text-[#1A1712]">TAG / BADGE TEXT</label>
              <input
                type="text"
                value={formData.tag}
                onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
                placeholder="VINTAGE, 1 OF 1, RARE"
                className="w-full p-2.5 bg-[#F5F0E1] border border-[#1A1712] text-xs font-bold uppercase"
              />
            </div>

            <div className="flex items-center space-x-2 pt-6">
              <input
                type="checkbox"
                id="isOneOfOneCheck"
                checked={formData.isOneOfOne}
                onChange={(e) => setFormData({ ...formData, isOneOfOne: e.target.checked })}
                className="w-4 h-4 text-[#1A1712] border-[#1A1712] rounded-none cursor-pointer"
              />
              <label htmlFor="isOneOfOneCheck" className="text-xs font-bold uppercase tracking-wider text-[#1A1712] cursor-pointer">
                STRICT 1-OF-1 PIECE (AUTO-EXPIRES UPON SALE)
              </label>
            </div>
          </div>
        </div>

        {/* Variants / Sizing & Stock */}
        <div className="bg-[#FFFFFF] border-[1.5px] border-[#1A1712] p-6 space-y-4">
          <div className="flex justify-between items-center border-b pb-2">
            <h2 className="font-display text-lg text-[#1A1712]">
              SIZING & INVENTORY STOCK
            </h2>
            {!formData.isOneOfOne && (
              <button
                type="button"
                onClick={addVariant}
                className="px-3 py-1 bg-[#1A1712] text-[#F5F0E1] text-xs font-bold uppercase flex items-center space-x-1 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>ADD SIZE</span>
              </button>
            )}
          </div>

          <div className="space-y-3">
            {variants.map((v, idx) => (
              <div key={idx} className="flex items-center space-x-4 bg-[#F5F0E1] p-3 border border-[#1A1712]">
                <div className="flex-1 space-y-1">
                  <label className="text-[10px] font-bold uppercase text-[#8A8574]">SIZE LABEL</label>
                  <input
                    type="text"
                    value={v.size}
                    onChange={(e) => updateVariant(idx, "size", e.target.value)}
                    className="w-full p-2 bg-[#FFFFFF] border border-[#1A1712] text-xs font-bold uppercase"
                  />
                </div>
                <div className="w-32 space-y-1">
                  <label className="text-[10px] font-bold uppercase text-[#8A8574]">
                    STOCK UNITS {formData.isOneOfOne ? "(1/1 MAX 1)" : ""}
                  </label>
                  <input
                    type="number"
                    min="0"
                    max={formData.isOneOfOne ? 1 : 9999}
                    value={v.stock}
                    onChange={(e) => updateVariant(idx, "stock", parseInt(e.target.value) || 0)}
                    className="w-full p-2 bg-[#FFFFFF] border border-[#1A1712] text-xs font-bold"
                  />
                </div>
                {variants.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeVariant(idx)}
                    className="mt-4 p-2 text-red-600 hover:bg-red-100 border border-transparent hover:border-red-400 cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Image Gallery & Reordering */}
        <div className="bg-[#FFFFFF] border-[1.5px] border-[#1A1712] p-6 space-y-4">
          <h2 className="font-display text-lg text-[#1A1712] border-b pb-2">
            GALLERY PHOTOS (DRAG / REORDER)
          </h2>

          <div className="flex gap-2">
            <input
              type="url"
              placeholder="PASTE IMAGE URL (R2 / CDN / UNSPLASH)..."
              value={newImageUrl}
              onChange={(e) => setNewImageUrl(e.target.value)}
              className="flex-1 p-2 bg-[#F5F0E1] border border-[#1A1712] text-xs font-medium"
            />
            <button
              type="button"
              onClick={addImage}
              className="px-4 py-2 bg-[#F2C511] text-[#1A1712] text-xs font-bold uppercase border border-[#1A1712] hover:bg-[#D4A70A] cursor-pointer"
            >
              ADD PHOTO
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
            {images.map((img, idx) => (
              <div
                key={idx}
                className="relative aspect-square border-[1.5px] border-[#1A1712] bg-[#1A1712] overflow-hidden group"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={img.url} alt="" className="w-full h-full object-cover" />
                <div className="absolute top-1 left-1 bg-[#1A1712] text-[#F5F0E1] text-[10px] font-bold px-1.5 py-0.5 border border-[#FFFFFF]/30">
                  {idx === 0 ? "PRIMARY" : `#${idx + 1}`}
                </div>
                <div className="absolute bottom-1 right-1 flex space-x-1 bg-[#1A1712]/80 p-1 border border-[#FFFFFF]/20">
                  {idx > 0 && (
                    <button
                      type="button"
                      onClick={() => moveImage(idx, "up")}
                      className="px-1 text-xs text-[#F5F0E1] hover:text-[#F2C511]"
                      title="Move Left"
                    >
                      ←
                    </button>
                  )}
                  {idx < images.length - 1 && (
                    <button
                      type="button"
                      onClick={() => moveImage(idx, "down")}
                      className="px-1 text-xs text-[#F5F0E1] hover:text-[#F2C511]"
                      title="Move Right"
                    >
                      →
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => removeImage(idx)}
                    className="px-1 text-xs text-red-400 hover:text-red-300"
                    title="Remove"
                  >
                    ×
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end space-x-4 pt-4">
          <Link
            href="/admin/products"
            className="px-6 py-3 bg-[#E8E2CE] text-[#1A1712] font-bold text-xs uppercase tracking-widest border border-[#1A1712]"
          >
            CANCEL
          </Link>
          <button
            type="submit"
            disabled={loading}
            className="px-8 py-3.5 bg-[#F2C511] text-[#1A1712] font-black text-xs uppercase tracking-widest border-[1.5px] border-[#1A1712] hover:bg-[#D4A70A] transition-colors cursor-pointer"
            id="admin-product-save-btn"
          >
            {loading ? "SAVING & REVALIDATING..." : isEditing ? "UPDATE PRODUCT" : "PUBLISH PIECE"}
          </button>
        </div>
      </form>
    </div>
  );
};
