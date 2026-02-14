import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Product, CreateProductDto, ProductCategory } from '../../../core/services/product.service';

@Component({
    selector: 'app-product-form',
    standalone: true,
    imports: [CommonModule, FormsModule],
    template: `
    <form (ngSubmit)="onSubmit()" #productForm="ngForm">
      <div class="row">
        <div class="col-md-8">
          <!-- Basic Information -->
          <div class="mb-4">
            <h5 class="section-title">Basic Information</h5>
            <div class="mb-3">
              <label for="name" class="form-label">Product Name <span class="text-danger">*</span></label>
              <input type="text" class="input" id="name" required [(ngModel)]="model.name" name="name" #name="ngModel" placeholder="e.g. Wireless Headphones">
              <div *ngIf="name.invalid && (name.dirty || name.touched)" class="text-error mt-1">
                Name is required.
              </div>
            </div>

            <div class="mb-3">
              <label for="description" class="form-label">Description <span class="text-danger">*</span></label>
              <textarea class="input" id="description" rows="4" required [(ngModel)]="model.description" name="description" #description="ngModel" placeholder="Enter product description..."></textarea>
              <div *ngIf="description.invalid && (description.dirty || description.touched)" class="text-error mt-1">
                 Description is required.
              </div>
            </div>
          </div>

          <!-- Pricing & Inventory -->
          <div class="mb-4">
            <h5 class="section-title">Pricing & Inventory</h5>
            <div class="row">
                <div class="col-md-4 mb-3">
                    <label for="sku" class="form-label">SKU <span class="text-danger">*</span></label>
                    <input type="text" class="input" id="sku" required [(ngModel)]="model.sku" name="sku" #sku="ngModel" placeholder="e.g. WH-1000XM4">
                    <div *ngIf="sku.invalid && (sku.dirty || sku.touched)" class="text-error mt-1">
                    SKU is required.
                    </div>
                </div>
              <div class="col-md-4 mb-3">
                <label for="price" class="form-label">Price <span class="text-danger">*</span></label>
                <div class="input-group">
                  <input type="number" class="input" id="price" required min="0.01" step="0.01" [(ngModel)]="model.price" name="price" #price="ngModel" placeholder="0.00">
                </div>
                <div *ngIf="price.invalid && (price.dirty || price.touched)" class="text-error mt-1">
                  Valid price required.
                </div>
              </div>

              <div class="col-md-4 mb-3">
                <label for="stockQuantity" class="form-label">Stock <span class="text-danger">*</span></label>
                <input type="number" class="input" id="stockQuantity" required min="0" [(ngModel)]="model.stockQuantity" name="stockQuantity" #stock="ngModel" placeholder="0">
                <div *ngIf="stock.invalid && (stock.dirty || stock.touched)" class="text-error mt-1">
                  Valid stock required.
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-md-4">
          <!-- Organization -->
          <div class="mb-4">
            <h5 class="section-title">Organization</h5>
            <div class="mb-3">
              <label for="category" class="form-label">Category <span class="text-danger">*</span></label>
              <select class="select" id="category" required [(ngModel)]="model.category" name="category" #category="ngModel">
                <option [ngValue]="null" disabled>Select a category</option>
                <option *ngFor="let cat of categories" [ngValue]="cat.value">{{ cat.label }}</option>
              </select>
              <div *ngIf="category.invalid && (category.dirty || category.touched)" class="text-error mt-1">
                Category is required.
              </div>
            </div>

            <div class="mb-3">
                <label class="form-label d-block">Status</label>
                <div class="form-check form-switch">
                    <input class="checkbox" type="checkbox" id="isActive" [(ngModel)]="model.isActive" name="isActive">
                    <label class="form-check-label ms-2" for="isActive">
                        {{ model.isActive ? 'Active' : 'Inactive' }}
                    </label>
                </div>
            </div>
          </div>

          <!-- Media -->
          <div class="mb-4">
              <h5 class="section-title">Media</h5>
              <div class="mb-3">
                <label for="imageUrl" class="form-label">Image URL</label>
                <input type="text" class="input" id="imageUrl" [(ngModel)]="model.imageUrl" name="imageUrl" placeholder="https://example.com/image.jpg">
              </div>
              <div class="mt-3 border rounded p-2 text-center bg-dark" *ngIf="model.imageUrl">
                  <img [src]="model.imageUrl" alt="Preview" style="max-height: 150px; max-width: 100%; object-fit: contain;" onerror="this.src='assets/placeholder.png'">
              </div>
            </div>
        </div>
      </div>

      <div class="form-actions d-flex justify-content-end gap-3 mt-4 pt-4 border-top">
        <button type="button" class="btn btn-secondary" (click)="onCancel()">Cancel</button>
        <button type="submit" class="btn btn-primary" [disabled]="productForm.invalid || loading">
            <span *ngIf="loading" class="spinner"></span>
            <span>{{ isEdit ? 'Update' : 'Create' }} Product</span>
        </button>
      </div>
    </form>
  `,
    styles: [`
    .section-title {
        color: var(--text-primary);
        font-size: var(--text-lg);
        margin-bottom: var(--space-4);
        border-bottom: 1px solid var(--border-subtle);
        padding-bottom: var(--space-2);
    }
    .text-error {
        color: #EF4444;
        font-size: var(--text-xs);
    }
    .border { border: 1px solid var(--border-subtle) !important; }
    .rounded { border-radius: var(--space-2) !important; }
    .p-2 { padding: var(--space-2) !important; }
    .mt-1 { margin-top: var(--space-1) !important; }
    .mt-3 { margin-top: var(--space-3) !important; }
    .mt-4 { margin-top: var(--space-4) !important; }
    .pt-4 { padding-top: var(--space-4) !important; }
    .mb-3 { margin-bottom: var(--space-3) !important; }
    .mb-4 { margin-bottom: var(--space-4) !important; }
    .ms-2 { margin-left: var(--space-2) !important; }
    .row { display: flex; flex-wrap: wrap; margin: 0 -0.5rem; }
    .col-md-8 { flex: 0 0 66.666667%; max-width: 66.666667%; padding: 0 0.5rem; }
    .col-md-4 { flex: 0 0 33.333333%; max-width: 33.333333%; padding: 0 0.5rem; }
    .d-flex { display: flex; }
    .justify-content-end { justify-content: flex-end; }
    .gap-3 { gap: var(--space-3); }
    .form-check { display: flex; align-items: center; }
    .form-check-label { color: var(--text-secondary); cursor: pointer; }
    .border-top { border-top: 1px solid var(--border-subtle); }
    .bg-dark { background: var(--bg-input); }
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
