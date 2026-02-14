import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProductService, Product } from '../../../core/services/product.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="container" *ngIf="product">
      <div class="page-header d-flex justify-content-between align-items-center mb-4">
        <h1>{{ isEditing ? 'Edit Product' : product.name }}</h1>
        <div class="actions">
          <button *ngIf="!isEditing" (click)="enableEdit()" class="btn btn-primary me-2">
            <i class="fas fa-edit me-1"></i> Edit
          </button>
          <button *ngIf="!isEditing" (click)="widthDelete()" class="btn btn-danger me-2">
            <i class="fas fa-trash me-1"></i> Delete
          </button>
          <button *ngIf="isEditing" (click)="saveChanges()" class="btn btn-success me-2" [disabled]="loading">
            <i class="fas fa-save me-1"></i> Save
          </button>
          <button *ngIf="isEditing" (click)="cancelEdit()" class="btn btn-secondary" [disabled]="loading">
             Cancel
          </button>
          <a *ngIf="!isEditing" routerLink="/products" class="btn btn-outline-secondary">
            <i class="fas fa-arrow-left me-1"></i> Back
          </a>
        </div>
      </div>

      <div class="card shadow-sm">
        <div class="card-body">
          <div *ngIf="!isEditing" class="view-mode">
            <div class="row mb-3">
              <div class="col-md-3 fw-bold">SKU:</div>
              <div class="col-md-9">{{ product.sku }}</div>
            </div>
            <div class="row mb-3">
              <div class="col-md-3 fw-bold">Price:</div>
              <div class="col-md-9">\${{ product.price.toFixed(2) }}</div>
            </div>
            <div class="row mb-3">
              <div class="col-md-3 fw-bold">Stock:</div>
              <div class="col-md-9">{{ product.stockQuantity }}</div>
            </div>
            <div class="row mb-3">
              <div class="col-md-3 fw-bold">Description:</div>
              <div class="col-md-9">{{ product.description }}</div>
            </div>
          </div>

          <form *ngIf="isEditing" #editForm="ngForm">
            <div class="row">
              <div class="col-md-6 mb-3">
                <label for="name" class="form-label">Product Name</label>
                <input type="text" class="form-control" id="name" required [(ngModel)]="editProduct.name" name="name">
              </div>
              <div class="col-md-6 mb-3">
                <label for="sku" class="form-label">SKU</label>
                <input type="text" class="form-control" id="sku" required [(ngModel)]="editProduct.sku" name="sku">
              </div>
            </div>
            <div class="mb-3">
              <label for="description" class="form-label">Description</label>
              <textarea class="form-control" id="description" rows="3" required [(ngModel)]="editProduct.description" name="description"></textarea>
            </div>
            <div class="row">
              <div class="col-md-6 mb-3">
                <label for="price" class="form-label">Price</label>
                <input type="number" class="form-control" id="price" required min="0.01" [(ngModel)]="editProduct.price" name="price">
              </div>
              <div class="col-md-6 mb-3">
                <label for="stockQuantity" class="form-label">Stock</label>
                <input type="number" class="form-control" id="stockQuantity" required min="0" [(ngModel)]="editProduct.stockQuantity" name="stockQuantity">
              </div>
            </div>
          </form>
          
           <div *ngIf="error" class="alert alert-danger mt-3">
              {{ error }}
            </div>
        </div>
      </div>
    </div>
    
    <div *ngIf="!product && !loading" class="container text-center mt-5">
      <p>Product not found.</p>
      <a routerLink="/products" class="btn btn-primary">Go Back</a>
    </div>
  `,
  styles: [`
    .page-header { margin: 2rem 0; }
  `]
})
export class ProductDetailComponent implements OnInit {
  product: Product | null = null;
  editProduct: Partial<Product> = {};
  isEditing = false;
  loading = false;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.loadProduct(id);
    }
  }

  loadProduct(id: number): void {
    this.loading = true;
    this.productService.getProduct(id).subscribe({
      next: (data) => {
        this.product = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading product:', err);
        this.error = 'Failed to load product.';
        this.loading = false;
      }
    });
  }

  enableEdit(): void {
    if (this.product) {
      this.editProduct = { ...this.product };
      this.isEditing = true;
    }
  }

  cancelEdit(): void {
    this.isEditing = false;
    this.editProduct = {};
    this.error = '';
  }

  saveChanges(): void {
    if (!this.product) return;

    this.loading = true;
    this.productService.updateProduct(this.product.id, this.editProduct).subscribe({
      next: (updatedProduct) => {
        this.product = updatedProduct;
        this.isEditing = false;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error updating product:', err);
        this.error = 'Failed to update product.';
        this.loading = false;
      }
    });
  }

  widthDelete(): void {
    if (!this.product || !confirm('Are you sure you want to delete this product?')) return;

    this.loading = true;
    this.productService.deleteProduct(this.product.id).subscribe({
      next: () => {
        this.router.navigate(['/products']);
      },
      error: (err) => {
        console.error('Error deleting product:', err);
        this.error = 'Failed to delete product.';
        this.loading = false;
      }
    });
  }
}
