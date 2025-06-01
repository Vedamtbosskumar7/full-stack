import React from 'react';
import { CartItem } from '../../types';
import { useNavigate } from 'react-router-dom';

interface CartSummaryProps {
  items: CartItem[];
  total: number;
}

const CartSummary: React.FC<CartSummaryProps> = ({ items, total }) => {
  const navigate = useNavigate();
  
  const deliveryCharge = 30;
  const tax = Math.round(total * 0.05);
  const grandTotal = total + deliveryCharge + tax;
  
  if (items.length === 0) {
    return (
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <h3 className="font-semibold text-lg mb-4">Your Cart</h3>
        <p className="text-gray-500">Your cart is empty</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <h3 className="font-semibold text-lg mb-4">Your Cart</h3>
      
      <div className="mb-4">
        {items.map((item, index) => (
          <div key={index} className="flex justify-between py-2 border-b">
            <div>
              <p>{item.item.name} x {item.quantity}</p>
            </div>
            <p>₹{item.item.price * item.quantity}</p>
          </div>
        ))}
      </div>
      
      <div className="mb-4 space-y-2">
        <div className="flex justify-between">
          <p className="text-gray-600">Subtotal</p>
          <p>₹{total}</p>
        </div>
        <div className="flex justify-between">
          <p className="text-gray-600">Delivery Charge</p>
          <p>₹{deliveryCharge}</p>
        </div>
        <div className="flex justify-between">
          <p className="text-gray-600">Tax (5%)</p>
          <p>₹{tax}</p>
        </div>
      </div>
      
      <div className="flex justify-between font-bold py-2 border-t border-b">
        <p>Grand Total</p>
        <p>₹{grandTotal}</p>
      </div>
      
      <div className="flex justify-end mt-4">
        <button 
          className="bg-green-500 text-white px-4 py-2 rounded"
          onClick={() => navigate('/checkout')}
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default CartSummary;