import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Minus, Plus } from 'lucide-react';
import { useOrder } from '../../context/OrderContext';

const MobileCart: React.FC = () => {
  const { cart, removeFromCart, updateCartItemQuantity, calculateTotal } = useOrder();
  const navigate = useNavigate();
  
  const subtotal = calculateTotal();
  const deliveryCharge = 30;
  const tax = Math.round(subtotal * 0.05);
  const grandTotal = subtotal + deliveryCharge + tax;
  
  if (cart.length === 0) {
    return (
      <div className="bg-white min-h-screen p-4">
        <div className="flex items-center mb-4">
          <button onClick={() => navigate('/')} className="mr-2">
            <ChevronLeft size={24} />
          </button>
          <h1 className="text-xl font-semibold">Your Cart</h1>
        </div>
        
        <div className="flex flex-col items-center justify-center h-64">
          <p className="text-gray-500 mb-4">Your cart is empty</p>
          <button
            className="bg-green-500 text-white px-4 py-2 rounded-lg"
            onClick={() => navigate('/')}
          >
            Add Items
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen pb-24">
      <div className="p-4 border-b">
        <div className="flex items-center mb-2">
          <button onClick={() => navigate('/')} className="mr-2">
            <ChevronLeft size={24} />
          </button>
          <h1 className="text-xl font-semibold">Your Cart</h1>
        </div>
      </div>
      
      <div className="p-4">
        <div className="mb-6">
          {cart.map((item, index) => (
            <div key={index} className="flex items-center justify-between py-3 border-b">
              <div className="flex items-center">
                <img 
                  src={item.item.image} 
                  alt={item.item.name} 
                  className="w-16 h-16 object-cover rounded mr-3" 
                />
                <div>
                  <h3 className="font-medium">{item.item.name}</h3>
                  <p className="text-gray-500">₹{item.item.price}</p>
                </div>
              </div>
              <div className="flex items-center">
                <button 
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100"
                  onClick={() => {
                    if (item.quantity > 1) {
                      updateCartItemQuantity(item.item.id, item.quantity - 1);
                    } else {
                      removeFromCart(item.item.id);
                    }
                  }}
                >
                  <Minus size={16} />
                </button>
                <span className="w-8 text-center">{item.quantity}</span>
                <button 
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100"
                  onClick={() => updateCartItemQuantity(item.item.id, item.quantity + 1)}
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="bg-gray-50 p-4">
        <h2 className="text-lg font-semibold mb-3">Grand Total</h2>
        
        <div className="space-y-2 mb-4">
          <div className="flex justify-between">
            <p className="text-gray-600">Subtotal</p>
            <p>₹{subtotal}</p>
          </div>
          <div className="flex justify-between">
            <p className="text-gray-600">Delivery Charge</p>
            <p>₹{deliveryCharge}</p>
          </div>
          <div className="flex justify-between">
            <p className="text-gray-600">Tax (5%)</p>
            <p>₹{tax}</p>
          </div>
          <div className="flex justify-between font-bold pt-2 border-t">
            <p>Total</p>
            <p>₹{grandTotal}</p>
          </div>
        </div>
      </div>
      
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t">
        <button
          className="w-full bg-green-500 text-white py-3 rounded-lg"
          onClick={() => navigate('/checkout')}
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default MobileCart;