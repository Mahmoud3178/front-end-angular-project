import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

interface Admin {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}

@Component({
  selector: 'app-userdashbord',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './userdashbord.component.html',
  styleUrl: './userdashbord.component.css'
})
export class UserdashbordComponent implements OnInit {
  stats = {
    totalCustomers: 0,
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0
  };

  recentAdmins: Admin[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // Get dashboard summary (excluding orders)
    this.http.get<any>('http://localhost:5164/api/dashboard/summary').subscribe({
      next: (data) => {
        this.stats.totalCustomers = data.totalCustomers;
        this.stats.totalProducts = data.totalProducts;
        this.stats.totalRevenue = data.totalRevenue;
      },
      error: () => alert('❌ Failed to load dashboard stats')
    });

    // ✅ Get total orders separately
    this.http.get<any>('http://localhost:5164/api/Order/count').subscribe({
      next: (res) => {
        this.stats.totalOrders = res.totalOrders;
      },
      error: () => alert('❌ Failed to load total orders')
    });

    // Load recent admins
    this.http.get<Admin[]>('http://localhost:5164/api/admins').subscribe({
      next: (data) => this.recentAdmins = data,
      error: () => alert('❌ Failed to load admins')
    });
  }
}
