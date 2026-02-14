import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="register-page" [class.page-exit]="isAnimating">
      <div class="auth-container">
        <div class="card auth-card">
          <div class="brand-header">
            <img src="assets/collapse-icon.svg" alt="Luftborn" class="brand-logo">
          </div>
          <h1>Create Account</h1>
          <p class="subtitle">Join us and start managing your products</p>
          
          <form (ngSubmit)="onSubmit()" #registerForm="ngForm">
            <div class="form-group">
              <label>Full Name</label>
              <input type="text" [(ngModel)]="name" name="name" placeholder="John Doe">
            </div>
            <div class="form-group">
              <label>Email Address</label>
              <input type="email" [(ngModel)]="email" name="email" required placeholder="name@company.com">
            </div>
            <div class="form-group">
              <label>Password</label>
              <input type="password" [(ngModel)]="password" name="password" required placeholder="••••••••" minlength="6">
            </div>
            <div class="form-group">
              <label>Confirm Password</label>
              <input type="password" [(ngModel)]="confirmPassword" name="confirmPassword" required placeholder="••••••••">
            </div>
            @if (error) {
              <div class="error-message">
                <span class="icon">!</span> {{ error }}
              </div>
            }
            <button type="submit" class="btn btn-primary btn-block" [disabled]="loading || !registerForm.valid || password !== confirmPassword">
              @if (loading) {
                <span class="spinner-sm"></span> Processing...
              } @else {
                Create Account
              }
            </button>
          </form>
          
          <div class="auth-footer">
            <p>Already have an account? <a routerLink="/auth/login">Sign in</a></p>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  name = '';
  email = '';
  password = '';
  confirmPassword = '';
  loading = false;
  error = '';
  isAnimating = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  onSubmit(): void {
    if (this.password !== this.confirmPassword) {
      this.error = 'Passwords do not match';
      return;
    }

    if (this.password.length < 6) {
      this.error = 'Password must be at least 6 characters';
      return;
    }

    this.loading = true;
    this.error = '';

    this.authService.register(this.email, this.password, this.name).subscribe({
      next: () => {
        this.isAnimating = true;
        setTimeout(() => {
          this.router.navigate(['/products']);
        }, 1500);
      },
      error: (err) => {
        this.error = err.error?.message || 'Registration failed. Please try again.';
        this.loading = false;
      }
    });
  }
}
