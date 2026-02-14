import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="login-page" [class.page-exit]="isAnimating">
      <div class="auth-container">
        <div class="card auth-card">
          <div class="brand-header">
            <img src="assets/collapse-icon.svg" alt="Luftborn" class="brand-logo">
          </div>
          <h1>Welcome Back</h1>
          <p class="subtitle">Enter your credentials to access the portal</p>
          
          <form (ngSubmit)="onSubmit()">
            <div class="form-group">
              <label>Email Address</label>
              <input type="email" [(ngModel)]="email" name="email" required placeholder="name@company.com">
            </div>
            <div class="form-group">
              <label>Password</label>
              <input type="password" [(ngModel)]="password" name="password" required placeholder="••••••••">
            </div>
            @if (error) {
              <div class="error-message">
                <span class="icon">!</span> {{ error }}
              </div>
            }
            <button type="submit" class="btn btn-primary btn-block" [disabled]="loading">
              @if (loading) {
                <span class="spinner-sm"></span> Processing...
              } @else {
                Sign In
              }
            </button>
          </form>
          
          <div class="auth-footer">
            <p>Don't have an account? <a routerLink="/auth/register">Create one</a></p>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  email = '';
  password = '';
  loading = false;
  error = '';
  isAnimating = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  onSubmit(): void {
    this.loading = true;
    this.error = '';

    this.authService.login(this.email, this.password).subscribe({
      next: () => {
        this.isAnimating = true;
        setTimeout(() => {
          this.router.navigate(['/products']);
        }, 1500);
      },
      error: (err) => {
        this.error = 'Invalid email or password';
        this.loading = false;
      }
    });
  }
}
