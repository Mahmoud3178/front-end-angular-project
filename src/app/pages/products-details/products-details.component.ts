import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { CartItemService } from '../../services/cart-item.service';
import { Product } from '../../shared/models/product.model';
import { CartItemDTO } from '../../shared/models/cartItem.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './products-details.component.html',
  styleUrls: ['./products-details.component.css']
})
export class ProductDetailsComponent implements OnInit, AfterViewInit {
  product!: Product;
  quantity = 1;
  selectedSize = '';
  selectedColor = '';

  relatedProducts: Product[] = [];

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,
    private cartItemService: CartItemService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!id) return;

    this.productService.getProductById(id).subscribe(product => {
      this.product = product;

      this.productService.getProductsByCategory(product.categoryId).subscribe(res => {
        this.relatedProducts = res.filter(p => p.id !== product.id);
      });
    });
  }

  increment(): void {
    this.quantity++;
  }

  decrement(): void {
    if (this.quantity > 1) this.quantity--;
  }

  addToCart(): void {
    if (!this.selectedSize || !this.selectedColor) {
      alert('Please select size and color');
      return;
    }

    const customerId = Number(localStorage.getItem('customerId'));
    if (!customerId) {
      alert('You need to login first!');
      window.location.href = '/login';
      return;
    }

    this.cartService.createCartIfNotExists(customerId).subscribe(cart => {
      const item: CartItemDTO = {
        cartId: cart.id,
        productId: this.product.id,
        quantity: this.quantity,
        price: this.product.price ?? 0, // ✅ حط default لو ناقص
        size: this.selectedSize,
        color: this.selectedColor,
        productName: this.product.name,
        description: this.product.description,
        image: this.product.imgURL
      };

      this.cartItemService.addItemToCart(item).subscribe(() => {
        // Update item count in cart (navbar)
        this.cartItemService.getItemsByCart(cart.id).subscribe(items => {
          const totalCount = items.reduce((sum, i) => sum + i.quantity, 0);
          this.cartService.setItemCount(totalCount);
        });

        alert('✅ Added to cart');
      }, () => alert('❌ Failed to add item to cart'));
    }, () => alert('❌ Failed to create or fetch cart'));
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      $('.slick3').slick({
        autoplay: true,
        autoplaySpeed: 3000,
        dots: true,
        arrows: false,
        fade: true
      });

      $('.slick2').slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        infinite: true,
        arrows: true,
        dots: false,
        autoplay: true,
        autoplaySpeed: 3000,
        responsive: [
          { breakpoint: 1024, settings: { slidesToShow: 3 } },
          { breakpoint: 768, settings: { slidesToShow: 2 } },
          { breakpoint: 480, settings: { slidesToShow: 1 } },
        ]
      });
    }, 0);
  }
}
