import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LayoutService } from '../../services/layout.service';

@Component({
    selector: 'app-sidebar',
    standalone: true,
    imports: [CommonModule, RouterLink, RouterLinkActive],
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
    layoutService = inject(LayoutService);

    navItems = [
        { label: 'Dashboard', icon: 'assets/icons/dashboard.svg', route: '/dashboard' },
        { label: 'Products', icon: 'assets/icons/products.svg', route: '/products' },
        // Add more items as needed
    ];

    get collapsed() {
        return this.layoutService.isSidebarCollapsed();
    }

    toggleSidebar() {
        this.layoutService.toggleSidebar();
    }
}
