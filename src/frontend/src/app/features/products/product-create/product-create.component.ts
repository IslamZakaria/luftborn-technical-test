import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ProductService, CreateProductDto, ProductCategory } from '../../../core/services/product.service';

@Component({
  selector: 'app-product-create',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.scss']
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
