// userorder.component.ts
import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../../services/order.service';
import { CartDTO } from '../../../shared/models/cart.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-userorder',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './userorder.component.html',
  styleUrl: './userorder.component.css'
})
export class UserorderComponent implements OnInit {
  orders: CartDTO[] = [];

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.orderService.getAllOrders().subscribe({
      next: (res) => this.orders = res,
      error: () => alert('❌ Failed to load orders')
    });
  }
}
