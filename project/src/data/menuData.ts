import { MenuItem } from '../types';

export const menuItems: MenuItem[] = [
  {
    id: 'pizza-1',
    name: 'Capricciosa',
    price: 200,
    category: 'pizza',
    image: 'https://images.pexels.com/photos/825661/pexels-photo-825661.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    id: 'pizza-2',
    name: 'Sicilian',
    price: 150,
    category: 'pizza',
    image: 'https://images.pexels.com/photos/1653877/pexels-photo-1653877.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    id: 'pizza-3',
    name: 'Marinara',
    price: 90,
    category: 'pizza',
    image: 'https://images.pexels.com/photos/1146760/pexels-photo-1146760.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    id: 'pizza-4',
    name: 'Pepperoni',
    price: 300,
    category: 'pizza',
    image: 'https://images.pexels.com/photos/3682837/pexels-photo-3682837.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    id: 'burger-1',
    name: 'Classic Burger',
    price: 180,
    category: 'burger',
    image: 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    id: 'burger-2',
    name: 'Cheese Burger',
    price: 220,
    category: 'burger',
    image: 'https://images.pexels.com/photos/1633578/pexels-photo-1633578.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    id: 'drink-1',
    name: 'Cola',
    price: 60,
    category: 'drink',
    image: 'https://images.pexels.com/photos/2983100/pexels-photo-2983100.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    id: 'drink-2',
    name: 'Orange Juice',
    price: 80,
    category: 'drink',
    image: 'https://images.pexels.com/photos/96974/pexels-photo-96974.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    id: 'fries-1',
    name: 'French Fries',
    price: 100,
    category: 'french-fries',
    image: 'https://images.pexels.com/photos/1583884/pexels-photo-1583884.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    id: 'veg-1',
    name: 'Garden Salad',
    price: 120,
    category: 'veggies',
    image: 'https://images.pexels.com/photos/257816/pexels-photo-257816.jpeg?auto=compress&cs=tinysrgb&w=600'
  }
];

export const getMenuItemsByCategory = (category: string): MenuItem[] => {
  return menuItems.filter(item => item.category === category);
};