import { create } from 'zustand';

export const useCartStore = create((set, get) => ({
  items: JSON.parse(localStorage.getItem('cartItems')) || [],
  isOpen: false,

  toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
  openCart: () => set({ isOpen: true }),
  closeCart: () => set({ isOpen: false }),

  addItem: (product) => {
    const items = get().items;
    const existingIndex = items.findIndex((item) => item._id === product._id);
    let newItems = [];

    if (existingIndex > -1) {
      newItems = items.map((item, idx) =>
        idx === existingIndex
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      newItems = [...items, { ...product, quantity: 1 }];
    }

    localStorage.setItem('cartItems', JSON.stringify(newItems));
    set({ items: newItems, isOpen: true }); // Automatically open cart drawer
  },

  removeItem: (productId) => {
    const items = get().items;
    const newItems = items.filter((item) => item._id !== productId);
    localStorage.setItem('cartItems', JSON.stringify(newItems));
    set({ items: newItems });
  },

  updateQuantity: (productId, quantity) => {
    if (quantity <= 0) {
      get().removeItem(productId);
      return;
    }
    const items = get().items;
    const newItems = items.map((item) =>
      item._id === productId ? { ...item, quantity } : item
    );
    localStorage.setItem('cartItems', JSON.stringify(newItems));
    set({ items: newItems });
  },

  clearCart: () => {
    localStorage.removeItem('cartItems');
    set({ items: [] });
  },

  getItemCount: () => {
    return get().items.reduce((acc, item) => acc + item.quantity, 0);
  },

  getCartTotal: () => {
    return get().items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  },
}));
