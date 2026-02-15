import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  showUserDropdown = false;

  constructor(private authService: AuthService) { }

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  getCurrentUser() {
    return this.authService.currentUser$;
  }

  getUserInitials(): string {
    const userJson = localStorage.getItem('current_user');
    if (userJson) {
      const user = JSON.parse(userJson);
      const firstName = user.firstName || '';
      const lastName = user.lastName || '';

      if (firstName && lastName) {
        return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
      } else if (firstName) {
        return firstName.substring(0, 2).toUpperCase();
      } else if (user.email) {
        return user.email.substring(0, 2).toUpperCase();
      }
    }
    return 'U';
  }

  getUserFullName(): string {
    const userJson = localStorage.getItem('current_user');
    if (userJson) {
      const user = JSON.parse(userJson);
      const firstName = user.firstName || '';
      const lastName = user.lastName || '';

      if (firstName && lastName) {
        return `${firstName} ${lastName}`;
      } else if (firstName) {
        return firstName;
      } else if (user.email) {
        return user.email;
      }
    }
    return 'User';
  }

  getUserEmail(): string {
    const userJson = localStorage.getItem('current_user');
    if (userJson) {
      const user = JSON.parse(userJson);
      return user.email || '';
    }
    return '';
  }

  toggleUserDropdown(): void {
    this.showUserDropdown = !this.showUserDropdown;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    const clickedInside = target.closest('.user-menu');

    if (!clickedInside && this.showUserDropdown) {
      this.showUserDropdown = false;
    }
  }

  logout(): void {
    this.showUserDropdown = false;
    this.authService.logout();
    window.location.href = '/auth/login';
  }
}
