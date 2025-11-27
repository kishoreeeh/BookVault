import React, { createContext, useContext, useEffect, useState } from 'react';

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const raw = localStorage.getItem('bookvault_cart');
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('bookvault_cart', JSON.stringify(cartItems));
    } catch (e) {
      // ignore
    }
  }, [cartItems]);

  const addToCart = (book, type = 'purchase') => {
    if (!book) return;

    const price = type === 'rental'
      ? (book?.rentalPrice ?? book?.rentPrice ?? book?.price ?? 0)
      : (book?.purchasePrice ?? book?.buyPrice ?? book?.price ?? 0);

    // Try to find existing item with same book id and type
    const existingIndex = cartItems.findIndex(ci => ci?.bookId === book?.id && ci?.type === type);

    if (existingIndex >= 0) {
      const updated = [...cartItems];
      updated[existingIndex] = { ...updated[existingIndex], quantity: (updated[existingIndex].quantity || 1) + 1 };
      setCartItems(updated);
      return;
    }

    const newItem = {
      id: Date.now() + Math.floor(Math.random() * 1000),
      bookId: book?.id,
      title: book?.title,
      author: book?.author,
      cover: book?.coverImage ?? book?.cover,
      type,
      price,
      quantity: 1,
      ...(type === 'rental' && { rentalDuration: '24h' })
    };

    setCartItems(prev => [...prev, newItem]);
  };

  const updateQuantity = (itemId, newQuantity) => {
    setCartItems(prev => prev?.map(item => item?.id === itemId ? { ...item, quantity: newQuantity } : item));
  };

  const removeItem = (itemId) => {
    setCartItems(prev => prev?.filter(item => item?.id !== itemId));
  };

  const updateRentalDuration = (itemId, duration) => {
    const priceMap = {
      '1h': 0.99,
      '4h': 2.99,
      '24h': 4.99,
      '1w': 9.99
    };

    setCartItems(prev => prev?.map(item => item?.id === itemId ? { ...item, rentalDuration: duration, price: priceMap?.[duration] ?? item.price } : item));
  };

  const clearCart = () => setCartItems([]);

  const calculateSubtotal = () => cartItems?.reduce((sum, item) => sum + (item?.price * (item?.quantity || 1)), 0);
  const calculateDiscount = () => cartItems?.reduce((sum, item) => sum + (item?.savings || 0), 0);
  const calculateTax = () => (calculateSubtotal() - (calculateDiscount() || 0)) * 0.08;
  const calculateTotal = () => Math.max(0, (calculateSubtotal() || 0) - (calculateDiscount() || 0) + (calculateTax() || 0));

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      updateQuantity,
      removeItem,
      updateRentalDuration,
      clearCart,
      calculateSubtotal,
      calculateDiscount,
      calculateTax,
      calculateTotal
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
};

export default CartContext;
