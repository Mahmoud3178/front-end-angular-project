// src/app/services/product.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../shared/models/product.model';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private apiUrl = 'http://localhost:5164/api/Product';

  constructor(private http: HttpClient) {}

  // 🔹 Get all products
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  // 🔹 Get product by ID
  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  // 🔹 Add new product
  addProduct(product: Partial<Product>): Observable<{ success: boolean; [key: string]: any }> {
    return this.http.post<{ success: boolean; [key: string]: any }>(this.apiUrl, product);
  }

  // 🔹 Update product by ID
  updateProduct(id: number, product: Partial<Product>): Observable<{ success: boolean; [key: string]: any }> {
    return this.http.put<{ success: boolean; [key: string]: any }>(`${this.apiUrl}/${id}`, product);
  }

  // 🔹 Delete product by ID
  deleteProduct(id: number): Observable<{ success: boolean; [key: string]: any }> {
    return this.http.delete<{ success: boolean; [key: string]: any }>(`${this.apiUrl}/${id}`);
  }

  // 🔹 Search products by name
  searchProducts(name: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/Search?name=${encodeURIComponent(name)}`);
  }

  // 🔹 Get products by category
  getProductsByCategory(categoryId: number): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/ByCategory/${categoryId}`);
  }

  // 🔹 Get products by price range
  getProductsByPrice(min: number, max: number): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/ByPrice?min=${min}&max=${max}`);
  }

  // 🔹 Get latest products
  getLatestProducts(limit: number = 10): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/Latest?limit=${limit}`);
  }

  // 🔹 Get only in-stock products
  getInStockProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/InStock`);
  }
}
