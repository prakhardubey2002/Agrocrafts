import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => {
    const existingItem = cartItems.find(cartItem => cartItem._id === item._id);
    
    if (existingItem) {
      setCartItems(cartItems.map(cartItem => 
        cartItem._id === item._id ? {...cartItem, quantity: cartItem.quantity + 1} : cartItem
      ));
    } else {
      setCartItems([...cartItems, {...item, quantity: 1}]);
    }
  };

  const removeFromCart = (itemId) => {
    console.log(`Removing item with id: ${itemId}`);
    const newCartItems = cartItems.filter(item => item._id !== itemId);
    console.log("New cart items:", newCartItems);
    setCartItems(newCartItems);
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const increaseQuantity = (itemId) => {
    setCartItems(cartItems.map(item => 
      item._id === itemId ? {...item, quantity: item.quantity + 1} : item
    ));
  };

  const decreaseQuantity = (itemId) => {
    setCartItems(cartItems.map(item => 
      item._id === itemId ? {...item, quantity: Math.max(item.quantity - 1, 0)} : item
    ));
  };

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    const storedCartItems = localStorage.getItem('cartItems');
    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems));
    }
  }, []);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart, increaseQuantity, decreaseQuantity }}>
      {children}
    </CartContext.Provider>
  );
};
