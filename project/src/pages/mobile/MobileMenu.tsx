import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ShoppingBag } from 'lucide-react';
import { menuItems } from '../../data/menuData';
import { useOrder } from '../../context/OrderContext';

const MobileMenu: React.FC = () => {
  const { cart, addToCart } = useOrder();
  const navigate = useNavigate();
  
  const [activeCategory, setActiveCategory] = useState('pizza');
  const [searchQuery, setSearchQuery] = useState('');
  
  const categories = [
    { id: 'burger', label: 'Burger' },
    { id: 'pizza', label: 'Pizza' },
    { id: 'drink', label: 'Drink' },
    { id: 'french-fries', label: 'French Fries' },
    { id: 'veggies', label: 'Veggies' }
  ];
  
  const filteredItems = searchQuery
    ? menuItems.filter(item => 
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : menuItems.filter(item => item.category === activeCategory);

  return (
    <div className="bg-white min-h-screen pb-20">
      <div className="p-4">
        <h1 className="text-xl font-semibold">Good evening</h1>
        <p className="text-gray-500 text-sm">Place your order here</p>
        
        <div className="relative mt-4">
          <Search size={20} className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            className="w-full py-3 pl-10 pr-4 bg-gray-100 rounded-lg"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex space-x-2 mt-4 overflow-x-auto pb-2">
          {categories.map(category => (
            <button
              key={category.id}
              className={`p-2 border rounded-lg min-w-[80px] flex flex-col items-center ${
                activeCategory === category.id && !searchQuery
                  ? 'bg-gray-800 text-white' 
                  : 'bg-white text-gray-800'
              }`}
              onClick={() => {
                setActiveCategory(category.id);
                setSearchQuery('');
              }}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>
      
      <div className="px-4 mt-4">
        <h2 className="text-2xl font-bold capitalize mb-4">{searchQuery ? 'Search Results' : activeCategory}</h2>
        
        <div className="grid grid-cols-2 gap-4">
          {filteredItems.map(item => (
            <div key={item.id} className="bg-white rounded-lg overflow-hidden shadow-md">
              <img src={item.image} alt={item.name} className="w-full h-32 object-cover" />
              <div className="p-2">
                <h3 className="font-medium">{item.name}</h3>
                <div className="flex justify-between items-center mt-1">
                  <p>₹ {item.price}</p>
                  <button
                    className="p-1"
                    onClick={() => addToCart(item, 1)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="12" y1="5" x2="12" y2="19"></line>
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {cart.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t">
          <button
            className="w-full bg-gray-800 text-white py-3 rounded-lg flex items-center justify-center"
            onClick={() => navigate('/cart')}
          >
            <ShoppingBag size={20} className="mr-2" />
            <span>Next</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default MobileMenu;