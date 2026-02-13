//-------------------------------------
// ✅ services/cart.service.ts
//-------------------------------------
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { CartDTO } from '../shared/models/cart.model';

@Injectable({ providedIn: 'root' })
export class CartService {
  private readonly baseUrl = 'http://localhost:5164/api/cart';
  private itemCountSubject = new BehaviorSubject<number>(0);

  constructor(private http: HttpClient) {}

  getCartByCustomer(customerId: number): Observable<CartDTO> {
    return this.http.get<CartDTO>(`${this.baseUrl}/customer/${customerId}`);
  }

  createCartIfNotExists(customerId: number): Observable<CartDTO> {
    return this.http.post<CartDTO>(`${this.baseUrl}/customer/${customerId}/create-if-not-exists`, {});
  }

  getItemCountObservable(): Observable<number> {
    return this.itemCountSubject.asObservable();
  }

  setItemCount(count: number): void {
    this.itemCountSubject.next(count);
  }
}
