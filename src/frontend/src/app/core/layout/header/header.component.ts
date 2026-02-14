import { Component, inject } from '@angular/core';
import { CommonModule, AsyncPipe } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { LayoutService } from '../../services/layout.service';

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [CommonModule, AsyncPipe],
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
    layoutService = inject(LayoutService);
    authService = inject(AuthService);
    currentUser$ = this.authService.currentUser$;

    toggleSidebar() {
        this.layoutService.toggleSidebar();
    }
}
