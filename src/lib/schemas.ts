import { z } from "zod";

// Product schemas
export const ProductVariantSchema = z.object({
  id: z.string().optional(),
  size: z.string().min(1, "Size is required"),
  stock: z.number().int().min(0, "Stock cannot be negative"),
});

export const ProductImageSchema = z.object({
  id: z.string().optional(),
  url: z.string().url("Must be a valid image URL"),
  sortOrder: z.number().int().default(0),
  altText: z.string().optional().nullable(),
});

export const ProductInputSchema = z.object({
  name: z.string().min(2, "Product name must be at least 2 characters"),
  slug: z.string().min(2, "Slug is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  condition: z.enum(["THRIFTED", "NEW"]),
  category: z.enum(["TEES", "OUTERWEAR", "BOTTOMS", "KNITWEAR"]),
  isOneOfOne: z.boolean().default(false),
  tag: z.string().optional().nullable(),
  price: z.number().positive("Price must be greater than 0"),
  compareAtPrice: z.number().positive().optional().nullable(),
  status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]).default("PUBLISHED"),
  variants: z.array(ProductVariantSchema).min(1, "At least one size variant is required"),
  images: z.array(ProductImageSchema).optional().default([]),
});

// Cart & Checkout schemas
export const CartItemSchema = z.object({
  productId: z.string(),
  variantId: z.string(),
  name: z.string(),
  size: z.string(),
  price: z.number(),
  compareAtPrice: z.number().nullable().optional(),
  image: z.string(),
  isOneOfOne: z.boolean(),
  condition: z.string(),
  quantity: z.number().int().positive(),
  maxStock: z.number().int(),
});

export const CheckoutInputSchema = z.object({
  email: z.string().email("Valid email required"),
  items: z.array(
    z.object({
      variantId: z.string(),
      productId: z.string(),
      quantity: z.number().int().positive(),
    })
  ).min(1, "Cart cannot be empty"),
  shippingAddress: z.object({
    fullName: z.string().min(2, "Full name required"),
    address1: z.string().min(5, "Address line 1 required"),
    city: z.string().min(2, "City required"),
    state: z.string().min(2, "State required"),
    pincode: z.string().min(6, "Valid 6-digit pincode required"),
    phone: z.string().min(10, "10-digit phone number required"),
  }),
});

// Newsletter
export const NewsletterSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

// Site Settings update schema
export const SiteSettingsSchema = z.record(z.string(), z.string());
