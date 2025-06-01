import React, { useState } from 'react';
import MenuItem from '../components/menu/MenuItem';
import CartSummary from '../components/menu/CartSummary';
import { menuItems } from '../data/menuData';
import { useOrder } from '../context/OrderContext';

const Menu: React.FC = () => {
  const { cart, addToCart, calculateTotal } = useOrder();
  const [activeCategory, setActiveCategory] = useState('pizza');
  
  const categories = [
    { id: 'burger', label: 'Burger' },
    { id: 'pizza', label: 'Pizza' },
    { id: 'drink', label: 'Drink' },
    { id: 'french-fries', label: 'French Fries' },
    { id: 'veggies', label: 'Veggies' }
  ];
  
  const filteredItems = menuItems.filter(item => item.category === activeCategory);

  return (
    <div className="container mx-auto">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-2/3">
          <h1 className="text-2xl font-semibold mb-6">Menu</h1>
          
          <div className="flex space-x-3 mb-6 overflow-x-auto py-2">
            {categories.map(category => (
              <button
                key={category.id}
                className={`px-4 py-2 rounded-lg flex items-center justify-center min-w-[100px] ${
                  activeCategory === category.id 
                    ? 'bg-gray-800 text-white' 
                    : 'bg-white text-gray-800 border border-gray-200'
                }`}
                onClick={() => setActiveCategory(category.id)}
              >
                {category.label}
              </button>
            ))}
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredItems.map(item => (
              <MenuItem 
                key={item.id} 
                item={item} 
                onAddToCart={addToCart} 
              />
            ))}
          </div>
        </div>
        
        <div className="w-full md:w-1/3">
          <CartSummary items={cart} total={calculateTotal()} />
        </div>
      </div>
    </div>
  );
};

export default Menu;