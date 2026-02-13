// src/app/services/order.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CartDTO } from '../shared/models/cart.model';

@Injectable({ providedIn: 'root' })
export class OrderService {
  private apiUrl = 'http://localhost:5164/api/cart';

  constructor(private http: HttpClient) {}

  getAllOrders(): Observable<CartDTO[]> {
    return this.http.get<CartDTO[]>(this.apiUrl);
  }
}
