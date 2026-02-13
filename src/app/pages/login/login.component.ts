import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      role: ['', Validators.required] // ← ضروري لاختيار الدور (admin/user)
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      alert('Please enter all fields and select a role.');
      return;
    }

    const { email, password, role } = this.loginForm.value;
    this.loading = true;

    // ✅ اختيار دالة تسجيل الدخول حسب الدور
    const login$ = role === 'admin'
      ? this.authService.loginAdmin(email, password)
      : this.authService.login(email, password);

    login$.subscribe({
      next: (res) => {
        this.authService.setCurrentUser(res);

        if (role === 'admin') {
          alert('✅ Welcome Admin!');
          this.router.navigate(['/manage']); // لوحة التحكم
        } else {
          alert('✅ Welcome User!');
          this.router.navigate(['/']); // الصفحة الرئيسية
        }
      },
      error: (err) => {
        this.loading = false;
        console.error(err);
        alert('❌ Login failed. Please check your credentials.');
      }
    });
  }
}
