import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useOrder } from '../context/OrderContext';
import { tables } from '../data/tableData';

const Checkout: React.FC = () => {
  const { cart, calculateTotal, placeOrder, clearCart } = useOrder();
  const navigate = useNavigate();
  
  const [orderType, setOrderType] = useState<'dine-in' | 'take-away'>('dine-in');
  const [selectedTable, setSelectedTable] = useState<string>('');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [cookingInstructions, setCookingInstructions] = useState('');
  
  const availableTables = tables.filter(table => table.status === 'available');
  
  const handlePlaceOrder = () => {
    placeOrder(orderType, orderType === 'dine-in' ? selectedTable : undefined);
    navigate('/');
  };
  
  const subtotal = calculateTotal();
  const deliveryCharge = 30;
  const tax = Math.round(subtotal * 0.05);
  const grandTotal = subtotal + deliveryCharge + tax;

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-semibold mb-6">Checkout</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
            <h2 className="text-lg font-medium mb-4">Order Type</h2>
            <div className="flex space-x-4">
              <button
                className={`flex-1 py-3 rounded-lg ${orderType === 'dine-in' ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-800'}`}
                onClick={() => setOrderType('dine-in')}
              >
                Dine In
              </button>
              <button
                className={`flex-1 py-3 rounded-lg ${orderType === 'take-away' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-800'}`}
                onClick={() => setOrderType('take-away')}
              >
                Take Away
              </button>
            </div>
          </div>
          
          {orderType === 'dine-in' && (
            <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
              <h2 className="text-lg font-medium mb-4">Select Table</h2>
              {availableTables.length === 0 ? (
                <p className="text-red-500">No tables available</p>
              ) : (
                <div className="grid grid-cols-4 gap-2">
                  {availableTables.map(table => (
                    <button
                      key={table.id}
                      className={`p-2 rounded ${selectedTable === table.id ? 'bg-green-500 text-white' : 'bg-gray-100'}`}
                      onClick={() => setSelectedTable(table.id)}
                    >
                      {table.name.split(' ')[1]}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
          
          {orderType === 'take-away' && (
            <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
              <h2 className="text-lg font-medium mb-4">Customer Details</h2>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                  <textarea
                    className="w-full p-2 border border-gray-300 rounded"
                    rows={3}
                    value={customerAddress}
                    onChange={(e) => setCustomerAddress(e.target.value)}
                  ></textarea>
                </div>
              </div>
            </div>
          )}
          
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h2 className="text-lg font-medium mb-4">Cooking Instructions (Optional)</h2>
            <textarea
              className="w-full p-2 border border-gray-300 rounded"
              rows={3}
              placeholder="Any specific instructions for the chef..."
              value={cookingInstructions}
              onChange={(e) => setCookingInstructions(e.target.value)}
            ></textarea>
          </div>
        </div>
        
        <div>
          <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
            <h2 className="text-lg font-medium mb-4">Order Summary</h2>
            
            <div className="mb-4">
              {cart.map((item, index) => (
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
            </div>
            
            <div className="flex justify-between font-bold py-2 border-t border-b">
              <p>Grand Total</p>
              <p>₹{grandTotal}</p>
            </div>
          </div>
          
          <div className="flex space-x-4">
            <button
              className="flex-1 py-3 bg-gray-200 rounded-lg"
              onClick={() => navigate('/menu')}
            >
              Back to Menu
            </button>
            <button
              className="flex-1 py-3 bg-green-500 text-white rounded-lg"
              onClick={handlePlaceOrder}
              disabled={cart.length === 0 || (orderType === 'dine-in' && !selectedTable)}
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;