import { Component, OnInit } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  itemCount = 0;
  isAdmin = false;
  isLoggedIn = false;

  constructor(
    private cartService: CartService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const customerId = Number(localStorage.getItem('customerId'));

    // ✅ جلب عدد العناصر الحقيقي من الكارت عند بداية تشغيل الصفحة
    if (customerId) {
      this.cartService.getCartByCustomer(customerId).subscribe({
        next: (cart) => {
          const count = cart.items.reduce((sum, item) => sum + item.quantity, 0);
          this.cartService.setItemCount(count); // ⬅️ تحديث العداد للمشتركين
        },
        error: () => console.warn('❌ Failed to load cart for navbar')
      });
    }

    // ✅ الاشتراك في تغييرات عدد العناصر
    this.cartService.getItemCountObservable().subscribe(count => {
      this.itemCount = count;
    });

    // ✅ متابعة حالة الأدمن
    this.authService.isAdmin$.subscribe(isAdmin => {
      this.isAdmin = isAdmin;
    });

    // ✅ متابعة حالة تسجيل الدخول
    this.authService.loggedIn$.subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
