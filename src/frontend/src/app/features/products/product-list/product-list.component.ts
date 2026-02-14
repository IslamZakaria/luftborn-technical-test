import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProductService, Product, PagedResult } from '../../../core/services/product.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="container">
      <div class="page-header d-flex justify-content-between align-items-center">
        <h1>Products</h1>
        <div class="actions">
          <button (click)="exportProducts()" class="btn btn-outline-success me-2" [disabled]="loading">
            <i class="fas fa-file-export me-1"></i> Export
          </button>
          <a routerLink="/products/create" class="btn btn-primary">
            <i class="fas fa-plus me-1"></i> New Product
          </a>
        </div>
      </div>

      @if (loading) {
        <div class="text-center">
          <div class="spinner"></div>
        </div>
      } @else if (products.length > 0) {
        <div class="product-grid">
          @for (product of products; track product.id) {
            <div class="product-card card">
              @if (product.imageUrl) {
                <img [src]="product.imageUrl" [alt]="product.name" class="product-image">
              }
              <div class="product-info">
                <h3>{{ product.name }}</h3>
                <p class="product-description">{{ product.description }}</p>
                <div class="product-meta">
                  <span class="price">\${{ product.price.toFixed(2) }}</span>
                  <span class="stock">Stock: {{ product.stockQuantity }}</span>
                </div>
                <a [routerLink]="['/products', product.id]" class="btn btn-primary">View Details</a>
              </div>
            </div>
          }
        </div>

        <div class="pagination">
          <button 
            (click)="previousPage()" 
            [disabled]="!pagedResult.hasPreviousPage"
            class="btn btn-secondary">
            Previous
          </button>
          <span>Page {{ pagedResult.pageNumber }} of {{ pagedResult.totalPages }}</span>
          <button 
            (click)="nextPage()" 
            [disabled]="!pagedResult.hasNextPage"
            class="btn btn-secondary">
            Next
          </button>
        </div>
      } @else {
        <p class="text-center">No products found.</p>
      }
    </div>
  `,
  styles: [`
    .page-header {
      margin: 2rem 0;
    }

    .product-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 1.5rem;
      margin-bottom: 2rem;
    }

    .product-card {
      display: flex;
      flex-direction: column;
      transition: transform 0.2s;

      &:hover {
        transform: translateY(-4px);
        box-shadow: var(--shadow-md);
      }
    }

    .product-image {
      width: 100%;
      height: 200px;
      object-fit: cover;
      border-radius: 8px 8px 0 0;
    }

    .product-info {
      padding: 1rem;
    }

    .product-description {
      color: var(--color-text-light);
      font-size: 0.9rem;
      margin-bottom: 1rem;
    }

    .product-meta {
      display: flex;
      justify-content: space-between;
      margin-bottom: 1rem;
      font-weight: 500;
    }

    .price {
      color: var(--color-primary);
      font-size: 1.25rem;
    }

    .pagination {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 1rem;
      margin: 2rem 0;
    }
  `]
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  pagedResult: PagedResult<Product> = {
    items: [],
    totalCount: 0,
    pageNumber: 1,
    pageSize: 12,
    totalPages: 0,
    hasPreviousPage: false,
    hasNextPage: false
  };
  loading = false;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.loading = true;
    this.productService.getProducts(this.pagedResult.pageNumber, this.pagedResult.pageSize)
      .subscribe({
        next: (result) => {
          this.pagedResult = result;
          this.products = result.items;
          this.loading = false;
        },
        error: (err) => {
          console.error('Error loading products:', err);
          this.loading = false;
        }
      });
  }

  nextPage(): void {
    if (this.pagedResult.hasNextPage) {
      this.pagedResult.pageNumber++;
      this.loadProducts();
    }
  }

  previousPage(): void {
    if (this.pagedResult.hasPreviousPage) {
      this.pagedResult.pageNumber--;
      this.loadProducts();
    }
  }

  exportProducts(): void {
    this.loading = true;
    this.productService.getAllProducts().subscribe({
      next: (result) => {
        this.downloadCsv(result.items);
        this.loading = false;
      },
      error: (err) => {
        console.error('Error exporting products:', err);
        this.loading = false;
      }
    });
  }

  private downloadCsv(data: Product[]): void {
    const replacer = (key: string, value: any) => value === null ? '' : value;
    const header = Object.keys(data[0]);
    const csv = [
      header.join(','), // header row labels
      ...data.map(row => header.map(fieldName => JSON.stringify((row as any)[fieldName], replacer)).join(','))
    ].join('\r\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', 'products.csv');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
}
