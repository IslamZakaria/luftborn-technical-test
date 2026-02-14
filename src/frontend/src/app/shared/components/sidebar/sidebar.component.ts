import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LayoutService } from '../../../core/services/layout.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <aside class="sidebar" [class.collapsed]="layoutService.isSidebarCollapsed()">
      <div class="sidebar-header">
        <div class="logo-container">
          <img [src]="layoutService.isSidebarCollapsed() ? 'assets/collapse-icon.svg' : 'assets/expand-icon.svg'" 
               alt="Luftborn Logo" 
               class="sidebar-logo">
        </div>
        <button class="toggle-btn" (click)="layoutService.toggleSidebar()">
          <i class="fas" [class.fa-chevron-left]="!layoutService.isSidebarCollapsed()" [class.fa-chevron-right]="layoutService.isSidebarCollapsed()"></i>
        </button>
      </div>

      <nav class="sidebar-nav">
        <a routerLink="/products" routerLinkActive="active" class="nav-item">
          <i class="fas fa-box"></i>
          @if (!layoutService.isSidebarCollapsed()) {
            <span>Products</span>
          }
        </a>
        <!-- Add more nav items here -->
      </nav>
    </aside>
  `,
  styles: [`
    .sidebar {
      width: 250px;
      height: 100vh;
      background: #02071A; /* Brand color */
      color: #fff;
      transition: width 0.3s ease;
      display: flex;
      flex-direction: column;
      position: fixed;
      left: 0;
      top: 0;
      z-index: 1000;
    }

    .sidebar.collapsed {
      width: 70px;
    }

    .sidebar-header {
      padding: 1rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 64px;
      border-bottom: 1px solid rgba(255,255,255,0.1);
    }

    .logo-container {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      overflow: hidden;
    }

    .sidebar-logo {
      height: 32px;
      width: 32px;
    }

    .logo-text {
      font-weight: bold;
      font-size: 1.2rem;
      white-space: nowrap;
    }

    .toggle-btn {
      background: none;
      border: none;
      color: rgba(255,255,255,0.6);
      cursor: pointer;
      padding: 0.5rem;
      
      &:hover {
        color: #fff;
      }
    }

    .sidebar-nav {
      padding: 1rem 0;
      flex: 1;
      overflow-y: auto;
    }

    .nav-item {
      display: flex;
      align-items: center;
      padding: 0.75rem 1.5rem;
      color: rgba(255,255,255,0.7);
      text-decoration: none;
      white-space: nowrap;
      transition: all 0.2s;
      gap: 1rem;

      &:hover {
        background: rgba(255,255,255,0.1);
        color: #fff;
      }

      &.active {
        background: #FF7E31; /* Brand accent color */
        color: #fff;
      }

      i {
        width: 20px;
        text-align: center;
      }
    }

    .sidebar.collapsed .nav-item {
      justify-content: center;
      padding: 0.75rem 0;
      
      span {
        display: none;
      }
    }
  `]
})
export class SidebarComponent {
  constructor(public layoutService: LayoutService) { }
}
