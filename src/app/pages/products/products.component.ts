import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';
import { Router, NavigationEnd, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { Product } from '../../shared/models/product.model';

declare var $: any;

interface CategoryDTO {
  id: number;
  name: string;
  description?: string;
}

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, AfterViewInit, OnDestroy {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  categories: CategoryDTO[] = [];
  selectedCategory: number | null = null;
  searchQuery: string = '';
  private routerSubscription: any;

  constructor(
    private router: Router,
    private http: HttpClient,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.loadCategories();
    this.loadProducts();
  }

  loadCategories(): void {
    this.http.get<CategoryDTO[]>('http://localhost:5164/api/Category').subscribe({
      next: (data) => this.categories = data,
      error: () => console.warn('❌ Failed to load categories')
    });
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
        this.applyFilters();

        setTimeout(() => {
          $('.isotope-grid').imagesLoaded(() => this.initIsotope());
        }, 400);
      },
      error: () => console.error('❌ Failed to load products')
    });
  }

  filterByCategory(categoryId: number | null): void {
    this.selectedCategory = categoryId;
    this.applyFilters();
  }

  applyFilters(): void {
    const searchLower = this.searchQuery.trim().toLowerCase();

    this.filteredProducts = this.products.filter(p => {
      const matchesCategory = this.selectedCategory ? p.categoryId === this.selectedCategory : true;
      const matchesSearch = p.name.toLowerCase().includes(searchLower);
      return matchesCategory && matchesSearch;
    });

    setTimeout(() => {
      $('.isotope-grid').imagesLoaded(() => this.initIsotope());
    }, 100);
  }

  ngAfterViewInit(): void {
    this.routerSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd && event.urlAfterRedirects === '/product') {
        setTimeout(() => this.initIsotope(), 300);
      }
    });
  }

  initIsotope(): void {
    const $grid = $('.isotope-grid');
    if (!$grid.length) return;

    if ($grid.data('isotope')) {
      $grid.isotope('destroy');
    }

    $grid.isotope({
      itemSelector: '.isotope-item',
      layoutMode: 'fitRows'
    });
  }

  ngOnDestroy(): void {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }
}
