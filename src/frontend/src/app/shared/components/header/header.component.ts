import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <header class="header">
      <div class="container">
        <div class="header-content">
          <div class="logo">
            <a routerLink="/">LUFTBORN</a>
          </div>
          <nav class="nav">
            <a routerLink="/products" class="nav-link">Products</a>
            @if (isAuthenticated()) {
              <a routerLink="/products/create" class="nav-link">Create Product</a>
              <button (click)="logout()" class="btn btn-secondary">Logout</button>
            } @else {
              <a routerLink="/auth/login" class="btn btn-primary">Login</a>
            }
          </nav>
        </div>
      </div>
    </header>
  `,
  styles: [`
    .header {
      background: white;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      padding: 1rem 0;
    }

    .header-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .logo a {
      font-size: 1.5rem;
      font-weight: 700;
      color: var(--color-primary);
      letter-spacing: 2px;
    }

    .nav {
      display: flex;
      gap: 1rem;
      align-items: center;
    }

    .nav-link {
      padding: 0.5rem 1rem;
      color: var(--color-text);
      font-weight: 500;

      &:hover {
        color: var(--color-primary);
      }
    }
  `]
})
export class HeaderComponent {
  constructor(private authService: AuthService) {}

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  logout(): void {
    this.authService.logout();
    window.location.href = '/auth/login';
  }
}
