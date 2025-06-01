import { Table } from '../types';

export const tables: Table[] = Array.from({ length: 30 }, (_, i) => ({
  id: `table-${i + 1}`,
  name: `Table ${String(i + 1).padStart(2, '0')}`,
  status: Math.random() > 0.3 ? 'available' : 'reserved',
  chairs: Math.floor(Math.random() * 3) + 2
}));