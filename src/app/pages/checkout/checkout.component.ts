// src/app/pages/checkout/checkout.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartItemDTO } from '../../shared/models/cartItem.model';
import { CartService } from '../../services/cart.service';
import { CartItemService } from '../../services/cart-item.service';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  cartItems: CartItemDTO[] = [];
  total: number = 0;
  currentDate: string = '';
  cartId!: number;

  constructor(
    private cartService: CartService,
    private cartItemService: CartItemService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    const customerId = Number(localStorage.getItem('customerId'));
    if (!customerId) {
      alert('Please login first.');
      return;
    }

    this.cartService.createCartIfNotExists(customerId).subscribe({
      next: (cart) => {
        this.cartId = cart.id;

        this.cartItemService.getItemsByCart(this.cartId).subscribe({
          next: (items) => {
            this.cartItems = items;

            // جلب بيانات المنتج في حالة ناقصة
            this.cartItems.forEach(item => {
              if (!item.price || !item.productName) {
                this.productService.getProductById(item.productId).subscribe(product => {
                  item.price = product.price;
                  item.productName = product.name;
                  item.image = product.imgURL;
                  item.description = product.description;

                  this.calculateTotal(); // تحديث الإجمالي بعد اكتمال البيانات
                });
              }
            });

            this.calculateTotal();
            this.currentDate = new Date().toLocaleDateString();
          },
          error: () => alert('Failed to load cart items')
        });
      },
      error: () => alert('Failed to load cart')
    });
  }

  calculateTotal(): void {
    this.total = this.cartItems.reduce((sum, item) => {
      const price = typeof item.price === 'number' ? item.price : 0;
      return sum + price * item.quantity;
    }, 0);
  }
}
