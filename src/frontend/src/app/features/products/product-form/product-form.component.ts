import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Product, CreateProductDto, ProductCategory } from '../../../core/services/product.service';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
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
