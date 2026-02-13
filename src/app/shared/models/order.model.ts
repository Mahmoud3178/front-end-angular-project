export interface Order {
  id: number;
  userId: number;
  // items: CartItem[];
  totalAmount: number;
  orderDate: string;
  status: 'pending' | 'completed' | 'cancelled';
}
