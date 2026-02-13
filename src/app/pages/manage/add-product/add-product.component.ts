import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent {
  product = {
    name: '',
    price: null,
    description: '',
    colors: '',
    category: '',
    material: '',
    stock: null,
    img: ''
  };

  onSubmit() {
    // هنا ممكن تضيف كود للإرسال لل API أو تحديث بيانات المنتج في خدمة
    console.log('New product:', this.product);

    // مثلا تصفر النموذج بعد الإرسال
    this.product = {
      name: '',
      price: null,
      description: '',
      colors: '',
      category: '',
      material: '',
      stock: null,
      img: ''
    };
  }
}
