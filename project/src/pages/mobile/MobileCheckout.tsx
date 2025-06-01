import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { useOrder } from '../../context/OrderContext';

const MobileCheckout: React.FC = () => {
  const { placeOrder } = useOrder();
  const navigate = useNavigate();
  
  const [orderType, setOrderType] = useState<'dine-in' | 'take-away'>('take-away');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [instructions, setInstructions] = useState('');
  
  const handlePlaceOrder = () => {
    placeOrder(orderType);
    navigate('/');
  };

  return (
    <div className="bg-white min-h-screen pb-24">
      <div className="p-4 border-b">
        <div className="flex items-center mb-2">
          <button onClick={() => navigate('/cart')} className="mr-2">
            <ChevronLeft size={24} />
          </button>
          <h1 className="text-xl font-semibold">Checkout</h1>
        </div>
      </div>
      
      <div className="p-4 space-y-4">
        <div className="bg-gray-50 p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-3">Delivery Options</h2>
          
          <div className="flex space-x-3 mb-4">
            <button
              className={`flex-1 py-2 rounded-lg ${orderType === 'dine-in' ? 'bg-green-500 text-white' : 'bg-gray-200'}`}
              onClick={() => setOrderType('dine-in')}
            >
              Dine In
            </button>
            <button
              className={`flex-1 py-2 rounded-lg ${orderType === 'take-away' ? 'bg-green-500 text-white' : 'bg-gray-200'}`}
              onClick={() => setOrderType('take-away')}
            >
              Take Away
            </button>
          </div>
          
          {orderType === 'take-away' && (
            <div className="space-y-3">
              <p className="text-sm text-gray-600">Delivery in 42 mins</p>
            </div>
          )}
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-3">Your Details</h2>
          
          <div className="space-y-3">
            <input
              type="text"
              className="w-full p-3 border border-gray-300 rounded-lg"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            
            <input
              type="tel"
              className="w-full p-3 border border-gray-300 rounded-lg"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            
            {orderType === 'take-away' && (
              <textarea
                className="w-full p-3 border border-gray-300 rounded-lg"
                placeholder="Delivery Address"
                rows={3}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              ></textarea>
            )}
          </div>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-3">Cooking Instructions</h2>
          
          <textarea
            className="w-full p-3 border border-gray-300 rounded-lg"
            placeholder="Any specific instructions for the chef..."
            rows={3}
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
          ></textarea>
        </div>
      </div>
      
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t">
        <div className="flex items-center justify-center w-full h-16 border border-gray-300 rounded-full mb-4">
          <p className="text-center">Swipe to Order</p>
        </div>
        
        <button
          className="w-full bg-green-500 text-white py-3 rounded-lg"
          onClick={handlePlaceOrder}
        >
          Place Order
        </button>
      </div>
    </div>
  );
};

export default MobileCheckout;