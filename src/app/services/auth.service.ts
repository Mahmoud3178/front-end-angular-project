import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CartService } from './cart.service';
import { CartItemService } from './cart-item.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private currentUserId: number | null = null;

  private isAdminSubject = new BehaviorSubject<boolean>(false);
  private loggedInSubject = new BehaviorSubject<boolean>(false);

  isAdmin$ = this.isAdminSubject.asObservable();
  loggedIn$ = this.loggedInSubject.asObservable();

  private readonly customerUrl = 'http://localhost:5164/api/Customer';
  private readonly adminUrl = 'http://localhost:5164/api/admins';

  constructor(
    private http: HttpClient,
    private cartService: CartService,
    private cartItemService: CartItemService
  ) {
    const savedId = localStorage.getItem('userId');
    this.currentUserId = savedId ? +savedId : null;

    this.loggedInSubject.next(this.isLoggedIn());
    this.isAdminSubject.next(this.isAdmin());
  }

  login(email: string, password: string): Observable<{ id: number; email: string; fullName: string }> {
    return this.http.post<{ id: number; email: string; fullName: string }>(
      `${this.customerUrl}/login`,
      { email, password }
    ).pipe(
      map(user => {
        localStorage.setItem('role', 'user');
        return user;
      })
    );
  }

  loginAdmin(email: string, password: string): Observable<{ id: number; email: string; fullName: string }> {
    return this.http.get<any[]>(this.adminUrl).pipe(
      map(admins => {
        const admin = admins.find(a => a.email === email && a.password === password);
        if (!admin) throw new Error('Invalid admin credentials');

        localStorage.setItem('role', 'admin');
        return {
          id: admin.id,
          email: admin.email,
          fullName: `${admin.firstName} ${admin.lastName}`
        };
      })
    );
  }

  setCurrentUser(user: { id: number; email: string; fullName: string }) {
    this.currentUserId = user.id;

    localStorage.setItem('userId', user.id.toString());
    localStorage.setItem('customerId', user.id.toString());
    localStorage.setItem('email', user.email);
    localStorage.setItem('fullName', user.fullName);
    localStorage.setItem('token', 'fake-jwt-token');

    this.loggedInSubject.next(true);
    this.isAdminSubject.next(this.isAdmin());
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  isAdmin(): boolean {
    return localStorage.getItem('role') === 'admin';
  }

  getCurrentUserId(): number | null {
    return this.currentUserId;
  }

  logout(): void {
    const wasAdmin = this.isAdmin();
    const customerId = this.currentUserId;

    if (customerId) {
      this.cartService.getCartByCustomer(customerId).subscribe({
        next: (cart) => {
          this.cartItemService.clearCart(cart.id).subscribe({
            next: () => console.log('✅ Cart cleared on logout'),
            error: () => console.warn('❌ Failed to clear cart on logout')
          });
        },
        error: () => console.warn('❌ Failed to load cart on logout')
      });
    }

    this.cartService.setItemCount(0);

    localStorage.clear();
    this.currentUserId = null;
    this.loggedInSubject.next(false);
    this.isAdminSubject.next(false);

    alert(wasAdmin ? 'Admin logged out!' : 'User logged out!');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
}
