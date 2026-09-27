import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItem {
  productId: string;
  variantId: string;
  name: string;
  size: string;
  price: number;
  compareAtPrice?: number | null;
  image: string;
  isOneOfOne: boolean;
  condition: string;
  quantity: number;
  maxStock: number;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addItem: (item: Omit<CartItem, "quantity">, quantity?: number) => boolean;
  removeItem: (variantId: string) => void;
  updateQuantity: (variantId: string, quantity: number) => void;
  clearCart: () => void;
  getSubtotal: () => number;
  getTotalItems: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),

      addItem: (newItem, quantity = 1) => {
        const currentItems = get().items;
        const existingIndex = currentItems.findIndex((i) => i.variantId === newItem.variantId);

        // 1-of-1 items constraint
        if (newItem.isOneOfOne) {
          if (existingIndex > -1) {
            // Already in cart, cannot add another 1-of-1 piece
            set({ isOpen: true });
            return false;
          }
          set({
            items: [...currentItems, { ...newItem, quantity: 1, maxStock: 1 }],
            isOpen: true,
          });
          return true;
        }

        // Multi-size in-house items
        if (existingIndex > -1) {
          const existing = currentItems[existingIndex];
          const newQty = Math.min(existing.quantity + quantity, existing.maxStock);
          const updated = [...currentItems];
          updated[existingIndex] = { ...existing, quantity: newQty };
          set({ items: updated, isOpen: true });
          return true;
        }

        const addQty = Math.min(quantity, newItem.maxStock);
        set({
          items: [...currentItems, { ...newItem, quantity: addQty }],
          isOpen: true,
        });
        return true;
      },

      removeItem: (variantId: string) => {
        set({ items: get().items.filter((i) => i.variantId !== variantId) });
      },

      updateQuantity: (variantId: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(variantId);
          return;
        }
        set({
          items: get().items.map((i) => {
            if (i.variantId === variantId) {
              const constrainedQty = i.isOneOfOne ? 1 : Math.min(quantity, i.maxStock);
              return { ...i, quantity: constrainedQty };
            }
            return i;
          }),
        });
      },

      clearCart: () => set({ items: [] }),

      getSubtotal: () => {
        return get().items.reduce((sum, item) => sum + item.price * item.quantity, 0);
      },

      getTotalItems: () => {
        return get().items.reduce((sum, item) => sum + item.quantity, 0);
      },
    }),
    {
      name: "offgrid-cart",
      partialize: (state) => ({ items: state.items }),
    }
  )
);
