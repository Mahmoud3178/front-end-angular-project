import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      phone: ['', Validators.required],
      address: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.registerForm.invalid) {
      alert('Please fill all fields correctly.');
      return;
    }

    if (this.registerForm.value.password !== this.registerForm.value.confirmPassword) {
      alert('Passwords do not match.');
      return;
    }

    const email = this.registerForm.value.email;

    // ✅ تحقق من البريد الإلكتروني أولاً
    this.http.get<boolean>(`http://localhost:5164/api/Customer/exists?email=${email}`).subscribe({
      next: (exists) => {
        if (exists) {
          alert('❌ This email is already registered. Please use a different one.');
          return;
        }

        // ✅ البريد الإلكتروني غير موجود → نكمل التسجيل
        this.registerCustomer();
      },
      error: (err) => {
        console.error('❌ Failed to check email:', err);
        alert('Something went wrong. Please try again.');
      }
    });
  }

  registerCustomer(): void {
    this.loading = true;

    const body = {
      firstName: this.registerForm.value.firstName,
      lastName: this.registerForm.value.lastName,
      email: this.registerForm.value.email,
      password: this.registerForm.value.password,
      phone: this.registerForm.value.phone,
      address: this.registerForm.value.address
    };

    this.http.post('http://localhost:5164/api/Customer', body, { responseType: 'text' }).subscribe({
      next: () => {
        alert('✅ Registration successful!');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('❌ Registration failed:', err);
        alert('Failed to register. Please try again.');
        this.loading = false;
      }
    });
  }
}
