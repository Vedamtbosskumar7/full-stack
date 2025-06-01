import React, { useState } from 'react';
import { MenuItem as MenuItemType } from '../../types';
import { Plus, Minus } from 'lucide-react';

interface MenuItemProps {
  item: MenuItemType;
  onAddToCart: (item: MenuItemType, quantity: number) => void;
}

const MenuItem: React.FC<MenuItemProps> = ({ item, onAddToCart }) => {
  const [quantity, setQuantity] = useState(0);
  
  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };
  
  const decrementQuantity = () => {
    if (quantity > 0) {
      setQuantity(prev => prev - 1);
    }
  };
  
  const addToCart = () => {
    if (quantity > 0) {
      onAddToCart(item, quantity);
      setQuantity(0);
    } else {
      onAddToCart(item, 1);
    }
  };

  return (
    <div className="menu-item">
      <img src={item.image} alt={item.name} className="w-full h-36 object-cover" />
      <div className="p-3">
        <h3 className="font-medium">{item.name}</h3>
        <div className="flex justify-between items-center mt-1">
          <p className="text-gray-900">₹ {item.price}</p>
          
          {quantity > 0 ? (
            <div className="flex items-center space-x-2">
              <button onClick={decrementQuantity} className="w-8 h-8 flex items-center justify-center rounded-md bg-gray-200">
                <Minus size={16} />
              </button>
              <span className="w-6 text-center">{quantity}</span>
              <button onClick={incrementQuantity} className="w-8 h-8 flex items-center justify-center rounded-md bg-gray-200">
                <Plus size={16} />
              </button>
            </div>
          ) : (
            <button onClick={addToCart} className="p-1 rounded-full">
              <Plus size={20} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MenuItem;