import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ProductService, CreateProductDto, ProductCategory } from '../../../core/services/product.service';

@Component({
  selector: 'app-product-create',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="container-fluid p-4">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 class="h3 mb-1">Create New Product</h1>
          <p class="text-secondary mb-0">Fill in the details to create a new product inventory item.</p>
        </div>
        <div class="d-flex gap-2">
            <a routerLink="/products" class="btn btn-outline-secondary">
                <i class="fas fa-times me-1"></i> Cancel
            </a>
            <button type="button" class="btn btn-primary" (click)="onSubmit()" [disabled]="productForm.invalid || loading">
                <span *ngIf="loading" class="spinner-border spinner-border-sm me-1"></span>
                <i class="fas fa-save me-1" *ngIf="!loading"></i> Create Product
            </button>
        </div>
      </div>

      <form (ngSubmit)="onSubmit()" #productForm="ngForm">
        <div class="row">
          <div class="col-lg-8">
            <!-- Basic Information -->
            <div class="card shadow-sm mb-4">
              <div class="card-header bg-white py-3">
                <h5 class="card-title mb-0">Basic Information</h5>
              </div>
              <div class="card-body">
                <div class="mb-3">
                  <label for="name" class="form-label">Product Name <span class="text-danger">*</span></label>
                  <input type="text" class="form-control" id="name" required [(ngModel)]="product.name" name="name" #name="ngModel" placeholder="e.g. Wireless Headphones">
                  <div *ngIf="name.invalid && (name.dirty || name.touched)" class="text-danger small mt-1">
                    Name is required.
                  </div>
                </div>

                <div class="mb-3">
                  <label for="description" class="form-label">Description <span class="text-danger">*</span></label>
                  <textarea class="form-control" id="description" rows="4" required [(ngModel)]="product.description" name="description" #description="ngModel" placeholder="Enter product description..."></textarea>
                  <div *ngIf="description.invalid && (description.dirty || description.touched)" class="text-danger small mt-1">
                     Description is required.
                  </div>
                </div>
              </div>
            </div>

            <!-- Pricing & Inventory -->
            <div class="card shadow-sm mb-4">
              <div class="card-header bg-white py-3">
                <h5 class="card-title mb-0">Pricing & Inventory</h5>
              </div>
              <div class="card-body">
                <div class="row">
                    <div class="col-md-4 mb-3">
                        <label for="sku" class="form-label">SKU <span class="text-danger">*</span></label>
                        <input type="text" class="form-control" id="sku" required [(ngModel)]="product.sku" name="sku" #sku="ngModel" placeholder="e.g. WH-1000XM4">
                        <div *ngIf="sku.invalid && (sku.dirty || sku.touched)" class="text-danger small mt-1">
                        SKU is required.
                        </div>
                    </div>
                  <div class="col-md-4 mb-3">
                    <label for="price" class="form-label">Price <span class="text-danger">*</span></label>
                    <div class="input-group">
                      <span class="input-group-text">$</span>
                      <input type="number" class="form-control" id="price" required min="0.01" step="0.01" [(ngModel)]="product.price" name="price" #price="ngModel" placeholder="0.00">
                    </div>
                    <div *ngIf="price.invalid && (price.dirty || price.touched)" class="text-danger small mt-1">
                      Valid price required.
                    </div>
                  </div>

                  <div class="col-md-4 mb-3">
                    <label for="stockQuantity" class="form-label">Stock Quantity <span class="text-danger">*</span></label>
                    <input type="number" class="form-control" id="stockQuantity" required min="0" [(ngModel)]="product.stockQuantity" name="stockQuantity" #stock="ngModel" placeholder="0">
                    <div *ngIf="stock.invalid && (stock.dirty || stock.touched)" class="text-danger small mt-1">
                      Valid stock required.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="col-lg-4">
            <!-- Organization -->
            <div class="card shadow-sm mb-4">
              <div class="card-header bg-white py-3">
                <h5 class="card-title mb-0">Organization</h5>
              </div>
              <div class="card-body">
                <div class="mb-3">
                  <label for="category" class="form-label">Category <span class="text-danger">*</span></label>
                  <select class="form-select" id="category" required [(ngModel)]="product.category" name="category" #category="ngModel">
                    <option [ngValue]="null" disabled>Select a category</option>
                    <option *ngFor="let cat of categories" [ngValue]="cat.value">{{ cat.label }}</option>
                  </select>
                  <div *ngIf="category.invalid && (category.dirty || category.touched)" class="text-danger small mt-1">
                    Category is required.
                  </div>
                </div>

                <div class="mb-3">
                    <label class="form-label d-block">Status</label>
                    <div class="form-check form-switch">
                        <input class="form-check-input" type="checkbox" id="isActive" [(ngModel)]="product.isActive" name="isActive">
                        <label class="form-check-label" for="isActive">
                            {{ product.isActive ? 'Active' : 'Inactive' }}
                        </label>
                    </div>
                </div>
              </div>
            </div>

            <!-- Media -->
            <div class="card shadow-sm mb-4">
                <div class="card-header bg-white py-3">
                  <h5 class="card-title mb-0">Media</h5>
                </div>
                <div class="card-body">
                  <div class="mb-3">
                    <label for="imageUrl" class="form-label">Image URL</label>
                    <input type="text" class="form-control" id="imageUrl" [(ngModel)]="product.imageUrl" name="imageUrl" placeholder="https://example.com/image.jpg">
                  </div>
                  <div class="mt-3 border rounded p-2 text-center bg-light" *ngIf="product.imageUrl">
                      <img [src]="product.imageUrl" alt="Preview" style="max-height: 150px; max-width: 100%; object-fit: contain;" onerror="this.src='assets/placeholder.png'">
                  </div>
                </div>
              </div>
          </div>
        </div>

        <div *ngIf="error" class="alert alert-danger mt-3">
          <i class="fas fa-exclamation-circle me-1"></i> {{ error }}
        </div>

      </form>
    </div>
  `,
  styles: [`
    .card { border: none; border-radius: 0.5rem; }
    .card-header { border-bottom: 1px solid var(--border-subtle); border-radius: 0.5rem 0.5rem 0 0; }
    .form-control, .form-select { border-color: var(--border-subtle); padding: 0.6rem 0.8rem; }
    .form-control:focus, .form-select:focus { border-color: var(--accent-orange); box-shadow: 0 0 0 0.2rem rgba(255, 126, 49, 0.25); }
    .btn-primary { background: var(--accent-orange); border-color: var(--accent-orange); }
    .btn-primary:hover { background: var(--accent-orange-dark); border-color: var(--accent-orange-dark); }
  `]
})
export class ProductCreateComponent {
  product: CreateProductDto = {
    name: '',
    description: '',
    sku: '',
    price: 0,
    stockQuantity: 0,
    category: ProductCategory.Electronics,
    imageUrl: '',
    isActive: true
  };

  categories = [
    { value: ProductCategory.Electronics, label: 'Electronics' },
    { value: ProductCategory.Clothing, label: 'Clothing' },
    { value: ProductCategory.Home, label: 'Home' },
    { value: ProductCategory.Sports, label: 'Sports' },
    { value: ProductCategory.Books, label: 'Books' },
    { value: ProductCategory.Toys, label: 'Toys' },
    { value: ProductCategory.Other, label: 'Other' }
  ];

  loading = false;
  error = '';

  constructor(
    private productService: ProductService,
    private router: Router
  ) { }

  onSubmit(): void {
    this.loading = true;
    this.error = '';

    this.productService.createProduct(this.product).subscribe({
      next: () => {
        this.router.navigate(['/products']);
      },
      error: (err) => {
        console.error('Error creating product:', err);
        this.error = 'Failed to create product. Please try again.';
        this.loading = false;
      }
    });
  }
}
