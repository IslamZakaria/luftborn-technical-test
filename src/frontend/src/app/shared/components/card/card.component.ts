import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-card',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div [class]="interactive ? 'card-interactive' : 'card'">
      <div class="card-header" *ngIf="title || description">
        <h3 class="card-title" *ngIf="title">{{ title }}</h3>
        <p class="card-description" *ngIf="description">{{ description }}</p>
      </div>
      <div class="card-body">
        <ng-content></ng-content>
      </div>
    </div>
  `
})
export class CardComponent {
    @Input() title = '';
    @Input() description = '';
    @Input() interactive = false;
}
