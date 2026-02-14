import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export enum ProductCategory {
  Electronics = 1,
  Clothing = 2,
  Home = 3,
  Sports = 4,
  Books = 5,
  Toys = 6,
  Other = 7
}

export interface Product {
  id: number;
  name: string;
  description: string;
  sku: string;
  price: number;
  stockQuantity: number;
  category: ProductCategory;
  categoryName: string;
  imageUrl: string;
  isActive: boolean;
  createdAt: string;
  updatedAt?: string;
}

export interface CreateProductDto {
  name: string;
  description: string;
  sku: string;
  price: number;
  stockQuantity: number;
  category: ProductCategory;
  imageUrl: string;
  isActive: boolean;
}

export interface UpdateProductDto {
  name: string;
  description: string;
  sku: string;
  price: number;
  stockQuantity: number;
  category: ProductCategory;
  imageUrl: string;
  isActive: boolean;
}

export interface PagedResult<T> {
  items: T[];
  totalCount: number;
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = `${environment.apiUrl}/products`;

  constructor(private http: HttpClient) { }

  getProducts(pageNumber: number = 1, pageSize: number = 10): Observable<PagedResult<Product>> {
    const params = new HttpParams()
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString());
    return this.http.get<PagedResult<Product>>(this.apiUrl, { params });
  }

  getAllProducts(): Observable<PagedResult<Product>> {
    const params = new HttpParams()
      .set('pageNumber', '1')
      .set('pageSize', '10000'); // Fetch all for export
    return this.http.get<PagedResult<Product>>(this.apiUrl, { params });
  }

  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  createProduct(product: CreateProductDto): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, product);
  }

  updateProduct(id: number, product: UpdateProductDto): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/${id}`, product);
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  searchProducts(query: string): Observable<Product[]> {
    const params = new HttpParams().set('q', query);
    return this.http.get<Product[]>(`${this.apiUrl}/search`, { params });
  }
}
