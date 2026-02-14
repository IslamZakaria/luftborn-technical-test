import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-button',
    standalone: true,
    imports: [CommonModule],
    template: `
    <button 
      [type]="type" 
      [class]="'btn btn-' + variant" 
      [disabled]="disabled" 
      (click)="handleClick($event)">
      <span *ngIf="icon" class="icon-slot">
        <i [class]="icon"></i> <!-- Assuming font awesome or similar, or replace with img/svg -->
      </span>
      <ng-content></ng-content>
    </button>
  `,
    styles: [`
    :host {
      display: inline-block;
    }
    .icon-slot {
      margin-right: var(--space-2);
    }
  `]
})
export class ButtonComponent {
    @Input() variant: 'primary' | 'secondary' | 'ghost' | 'icon' = 'primary';
    @Input() type: 'button' | 'submit' | 'reset' = 'button';
    @Input() disabled = false;
    @Input() icon = '';

    @Output() onClick = new EventEmitter<MouseEvent>();

    handleClick(event: MouseEvent) {
        if (!this.disabled) {
            this.onClick.emit(event);
        }
    }
}
