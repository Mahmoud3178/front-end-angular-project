import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-usersettings',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './usersettings.component.html',
  styleUrl: './usersettings.component.css'
})
export class UsersettingsComponent implements OnInit {
  settingsForm!: FormGroup;
  adminId!: number;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const id = this.authService.getCurrentUserId();
    if (!id) {
      alert('❌ Admin not logged in');
      return;
    }

    this.adminId = id;

    this.settingsForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      userName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      address: [''],
      nationalId: ['']
    });

    this.http.get<any>(`http://localhost:5164/api/admins/${this.adminId}`).subscribe({
      next: (admin) => this.settingsForm.patchValue(admin),
      error: () => alert('❌ Failed to load admin info')
    });
  }

  saveChanges(): void {
    if (this.settingsForm.invalid) return;

    const payload = {
      ...this.settingsForm.value,
      id: this.adminId,
      password: 'placeholder' // لحين تعديل الـ API ليقبل التحديث بدون باسورد
    };

    this.http.put<{ success: boolean; message: string }>(`http://localhost:5164/api/admins/${this.adminId}`, payload)
      .subscribe({
        next: (res) => {
          alert(res.message || '✅ Admin profile updated successfully');
        },
        error: () => alert('❌ Failed to update admin profile')
      });
  }
}
