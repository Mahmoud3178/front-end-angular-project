// ✅ models/cartItem.model.ts
//-------------------------------------
export interface CartItemDTO {
  id?: number;
  cartId: number;
  productId: number;
  quantity: number;
  price: number;
  size?: string;
  color?: string;
  productName?: string;
  image?: string;
  description?: string;
}
