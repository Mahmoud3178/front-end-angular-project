import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
// userdashbord.component.ts
import {  OnInit } from '@angular/core';
import { CustomerService } from '../../../services/customer.service';

@Component({
  selector: 'app-userwishlist',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './userwishlist.component.html',
  styleUrls: ['./userwishlist.component.css']
})
export class UserwishlistComponent implements OnInit {
   users: any[] = [];

  constructor(private customerService: CustomerService) {}

  ngOnInit(): void {
    this.customerService.getAllCustomers().subscribe({
      next: (res) => {
        this.users = res;
      },
      error: () => {
        alert('❌ Failed to load users');
      }
    });
  }
}
