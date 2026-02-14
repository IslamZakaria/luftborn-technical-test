import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProductService, Product, UpdateProductDto, ProductCategory } from '../../../core/services/product.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="container-fluid p-4" *ngIf="product">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 class="h3 mb-1">{{ isEditing ? 'Edit Product' : product.name }}</h1>
          <p class="text-secondary mb-0" *ngIf="!isEditing">Product details and inventory status.</p>
          <p class="text-secondary mb-0" *ngIf="isEditing">Update product information.</p>
        </div>
        <div class="actions d-flex gap-2">
          <ng-container *ngIf="!isEditing">
              <a routerLink="/products" class="btn btn-outline-secondary">
                <i class="fas fa-arrow-left me-1"></i> Back
              </a>
              <button (click)="enableEdit()" class="btn btn-primary">
                <i class="fas fa-edit me-1"></i> Edit
              </button>
              <button (click)="confirmDelete()" class="btn btn-danger">
                <i class="fas fa-trash me-1"></i> Delete
              </button>
          </ng-container>
          <ng-container *ngIf="isEditing">
              <button (click)="cancelEdit()" class="btn btn-outline-secondary" [disabled]="loading">
                 Cancel
              </button>
              <button (click)="saveChanges()" class="btn btn-success" [disabled]="loading">
                <span *ngIf="loading" class="spinner-border spinner-border-sm me-1"></span>
                <i class="fas fa-save me-1" *ngIf="!loading"></i> Save Changes
              </button>
          </ng-container>
        </div>
      </div>

      <div class="row">
        <div class="col-lg-8">
            <!-- View Mode: Basic Info -->
            <div class="card shadow-sm mb-4" *ngIf="!isEditing">
                <div class="card-header bg-white py-3">
                    <h5 class="card-title mb-0">Product Information</h5>
                </div>
                <div class="card-body">
                    <div class="row mb-3">
                        <div class="col-sm-3 text-secondary">Description</div>
                        <div class="col-sm-9">{{ product.description }}</div>
                    </div>
                    <div class="row mb-3">
                        <div class="col-sm-3 text-secondary">SKU</div>
                        <div class="col-sm-9 font-monospace">{{ product.sku }}</div>
                    </div>
                </div>
            </div>

             <!-- Edit Mode: Basic Info -->
             <div class="card shadow-sm mb-4" *ngIf="isEditing">
                <div class="card-header bg-white py-3">
                    <h5 class="card-title mb-0">Basic Information</h5>
                </div>
                <div class="card-body">
                    <div class="mb-3">
                        <label for="name" class="form-label">Product Name</label>
                        <input type="text" class="form-control" id="name" required [(ngModel)]="editProduct.name" name="name">
                    </div>
                    <div class="mb-3">
                        <label for="description" class="form-label">Description</label>
                        <textarea class="form-control" id="description" rows="4" required [(ngModel)]="editProduct.description" name="description"></textarea>
                    </div>
                </div>
             </div>

            <!-- View Mode: Pricing & Stock -->
            <div class="card shadow-sm mb-4" *ngIf="!isEditing">
                <div class="card-header bg-white py-3">
                    <h5 class="card-title mb-0">Pricing & Inventory</h5>
                </div>
                <div class="card-body">
                    <div class="row">
                        <div class="col-md-6 border-end">
                            <div class="d-flex flex-column align-items-center justify-content-center p-3">
                                <span class="text-secondary mb-1">Price</span>
                                <span class="h2 mb-0">\${{ product.price.toFixed(2) }}</span>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="d-flex flex-column align-items-center justify-content-center p-3">
                                <span class="text-secondary mb-1">Stock</span>
                                <span class="h2 mb-0" [class.text-danger]="product.stockQuantity < 10">{{ product.stockQuantity }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Edit Mode: Pricing & Stock -->
            <div class="card shadow-sm mb-4" *ngIf="isEditing">
                <div class="card-header bg-white py-3">
                    <h5 class="card-title mb-0">Pricing & Inventory</h5>
                </div>
                <div class="card-body">
                    <div class="row">
                        <div class="col-md-6 mb-3">
                            <label for="sku" class="form-label">SKU</label>
                            <input type="text" class="form-control" id="sku" required [(ngModel)]="editProduct.sku" name="sku">
                        </div>
                         <div class="col-md-6 mb-3"></div> <!-- Spacer -->
                        <div class="col-md-6 mb-3">
                            <label for="price" class="form-label">Price</label>
                            <div class="input-group">
                                <span class="input-group-text">$</span>
                                <input type="number" class="form-control" id="price" required min="0.01" step="0.01" [(ngModel)]="editProduct.price" name="price">
                            </div>
                        </div>
                        <div class="col-md-6 mb-3">
                            <label for="stockQuantity" class="form-label">Stock</label>
                            <input type="number" class="form-control" id="stockQuantity" required min="0" [(ngModel)]="editProduct.stockQuantity" name="stockQuantity">
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
                    <!-- View Mode -->
                    <ng-container *ngIf="!isEditing">
                        <div class="mb-3">
                            <label class="text-secondary small d-block mb-1">Category</label>
                            <span class="badge bg-light text-dark border">{{ product.categoryName }}</span>
                        </div>
                         <div class="mb-3">
                            <label class="text-secondary small d-block mb-1">Status</label>
                            <span class="badge" [class.bg-success]="product.isActive" [class.bg-secondary]="!product.isActive">
                                {{ product.isActive ? 'Active' : 'Inactive' }}
                            </span>
                        </div>
                    </ng-container>

                    <!-- Edit Mode -->
                    <ng-container *ngIf="isEditing">
                        <div class="mb-3">
                            <label for="category" class="form-label">Category</label>
                            <select class="form-select" id="category" required [(ngModel)]="editProduct.category" name="category">
                                <option *ngFor="let cat of categories" [ngValue]="cat.value">{{ cat.label }}</option>
                            </select>
                        </div>
                        <div class="mb-3">
                             <div class="form-check form-switch">
                                <input class="form-check-input" type="checkbox" id="isActive" [(ngModel)]="editProduct.isActive" name="isActive">
                                <label class="form-check-label" for="isActive">
                                    {{ editProduct.isActive ? 'Active' : 'Inactive' }}
                                </label>
                            </div>
                        </div>
                    </ng-container>
                </div>
            </div>

            <!-- Media -->
            <div class="card shadow-sm mb-4">
                <div class="card-header bg-white py-3">
                    <h5 class="card-title mb-0">Media</h5>
                </div>
                <div class="card-body">
                    <div class="text-center bg-light rounded p-3 mb-3">
                         <img [src]="isEditing ? editProduct.imageUrl : product.imageUrl" alt="Product Image" style="max-height: 150px; max-width: 100%; object-fit: contain;" onerror="this.src='assets/placeholder.png'">
                    </div>
                    <div class="mb-3" *ngIf="isEditing">
                        <label for="imageUrl" class="form-label">Image URL</label>
                        <input type="text" class="form-control" id="imageUrl" [(ngModel)]="editProduct.imageUrl" name="imageUrl">
                    </div>
                </div>
            </div>
        </div>
      </div>
      
       <div *ngIf="error" class="alert alert-danger mt-3">
          <i class="fas fa-exclamation-circle me-1"></i> {{ error }}
        </div>
    </div>
    
    <div *ngIf="!product && !loading" class="container text-center mt-5">
      <div class="py-5">
        <i class="fas fa-box-open fa-3x text-secondary mb-3"></i>
        <h3>Product not found</h3>
        <p class="text-secondary">The product you are looking for does not exist or has been removed.</p>
        <a routerLink="/products" class="btn btn-primary mt-2">Go Back to Products</a>
      </div>
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
export class ProductDetailComponent implements OnInit {
  product: Product | null = null;
  editProduct: UpdateProductDto = {
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
      this.editProduct = {
        name: this.product.name,
        description: this.product.description,
        sku: this.product.sku,
        price: this.product.price,
        stockQuantity: this.product.stockQuantity,
        category: this.product.category,
        imageUrl: this.product.imageUrl,
        isActive: this.product.isActive
      };
      this.isEditing = true;
    }
  }

  cancelEdit(): void {
    this.isEditing = false;
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

  confirmDelete(): void {
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
