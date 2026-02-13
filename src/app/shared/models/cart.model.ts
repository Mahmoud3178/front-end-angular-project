// src/app/shared/models/cart.model.ts

import { CartItemDTO } from './cartItem.model';

export interface CartDTO {
  id: number;
  customerId: number;
  createAt: string;
  updatedAt: string;
  items: CartItemDTO[];
}
