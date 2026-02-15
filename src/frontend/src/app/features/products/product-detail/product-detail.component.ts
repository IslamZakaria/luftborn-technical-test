import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProductService, Product, UpdateProductDto, ProductCategory } from '../../../core/services/product.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
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
