import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { SidebarComponent } from '../../shared/components/sidebar/sidebar.component';
import { LayoutService } from '../services/layout.service';

@Component({
    selector: 'app-main-layout',
    standalone: true,
    imports: [RouterOutlet, HeaderComponent, SidebarComponent],
    template: `
    <div class="layout-container">
      <app-sidebar></app-sidebar>
      <div class="main-content" [class.collapsed]="layoutService.isSidebarCollapsed()">
        <app-header></app-header>
        <div class="content-wrapper">
          <router-outlet></router-outlet>
        </div>
      </div>
    </div>
  `,
    styles: [`
    .layout-container {
      display: flex;
      min-height: 100vh;
    }

    .main-content {
      flex: 1;
      margin-left: 250px; /* Width of sidebar */
      transition: margin-left 0.3s ease;
      display: flex;
      flex-direction: column;
    }

    .main-content.collapsed {
      margin-left: 70px;
    }
    
    .content-wrapper {
      padding: 2rem;
      background: #f8f9fa;
      flex: 1;
    }
    
    @media (max-width: 768px) {
      .main-content {
        margin-left: 0;
      }
      .main-content.collapsed {
        margin-left: 0;
      }
    }
  `]
})
export class MainLayoutComponent {
    constructor(public layoutService: LayoutService) { }
}
