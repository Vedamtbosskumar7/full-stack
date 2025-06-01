import React, { createContext, useContext, useState, ReactNode } from 'react';
import { MenuItem, Order, CartItem } from '../types';

interface OrderContextType {
  cart: CartItem[];
  orders: Order[];
  addToCart: (item: MenuItem, quantity: number) => void;
  removeFromCart: (itemId: string) => void;
  updateCartItemQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  calculateTotal: () => number;
  placeOrder: (type: 'dine-in' | 'take-away', tableId?: string) => void;
  updateOrderStatus: (orderId: string, status: string) => void;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);

  const addToCart = (item: MenuItem, quantity: number) => {
    const existingItem = cart.find(cartItem => cartItem.item.id === item.id);
    
    if (existingItem) {
      setCart(cart.map(cartItem => 
        cartItem.item.id === item.id 
          ? { ...cartItem, quantity: cartItem.quantity + quantity } 
          : cartItem
      ));
    } else {
      setCart([...cart, { item, quantity }]);
    }
  };

  const removeFromCart = (itemId: string) => {
    setCart(cart.filter(item => item.item.id !== itemId));
  };

  const updateCartItemQuantity = (itemId: string, quantity: number) => {
    setCart(cart.map(item => 
      item.item.id === itemId ? { ...item, quantity } : item
    ));
  };

  const clearCart = () => {
    setCart([]);
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + (item.item.price * item.quantity), 0);
  };

  const placeOrder = (type: 'dine-in' | 'take-away', tableId?: string) => {
    const newOrder: Order = {
      id: `order-${orders.length + 1}`,
      items: [...cart],
      status: 'processing',
      type: type,
      tableId: tableId || null,
      timestamp: new Date(),
      total: calculateTotal()
    };
    
    setOrders([...orders, newOrder]);
    clearCart();
  };

  const updateOrderStatus = (orderId: string, status: string) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status } : order
    ));
  };

  return (
    <OrderContext.Provider value={{
      cart,
      orders,
      addToCart,
      removeFromCart,
      updateCartItemQuantity,
      clearCart,
      calculateTotal,
      placeOrder,
      updateOrderStatus
    }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = () => {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error('useOrder must be used within an OrderProvider');
  }
  return context;
};