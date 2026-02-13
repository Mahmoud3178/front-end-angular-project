import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-manageuser',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './manageuser.component.html',
  styleUrls: ['./manageuser.component.css']
})
export class ManageuserComponent implements OnInit {
  userForm!: FormGroup;
  customerId!: number;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const id = this.authService.getCurrentUserId();
    if (!id) {
      alert('❌ User not logged in');
      return;
    }

    this.customerId = id;

    this.userForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      address: [''],
      password: ['']
    });

    this.http.get<any>(`http://localhost:5164/api/Customer/${this.customerId}`).subscribe({
      next: (user) => this.userForm.patchValue(user),
      error: () => alert('❌ Failed to load user data')
    });
  }

  onSubmit(): void {
    if (this.userForm.invalid) return;

    const payload = {
      ...this.userForm.value,
      id: this.customerId,
      password: this.userForm.value.password || 'placeholder'
    };

    this.http.put<{ success: boolean; message: string }>(
      `http://localhost:5164/api/Customer/${this.customerId}`,
      payload
    ).subscribe({
      next: (res) => alert(res.message || '✅ Account updated successfully'),
      error: () => alert('❌ Failed to update user account')
    });
  }
}
