import { describe, it, expect, beforeEach } from "vitest";
import { useCartStore } from "./cart-store";
import { formatINR } from "./utils";
import { ProductInputSchema, CheckoutInputSchema } from "./schemas";

describe("Cart & Financial Logic", () => {
  beforeEach(() => {
    useCartStore.getState().clearCart();
  });

  it("calculates subtotal and item count correctly", () => {
    const store = useCartStore.getState();

    store.addItem({
      productId: "p1",
      variantId: "v1",
      name: "Test Hoodie",
      size: "L",
      price: 2999,
      image: "test.jpg",
      isOneOfOne: false,
      condition: "NEW",
      maxStock: 5,
    }, 2);

    expect(useCartStore.getState().getTotalItems()).toBe(2);
    expect(useCartStore.getState().getSubtotal()).toBe(5998);
  });

  it("enforces strict 1-of-1 uniqueness constraint (max 1 quantity, no duplicates)", () => {
    const store = useCartStore.getState();

    const item = {
      productId: "p-thrift-1",
      variantId: "v-thrift-1",
      name: "Vintage Tour Tee",
      size: "L",
      price: 899,
      image: "tour.jpg",
      isOneOfOne: true,
      condition: "THRIFTED",
      maxStock: 1,
    };

    const firstAdd = store.addItem(item, 1);
    expect(firstAdd).toBe(true);
    expect(useCartStore.getState().items.length).toBe(1);
    expect(useCartStore.getState().items[0].quantity).toBe(1);

    // Attempting second add of 1/1 item must be rejected
    const secondAdd = useCartStore.getState().addItem(item, 1);
    expect(secondAdd).toBe(false);
    expect(useCartStore.getState().items.length).toBe(1);
    expect(useCartStore.getState().items[0].quantity).toBe(1);
  });

  it("respects max stock constraint on quantity updates", () => {
    const store = useCartStore.getState();

    store.addItem({
      productId: "p2",
      variantId: "v2",
      name: "Heavy Tee",
      size: "M",
      price: 1199,
      image: "tee.jpg",
      isOneOfOne: false,
      condition: "NEW",
      maxStock: 3,
    }, 1);

    // Try setting quantity beyond maxStock (3)
    useCartStore.getState().updateQuantity("v2", 10);
    expect(useCartStore.getState().items[0].quantity).toBe(3);
  });
});

describe("INR Formatting", () => {
  it("formats Indian Rupee currency properly", () => {
    const formatted = formatINR(1499);
    expect(formatted).toContain("1,499");
    expect(formatted).toContain("₹");
  });
});

describe("Zod Validation Schemas", () => {
  it("validates product inputs correctly", () => {
    const validProduct = {
      name: "Washed Trucker Jacket",
      slug: "washed-trucker-jacket",
      description: "Vintage jacket in pristine condition with authentic fade",
      condition: "THRIFTED" as const,
      category: "OUTERWEAR" as const,
      isOneOfOne: true,
      price: 2499,
      status: "PUBLISHED" as const,
      variants: [{ size: "XL", stock: 1 }],
      images: [{ url: "https://example.com/jacket.jpg", sortOrder: 0 }],
    };

    const result = ProductInputSchema.safeParse(validProduct);
    expect(result.success).toBe(true);
  });

  it("rejects checkout with negative or zero items", () => {
    const invalidCheckout = {
      email: "test@example.com",
      items: [],
      shippingAddress: {
        fullName: "Aman",
        address1: "HKV",
        city: "Delhi",
        state: "Delhi",
        pincode: "110016",
        phone: "9876543210",
      },
    };

    const result = CheckoutInputSchema.safeParse(invalidCheckout);
    expect(result.success).toBe(false);
  });
});
