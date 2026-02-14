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
    <div class="container">
      <div class="page-header">
        <h1>Create New Product</h1>
      </div>

      <div class="card shadow-sm">
        <div class="card-body">
          <form (ngSubmit)="onSubmit()" #productForm="ngForm">
            
            <div class="row">
              <div class="col-md-6 mb-3">
                <label for="name" class="form-label">Product Name</label>
                <input type="text" class="form-control" id="name" required [(ngModel)]="product.name" name="name" #name="ngModel">
                <div *ngIf="name.invalid && (name.dirty || name.touched)" class="text-danger small">
                  Name is required.
                </div>
              </div>

              <div class="col-md-6 mb-3">
                <label for="sku" class="form-label">SKU</label>
                <input type="text" class="form-control" id="sku" required [(ngModel)]="product.sku" name="sku" #sku="ngModel">
                <div *ngIf="sku.invalid && (sku.dirty || sku.touched)" class="text-danger small">
                  SKU is required.
                </div>
              </div>
            </div>

            <div class="mb-3">
              <label for="description" class="form-label">Description</label>
              <textarea class="form-control" id="description" rows="3" required [(ngModel)]="product.description" name="description" #description="ngModel"></textarea>
              <div *ngIf="description.invalid && (description.dirty || description.touched)" class="text-danger small">
                Description is required.
              </div>
            </div>

            <div class="row">
              <div class="col-md-6 mb-3">
                <label for="price" class="form-label">Price</label>
                <div class="input-group">
                  <span class="input-group-text">$</span>
                  <input type="number" class="form-control" id="price" required min="0.01" step="0.01" [(ngModel)]="product.price" name="price" #price="ngModel">
                </div>
                <div *ngIf="price.invalid && (price.dirty || price.touched)" class="text-danger small">
                  Valid price is required.
                </div>
              </div>

              <div class="col-md-6 mb-3">
                <label for="stockQuantity" class="form-label">Stock Quantity</label>
                <input type="number" class="form-control" id="stockQuantity" required min="0" [(ngModel)]="product.stockQuantity" name="stockQuantity" #stock="ngModel">
                <div *ngIf="stock.invalid && (stock.dirty || stock.touched)" class="text-danger small">
                  Valid stock quantity is required.
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-md-6 mb-3">
                <label for="category" class="form-label">Category</label>
                <select class="form-control" id="category" required [(ngModel)]="product.category" name="category" #category="ngModel">
                  <option [ngValue]="null" disabled>Select a category</option>
                  <option *ngFor="let cat of categories" [ngValue]="cat.value">{{ cat.label }}</option>
                </select>
                <div *ngIf="category.invalid && (category.dirty || category.touched)" class="text-danger small">
                  Category is required.
                </div>
              </div>

              <div class="col-md-6 mb-3">
                <label for="imageUrl" class="form-label">Image URL</label>
                <input type="text" class="form-control" id="imageUrl" [(ngModel)]="product.imageUrl" name="imageUrl" placeholder="https://example.com/image.jpg">
              </div>
            </div>

            <div class="mb-3 form-check">
              <input type="checkbox" class="form-check-input" id="isActive" [(ngModel)]="product.isActive" name="isActive">
              <label class="form-check-label" for="isActive">Active</label>
            </div>

            <div class="d-flex justify-content-end gap-2 mt-4">
              <a routerLink="/products" class="btn btn-outline-secondary">Cancel</a>
              <button type="submit" class="btn btn-primary" [disabled]="productForm.invalid || loading">
                <span *ngIf="loading" class="spinner-border spinner-border-sm me-1"></span>
                Create Product
              </button>
            </div>

            <div *ngIf="error" class="alert alert-danger mt-3">
              {{ error }}
            </div>

          </form>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .page-header { margin: 2rem 0; }
    .card { border: none; }
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
