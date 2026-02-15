import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Product, CreateProductDto, ProductCategory } from '../../../core/services/product.service';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <form (ngSubmit)="onSubmit()" #productForm="ngForm" class="product-form">
      <div class="form-grid">
        <div class="main-column">
          <!-- Basic Information -->
          <div class="form-section">
            <h5 class="section-title">
                <i class="fas fa-info-circle"></i> Basic Information
            </h5>
            <div class="form-group">
              <label for="name" class="form-label">Product Name <span class="required">*</span></label>
              <div class="input-wrapper">
                  <input type="text" class="input" id="name" required [(ngModel)]="model.name" name="name" #name="ngModel" placeholder="e.g. Wireless Headphones">
                  <i class="fas fa-tag input-icon"></i>
              </div>
              <div *ngIf="name.invalid && (name.dirty || name.touched)" class="text-error">
                Name is required.
              </div>
            </div>

            <div class="form-group">
              <label for="description" class="form-label">Description <span class="required">*</span></label>
              <textarea class="input textarea" id="description" rows="5" required [(ngModel)]="model.description" name="description" #description="ngModel" placeholder="Enter product description..."></textarea>
              <div *ngIf="description.invalid && (description.dirty || description.touched)" class="text-error">
                 Description is required.
              </div>
            </div>
          </div>

          <!-- Pricing & Inventory -->
          <div class="form-section">
            <h5 class="section-title">
                <i class="fas fa-coins"></i> Pricing & Inventory
            </h5>
            <div class="three-col-grid">
                <div class="form-group">
                    <label for="sku" class="form-label">SKU <span class="required">*</span></label>
                    <div class="input-wrapper">
                        <input type="text" class="input" id="sku" required [(ngModel)]="model.sku" name="sku" #sku="ngModel" placeholder="e.g. WH-1000XM4">
                        <i class="fas fa-barcode input-icon"></i>
                    </div>
                    <div *ngIf="sku.invalid && (sku.dirty || sku.touched)" class="text-error">
                    SKU is required.
                    </div>
                </div>
              <div class="form-group">
                <label for="price" class="form-label">Price <span class="required">*</span></label>
                <div class="input-wrapper">
                    <span class="currency-prefix">$</span>
                  <input type="number" class="input pl-4" id="price" required min="0.01" step="0.01" [(ngModel)]="model.price" name="price" #price="ngModel" placeholder="0.00">
                </div>
                <div *ngIf="price.invalid && (price.dirty || price.touched)" class="text-error">
                  Valid price required.
                </div>
              </div>

              <div class="form-group">
                <label for="stockQuantity" class="form-label">Stock <span class="required">*</span></label>
                <div class="input-wrapper">
                    <input type="number" class="input" id="stockQuantity" required min="0" [(ngModel)]="model.stockQuantity" name="stockQuantity" #stock="ngModel" placeholder="0">
                    <i class="fas fa-boxes input-icon"></i>
                </div>
                <div *ngIf="stock.invalid && (stock.dirty || stock.touched)" class="text-error">
                  Valid stock required.
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="sidebar-column">
          <!-- Organization -->
          <div class="form-section">
            <h5 class="section-title">
                <i class="fas fa-folder"></i> Organization
            </h5>
            <div class="form-group">
              <label for="category" class="form-label">Category <span class="required">*</span></label>
              <div class="select-wrapper">
                  <select class="select" id="category" required [(ngModel)]="model.category" name="category" #category="ngModel">
                    <option [ngValue]="null" disabled>Select a category</option>
                    <option *ngFor="let cat of categories" [ngValue]="cat.value">{{ cat.label }}</option>
                  </select>
                  <i class="fas fa-chevron-down select-icon"></i>
              </div>
              <div *ngIf="category.invalid && (category.dirty || category.touched)" class="text-error">
                Category is required.
              </div>
            </div>

            <div class="form-group">
                <label class="form-label">Status</label>
                <div class="toggle-switch-wrapper">
                    <label class="toggle-switch">
                        <input type="checkbox" id="isActive" [(ngModel)]="model.isActive" name="isActive">
                        <span class="slider round"></span>
                    </label>
                    <span class="status-label" [class.active]="model.isActive">
                        {{ model.isActive ? 'Active' : 'Inactive' }}
                    </span>
                </div>
            </div>
          </div>

          <!-- Media -->
          <div class="form-section">
              <h5 class="section-title">
                  <i class="fas fa-image"></i> Media
              </h5>
              <div class="form-group">
                <label for="imageUrl" class="form-label">Image URL</label>
                <div class="input-wrapper">
                    <input type="text" class="input" id="imageUrl" [(ngModel)]="model.imageUrl" name="imageUrl" placeholder="https://example.com/image.jpg">
                    <i class="fas fa-link input-icon"></i>
                </div>
              </div>
              <div class="image-preview" *ngIf="model.imageUrl">
                  <img [src]="model.imageUrl" alt="Preview" onerror="this.src='assets/placeholder.png'">
                  <div class="preview-badge">Preview</div>
              </div>
            </div>
        </div>
      </div>

      <div class="form-actions">
        <button type="button" class="btn btn-secondary" (click)="onCancel()">Cancel</button>
        <button type="submit" class="btn btn-primary" [disabled]="productForm.invalid || loading">
            <span *ngIf="loading" class="spinner"></span>
            <span>{{ isEdit ? 'Update Product' : 'Create Product' }}</span>
        </button>
      </div>
    </form>
  `,
  styles: [`
    :host {
        display: block;
        color: var(--text-primary);
    }
    
    .product-form {
        display: flex;
        flex-direction: column;
        gap: var(--space-6);
        padding: var(--space-6);
    }

    .form-grid {
        display: grid;
        grid-template-columns: 2fr 1fr;
        gap: var(--space-6);
    }
    
    @media (max-width: 768px) {
        .form-grid {
            grid-template-columns: 1fr;
        }
    }

    .form-section {
        background: var(--bg-surface);
        border: 1px solid var(--border-subtle);
        border-radius: 0.75rem;
        padding: var(--space-5);
        margin-bottom: var(--space-6);
    }
    
    .form-section:last-child {
        margin-bottom: 0;
    }

    .section-title {
        color: var(--text-primary);
        font-size: 1.1rem;
        font-weight: 600;
        margin-bottom: var(--space-5);
        padding-bottom: var(--space-3);
        border-bottom: 1px solid var(--border-subtle);
        display: flex;
        align-items: center;
        gap: var(--space-2);
        
        i { color: var(--accent-orange); }
    }

    .form-group {
        margin-bottom: var(--space-4);
        position: relative;
    }

    .form-label {
        display: block;
        margin-bottom: var(--space-2);
        font-size: 0.85rem;
        color: var(--text-secondary);
        font-weight: 500;
    }

    .required {
        color: #EF4444;
    }

    .input-wrapper {
        position: relative;
        display: flex;
        align-items: center;
    }

    .input, .select {
        width: 100%;
        background: var(--bg-input);
        border: 1px solid var(--border-subtle);
        border-radius: 0.5rem;
        padding: 0.75rem 1rem;
        padding-right: 2.5rem; /* Space for icon */
        color: var(--text-primary);
        font-size: 0.95rem;
        transition: all 0.2s;
        
        &:focus {
            border-color: var(--accent-orange);
            outline: none;
            box-shadow: 0 0 0 3px rgba(255, 126, 49, 0.1);
        }
        
        &::placeholder {
            color: var(--text-tertiary);
        }
    }
    
    .textarea {
        resize: vertical;
        padding-right: 1rem;
    }

    .input-icon {
        position: absolute;
        right: 1rem;
        color: var(--text-tertiary);
        pointer-events: none;
    }
    
    .currency-prefix {
        position: absolute;
        left: 1rem;
        color: var(--text-secondary);
        z-index: 1;
    }
    
    .pl-4 {
        padding-left: 2rem !important;
    }

    .select-wrapper {
        position: relative;
    }
    
    .select {
        appearance: none;
        cursor: pointer;
    }
    
    .select-icon {
        position: absolute;
        right: 1rem;
        top: 50%;
        transform: translateY(-50%);
        color: var(--text-tertiary);
        pointer-events: none;
    }

    .text-error {
        color: #EF4444;
        font-size: 0.8rem;
        margin-top: 0.35rem;
        display: flex;
        align-items: center;
        gap: 0.25rem;
        
        &::before {
            content: '\\f06a';
            font-family: 'Font Awesome 5 Free';
            font-weight: 900;
        }
    }

    .three-col-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: var(--space-4);
        
        @media (max-width: 576px) {
            grid-template-columns: 1fr;
        }
    }

    /* Toggle Switch */
    .toggle-switch-wrapper {
        display: flex;
        align-items: center;
        gap: var(--space-3);
        background: var(--bg-input);
        padding: var(--space-3);
        border-radius: 0.5rem;
        border: 1px solid var(--border-subtle);
    }
    
    .toggle-switch {
        position: relative;
        display: inline-block;
        width: 48px;
        height: 24px;
        margin-bottom: 0;
    }
    
    .toggle-switch input {
        opacity: 0;
        width: 0;
        height: 0;
    }
    
    .slider {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: var(--bg-primary);
        transition: .4s;
        border: 1px solid var(--border-subtle);
    }
    
    .slider:before {
        position: absolute;
        content: "";
        height: 18px;
        width: 18px;
        left: 2px;
        bottom: 2px;
        background-color: var(--text-tertiary);
        transition: .4s;
    }
    
    input:checked + .slider {
        background-color: rgba(255, 126, 49, 0.2);
        border-color: var(--accent-orange);
    }
    
    input:checked + .slider:before {
        transform: translateX(24px);
        background-color: var(--accent-orange);
    }
    
    .slider.round {
        border-radius: 24px;
    }
    
    .slider.round:before {
        border-radius: 50%;
    }
    
    .status-label {
        font-weight: 500;
        font-size: 0.9rem;
        color: var(--text-secondary);
        
        &.active {
            color: #10B981;
        }
    }

    /* Image Preview */
    .image-preview {
        margin-top: var(--space-3);
        border-radius: 0.5rem;
        overflow: hidden;
        border: 1px solid var(--border-subtle);
        background: var(--bg-primary);
        position: relative;
        text-align: center;
        padding: var(--space-4);
        
        img {
            max-height: 150px;
            max-width: 100%;
            object-fit: contain;
        }
        
        .preview-badge {
            position: absolute;
            top: 0.5rem;
            right: 0.5rem;
            background: rgba(0,0,0,0.6);
            color: white;
            font-size: 0.7rem;
            padding: 2px 6px;
            border-radius: 4px;
        }
    }

    .form-actions {
        display: flex;
        justify-content: flex-end;
        gap: var(--space-3);
        padding-top: var(--space-4);
        border-top: 1px solid var(--border-subtle);
        margin-top: var(--space-2);
    }
  `]
})
export class ProductFormComponent implements OnInit {
  @Input() product: Product | null = null;
  @Input() loading = false;
  @Output() save = new EventEmitter<CreateProductDto>();
  @Output() cancel = new EventEmitter<void>();

  model: CreateProductDto = {
    name: '',
    description: '',
    sku: '',
    price: 0,
    stockQuantity: 0,
    category: ProductCategory.Electronics,
    imageUrl: '',
    isActive: true
  };

  isEdit = false;

  categories = [
    { value: ProductCategory.Electronics, label: 'Electronics' },
    { value: ProductCategory.Clothing, label: 'Clothing' },
    { value: ProductCategory.Home, label: 'Home' },
    { value: ProductCategory.Sports, label: 'Sports' },
    { value: ProductCategory.Books, label: 'Books' },
    { value: ProductCategory.Toys, label: 'Toys' },
    { value: ProductCategory.Other, label: 'Other' }
  ];

  ngOnInit() {
    if (this.product) {
      this.isEdit = true;
      this.model = {
        name: this.product.name,
        description: this.product.description,
        sku: this.product.sku,
        price: this.product.price,
        stockQuantity: this.product.stockQuantity,
        category: this.product.category,
        imageUrl: this.product.imageUrl || '',
        isActive: this.product.isActive
      };
    }
  }

  onSubmit() {
    this.save.emit(this.model);
  }

  onCancel() {
    this.cancel.emit();
  }
}
