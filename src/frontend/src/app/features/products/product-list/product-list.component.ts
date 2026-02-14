import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductService, Product, PagedResult } from '../../../core/services/product.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  pagedResult: PagedResult<Product> = {
    items: [],
    totalCount: 0,
    pageNumber: 1,
    pageSize: 10,
    totalPages: 0,
    hasPreviousPage: false,
    hasNextPage: false
  };
  loading = false;
  selectedProduct: Product | null = null;
  showDetailsDialog = false;
  showDeleteConfirm = false;
  productToDelete: Product | null = null;
  pageSizeOptions = [10, 25, 50, 100];

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

  onPageSizeChange(): void {
    this.pagedResult.pageNumber = 1;
    this.loadProducts();
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

  firstPage(): void {
    this.pagedResult.pageNumber = 1;
    this.loadProducts();
  }

  lastPage(): void {
    this.pagedResult.pageNumber = this.pagedResult.totalPages;
    this.loadProducts();
  }

  viewDetails(product: Product): void {
    this.selectedProduct = product;
    this.showDetailsDialog = true;
  }

  closeDetailsDialog(): void {
    this.showDetailsDialog = false;
    this.selectedProduct = null;
  }

  confirmDelete(product: Product): void {
    this.productToDelete = product;
    this.showDeleteConfirm = true;
  }

  cancelDelete(): void {
    this.showDeleteConfirm = false;
    this.productToDelete = null;
  }

  deleteProduct(): void {
    if (!this.productToDelete) return;

    this.loading = true;
    this.productService.deleteProduct(this.productToDelete.id).subscribe({
      next: () => {
        this.showDeleteConfirm = false;
        this.productToDelete = null;
        this.loadProducts();
      },
      error: (err) => {
        console.error('Error deleting product:', err);
        this.loading = false;
        this.showDeleteConfirm = false;
      }
    });
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
    if (data.length === 0) {
      console.warn('No data to export');
      return;
    }

    const headers = ['ID', 'Name', 'SKU', 'Description', 'Price', 'Stock', 'Category', 'Active', 'Created'];
    const csvData = data.map(p => [
      p.id,
      `"${p.name}"`,
      p.sku,
      `"${p.description}"`,
      p.price,
      p.stockQuantity,
      p.categoryName,
      p.isActive ? 'Yes' : 'No',
      new Date(p.createdAt).toLocaleDateString()
    ]);

    const csv = [
      headers.join(','),
      ...csvData.map(row => row.join(','))
    ].join('\r\n');

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', `products-${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }

  get startIndex(): number {
    return (this.pagedResult.pageNumber - 1) * this.pagedResult.pageSize + 1;
  }

  get endIndex(): number {
    return Math.min(
      this.pagedResult.pageNumber * this.pagedResult.pageSize,
      this.pagedResult.totalCount
    );
  }
}
