import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common'; // Import CommonModule for ngClass
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { LayoutService } from '../services/layout.service';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, SidebarComponent],
  template: `
    <div class="app-layout">
      <app-sidebar [class.collapsed]="layoutService.isSidebarCollapsed()"></app-sidebar>
      
      <div class="main-content" [class.sidebar-collapsed]="layoutService.isSidebarCollapsed()">
        <app-header></app-header>
        
        <main class="content-wrapper">
          <router-outlet></router-outlet>
        </main>
      </div>
    </div>
  `,
  styles: [`
    .app-layout {
      min-height: 100vh;
      background: var(--bg-primary);
    }

    .main-content {
      margin-left: 280px; /* Sidebar width */
      transition: margin-left 0.3s ease;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
    }

    .main-content.sidebar-collapsed {
      margin-left: 80px; /* Collapsed sidebar width */
    }

    .content-wrapper {
      padding: var(--space-6);
      flex: 1;
    }

    @media (max-width: 768px) {
      .main-content {
        margin-left: 0;
      }
      
      .main-content.sidebar-collapsed {
        margin-left: 0;
      }
    }
  `]
})
export class MainLayoutComponent {
  layoutService = inject(LayoutService);
}
