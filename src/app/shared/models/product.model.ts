export interface Product {
inStock: any;
  id: number;
  name: string;
  description: string;
  price: number;
  imgURL: string;
  categoryId: number;
  stockQuantity: number;
  colors: string;
  categoryName?: string;
}
