import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // ✅ ADD TO CART (duplicate handle + quantity increase)
  const addToCart = (item) => {
    setCart((prev) => {
      const existingItem = prev.find((p) => p.id === item.id);

      if (existingItem) {
        // quantity increase
        return prev.map((p) =>
          p.id === item.id
            ? { ...p, quantity: (p.quantity || 1) + 1 }
            : p
        );
      }

      return [...prev, { ...item, quantity: 1 }];
    });
  };

  // ❌ REMOVE ITEM
  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  // ➖ DECREASE QUANTITY
  const decreaseQty = (id) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // 🧹 CLEAR
  const clearCart = () => setCart([]);

  // 💰 TOTAL PRICE
  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * (item.quantity || 1),
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        decreaseQty,
        clearCart,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);