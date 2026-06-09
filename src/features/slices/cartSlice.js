import { createSlice, createSelector } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  totalItems: 0,
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      const existingItem = state.items.find((item) => item.id === product.id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...product, quantity: 1 });
      }

      state.totalItems = state.items.reduce(
        (sum, item) => sum + item.quantity,
        0,
      );
      state.totalPrice = state.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0,
      );
    },

    removeFromCart: (state, action) => {
      const productId = action.payload;
      state.items = state.items.filter((item) => item.id !== productId);

      state.totalItems = state.items.reduce(
        (sum, item) => sum + item.quantity,
        0,
      );
      state.totalPrice = state.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0,
      );
    },

    increaseQuantity: (state, action) => {
      const productId = action.payload;
      const item = state.items.find((item) => item.id === productId);
      if (item) {
        item.quantity += 1;
        state.totalItems += 1;
        state.totalPrice += item.price;
      }
    },

    decreaseQuantity: (state, action) => {
      const productId = action.payload;
      const item = state.items.find((item) => item.id === productId);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
        state.totalItems -= 1;
        state.totalPrice -= item.price;
      }
    },

    clearCart: (state) => {
      state.items = [];
      state.totalItems = 0;
      state.totalPrice = 0;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;

// Base selectors
export const selectCartItems = (state) => state.cart.items;
export const selectTotalItems = (state) => state.cart.totalItems;
export const selectTotalPrice = (state) => state.cart.totalPrice;

// Memoized derived selectors — only recompute when items array changes
export const selectCartItemCount = createSelector(selectCartItems, (items) =>
  items.reduce((sum, item) => sum + item.quantity, 0),
);

export const selectCartTotal = createSelector(selectCartItems, (items) =>
  items.reduce((sum, item) => sum + item.price * item.quantity, 0),
);

export const selectIsInCart = (productId) =>
  createSelector(selectCartItems, (items) =>
    items.some((item) => item.id === productId),
  );

export const selectCartItemById = (productId) =>
  createSelector(selectCartItems, (items) =>
    items.find((item) => item.id === productId),
  );
