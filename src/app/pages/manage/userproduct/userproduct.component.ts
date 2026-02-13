import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../../services/product.service';
import { Product } from '../../../shared/models/product.model';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-userproduct',
  standalone: true,
  templateUrl: './userproduct.component.html',
  styleUrls: ['./userproduct.component.css'],
  imports: [CommonModule, FormsModule, ReactiveFormsModule]
})
export class UserproductComponent implements OnInit {
  products: Product[] = [];
  productForm!: FormGroup;
  isEditMode = false;
  currentEditId: number | null = null;

  // ✅ بدل enum: أسماء مع ID
  categoryOptions = [
    { id: 1, name: 'Men' },
    { id: 2, name: 'Women' },
    { id: 3, name: 'Shoes' },
    { id: 4, name: 'Watches' },
    { id: 5, name: 'Accessories' }
  ];

  constructor(
    private productService: ProductService,
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadProducts();
  }

  initForm(): void {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(1)]],
      imgURL: ['', Validators.required],
      colors: ['', Validators.required],
      material: ['', Validators.required],
      categoryId: [1, Validators.required],
      inStock: [true]
    });
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe({
      next: (res) => this.products = res,
      error: () => alert('❌ Failed to load products')
    });
  }

  submit(): void {
    if (this.productForm.invalid) {
      alert('❌ Please fill in all required fields correctly.');
      return;
    }

    const payload = this.productForm.value;

    if (this.isEditMode && this.currentEditId !== null) {
      this.updateProduct(this.currentEditId, payload);
    } else {
      this.addProduct(payload);
    }
  }

  addProduct(payload: any): void {
    this.productService.addProduct(payload).subscribe({
      next: () => {
        alert('✅ Product added');
        this.loadProducts();
        this.productForm.reset({ inStock: true });
      },
      error: () => alert('❌ Failed to add product')
    });
  }

  updateProduct(id: number, payload: any): void {
    this.productService.updateProduct(id, payload).subscribe({
      next: () => {
        alert('✅ Product updated');
        this.loadProducts();
        this.cancelEdit();
      },
      error: () => alert('❌ Failed to update product')
    });
  }

  edit(product: Product): void {
    this.isEditMode = true;
    this.currentEditId = product.id;
    this.productForm.patchValue(product);
  }

  delete(id: number): void {
    if (!confirm('🗑️ Are you sure you want to delete this product?')) return;

    this.productService.deleteProduct(id).subscribe({
      next: () => {
        alert('✅ Product deleted');
        this.loadProducts();
      },
      error: () => alert('❌ Failed to delete product')
    });
  }

  cancelEdit(): void {
    this.isEditMode = false;
    this.currentEditId = null;
    this.productForm.reset({ inStock: true });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
