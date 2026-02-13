//-------------------------------------
// ✅ services/cart-item.service.ts
//-------------------------------------
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CartItemDTO } from '../shared/models/cartItem.model';

@Injectable({ providedIn: 'root' })
export class CartItemService {
  private baseUrl = 'http://localhost:5164/api/cart-items';

  constructor(private http: HttpClient) {}

  getItemsByCart(cartId: number): Observable<CartItemDTO[]> {
    return this.http.get<CartItemDTO[]>(`${this.baseUrl}/cart/${cartId}`);
  }

  addItemToCart(item: CartItemDTO): Observable<any> {
    return this.http.post(this.baseUrl, item);
  }

  updateItem(id: number, item: CartItemDTO): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, item);
  }

  deleteItem(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
clearCart(cartId: number): Observable<any> {
  return this.http.delete(`${this.baseUrl}/cart/${cartId}/clear`);
}
}
