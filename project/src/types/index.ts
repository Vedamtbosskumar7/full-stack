export interface MenuItem {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
}

export interface CartItem {
  item: MenuItem;
  quantity: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  status: 'processing' | 'done' | 'served' | 'not-picked-up';
  type: 'dine-in' | 'take-away';
  tableId: string | null;
  timestamp: Date;
  total: number;
  chefId?: string;
}

export interface Table {
  id: string;
  name: string;
  status: 'available' | 'reserved';
  chairs: number;
}

export interface Chef {
  id: string;
  name: string;
  ordersTaken: number;
}

export interface MetricCard {
  title: string;
  value: string | number;
  icon: JSX.Element;
  subtitle: string;
}