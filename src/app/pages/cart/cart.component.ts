import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CartItemDTO } from '../../shared/models/cartItem.model';
import { CartService } from '../../services/cart.service';
import { CartItemService } from '../../services/cart-item.service';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  imports: [CommonModule, RouterLink]
})
export class CartComponent implements OnInit {
  cartItems: CartItemDTO[] = [];
  cartId!: number;

  constructor(
    private cartService: CartService,
    private cartItemService: CartItemService,
    private productService: ProductService,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    const customerId = Number(localStorage.getItem('customerId'));
    if (!customerId) return;

    this.cartService.getCartByCustomer(customerId).subscribe({
      next: (cart) => {
        this.cartId = cart.id;

        this.cartItemService.getItemsByCart(this.cartId).subscribe({
          next: (items) => {
            this.cartItems = items;

            this.cartItems.forEach(item => {
              if (!item.price || !item.productName) {
                this.productService.getProductById(item.productId).subscribe(product => {
                  item.price = product.price;
                  item.productName = product.name;
                  item.image = product.imgURL;
                  item.description = product.description;
                });
              }
            });
          },
          error: () => alert('❌ Failed to load cart items')
        });
      },
      error: () => alert('❌ Failed to load cart')
    });
  }

  buildUpdatedItem(item: CartItemDTO, quantity: number): CartItemDTO {
    return {
      ...item,
      id: item.id!,
      quantity
    };
  }

  increaseQuantity(item: CartItemDTO): void {
    const updatedQuantity = item.quantity + 1;
    const updatedItem = this.buildUpdatedItem(item, updatedQuantity);

    this.cartItemService.updateItem(item.id!, updatedItem).subscribe({
      next: () => item.quantity = updatedQuantity,
      error: () => alert('❌ Failed to update item')
    });
  }

  decreaseQuantity(item: CartItemDTO): void {
    const updatedQuantity = item.quantity - 1;

    if (updatedQuantity <= 0) {
      this.cartItemService.deleteItem(item.id!).subscribe({
        next: () => {
          this.cartItems = this.cartItems.filter(p => p.id !== item.id);
        },
        error: () => alert('❌ Failed to remove item')
      });
    } else {
      const updatedItem = this.buildUpdatedItem(item, updatedQuantity);

      this.cartItemService.updateItem(item.id!, updatedItem).subscribe({
        next: () => item.quantity = updatedQuantity,
        error: () => alert('❌ Failed to update item')
      });
    }
  }

  getProductTotal(item: CartItemDTO): number {
    return (item.price || 0) * item.quantity;
  }

  getCartTotal(): number {
    return this.cartItems.reduce((total, item) => total + this.getProductTotal(item), 0);
  }

proceedToCheckout(): void {
  const totalAmount = this.getCartTotal();

  if (totalAmount <= 0) {
    alert('❗ Cart is empty');
    return;
  }

  this.http.post(`http://localhost:5164/api/dashboard/revenue/increment?amount=${totalAmount}`, {})
    .subscribe({
      next: () => {
        this.cartItemService.clearCart(this.cartId).subscribe({
          next: () => {
            this.cartService.setItemCount(0); // ✅ تصفير العداد في النافبار
            alert('✅ Checkout completed. Revenue updated and cart cleared.');
            this.router.navigate(['/checkout']);
          },
          error: () => alert('✅ Revenue updated but ❌ failed to clear cart')
        });
      },
      error: () => alert('❌ Failed to update revenue')
    });
}

}
