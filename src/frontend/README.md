# Luftborn Frontend - Angular 19

Modern Angular SPA with standalone components, TypeScript strict mode, and Luftborn design system.

---

## 🏗️ Project Structure

```
src/frontend/
├── src/
│   ├── app/
│   │   ├── app.component.ts        # Root component
│   │   ├── app.routes.ts           # Application routing
│   │   │
│   │   ├── core/                   # Singleton services, guards, interceptors
│   │   │   ├── services/
│   │   │   │   ├── api.service.ts        # Base HTTP service
│   │   │   │   ├── auth.service.ts       # Authentication logic
│   │   │   │   └── product.service.ts    # Product API calls
│   │   │   ├── guards/
│   │   │   │   └── auth.guard.ts         # Route protection
│   │   │   ├── interceptors/
│   │   │   │   ├── auth.interceptor.ts   # JWT token injection
│   │   │   │   └── error.interceptor.ts  # Global error handling
│   │   │   └── models/                   # TypeScript interfaces
│   │   │       ├── product.model.ts
│   │   │       └── auth.model.ts
│   │   │
│   │   ├── shared/                 # Reusable components
│   │   │   └── components/
│   │   │       └── header/
│   │   │           └── header.component.ts
│   │   │
│   │   └── features/               # Feature modules
│   │       ├── products/
│   │       │   ├── product-list/
│   │       │   ├── product-detail/
│   │       │   └── product-create/
│   │       └── auth/
│   │           ├── login/
│   │           └── register/
│   │
│   ├── environments/
│   │   ├── environment.ts              # Development config
│   │   └── environment.development.ts
│   │
│   ├── styles/
│   │   └── styles.scss             # Global styles (Luftborn design)
│   │
│   ├── assets/                     # Static assets (images, icons)
│   ├── index.html                  # HTML entry point
│   └── main.ts                     # Bootstrap application
│
├── angular.json                    # Angular CLI configuration
├── tsconfig.json                   # TypeScript configuration
├── package.json                    # npm dependencies
├── Dockerfile                      # Frontend container
└── nginx.conf                      # Nginx configuration
```

---

## 🚀 Quick Start

### Prerequisites
- Node.js 20+
- npm 10+

### Run with Docker Compose (Recommended)

```bash
# From project root
docker compose up --build
```

Frontend will be available at **http://localhost:4200**

### Run Locally (Development Mode)

1. **Install Dependencies**
```bash
npm install
```

2. **Start Development Server**
```bash
npm start
# or
ng serve
```

3. **Access Application**
- **URL**: http://localhost:4200
- **Auto-reload**: Changes detected automatically

---

## 🛠️ Available Scripts

```bash
# Development server
npm start                    # Starts dev server at http://localhost:4200

# Production build
npm run build               # Builds optimized production bundle

# Run tests
npm test                    # Executes unit tests via Karma
npm run test:coverage       # Run tests with coverage report

# Linting
npm run lint                # Run ESLint

# Build and serve production locally
npm run build && npx http-server dist/luftborn-frontend/browser
```

---

## 🎨 Design System (Luftborn Branding)

### Color Palette

```scss
// Primary Colors
--color-primary: #0066CC;        // Luftborn Blue
--color-secondary: #FF6B35;      // Orange accent (from logo)

// Neutral Colors
--color-background: #FFFFFF;     // White
--color-text: #2C3E50;           // Dark gray
--color-text-light: #7F8C8D;     // Light gray

// Status Colors
--color-success: #27AE60;        // Green
--color-error: #E74C3C;          // Red
--color-warning: #F39C12;        // Orange
```

### Typography

```scss
// Font Families
--font-family-base: 'Inter', 'Roboto', -apple-system, sans-serif;
--font-family-heading: 'Inter', sans-serif;

// Font Sizes (based on 16px root)
--font-size-xs: 0.75rem;   // 12px
--font-size-sm: 0.875rem;  // 14px
--font-size-md: 1rem;      // 16px
--font-size-lg: 1.125rem;  // 18px
--font-size-xl: 1.25rem;   // 20px
--font-size-2xl: 1.5rem;   // 24px
```

### Spacing System

```scss
// Based on 8px grid
--spacing-xs: 0.25rem;   // 4px
--spacing-sm: 0.5rem;    // 8px
--spacing-md: 1rem;      // 16px
--spacing-lg: 1.5rem;    // 24px
--spacing-xl: 2rem;      // 32px
--spacing-2xl: 3rem;     // 48px
```

---

## 🔧 Architecture Patterns

### 1. Standalone Components (No NgModules)

Angular 19 uses standalone components exclusively:

```typescript
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './product-list.component.html'
})
export class ProductListComponent { }
```

### 2. Lazy Loading Routes

```typescript
// app.routes.ts
export const routes: Routes = [
  {
    path: 'products',
    loadComponent: () => import('./features/products/product-list/product-list.component')
      .then(m => m.ProductListComponent)
  }
];
```

### 3. HTTP Interceptors

**Auth Interceptor** (Injects JWT token):
```typescript
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('access_token');
  
  if (token) {
    req = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` }
    });
  }
  
  return next(req);
};
```

**Error Interceptor** (Global error handling):
```typescript
export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      // Handle different error types
      if (error.status === 401) {
        // Redirect to login
      }
      return throwError(() => error);
    })
  );
};
```

### 4. Route Guards

```typescript
export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  
  if (authService.isAuthenticated()) {
    return true;
  }
  
  router.navigate(['/login'], { 
    queryParams: { returnUrl: state.url } 
  });
  return false;
};
```

---

## 📡 API Integration

### Environment Configuration

```typescript
// environment.ts
export const environment = {
  production: false,
  apiUrl: 'http://localhost:5000/api/v1'
};

// environment.production.ts
export const environment = {
  production: true,
  apiUrl: 'https://api.luftborn.com/api/v1'
};
```

### Service Example: ProductService

```typescript
@Injectable({ providedIn: 'root' })
export class ProductService {
  private apiUrl = `${environment.apiUrl}/products`;

  constructor(private http: HttpClient) {}

  getProducts(page: number = 1, pageSize: number = 10): Observable<PagedResult<Product>> {
    return this.http.get<PagedResult<Product>>(this.apiUrl, {
      params: { pageNumber: page, pageSize }
    });
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
}
```

---

## 🔐 Authentication Flow

### 1. User Logs In

```typescript
// login.component.ts
login() {
  this.authService.login(this.email, this.password).subscribe({
    next: (response) => {
      // Token stored automatically by AuthService
      this.router.navigate(['/products']);
    },
    error: (error) => {
      this.errorMessage = error.message;
    }
  });
}
```

### 2. AuthService Stores Token

```typescript
// auth.service.ts
login(email: string, password: string): Observable<AuthResponse> {
  return this.http.post<AuthResponse>(`${this.apiUrl}/auth/login`, { email, password })
    .pipe(
      tap(response => {
        // Store token in localStorage
        localStorage.setItem('access_token', response.accessToken);
        localStorage.setItem('refresh_token', response.refreshToken);
        this.currentUserSubject.next(response.user);
      })
    );
}
```

### 3. Interceptor Adds Token to Requests

```typescript
// auth.interceptor.ts - Applied automatically
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('access_token');
  
  if (token) {
    req = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` }
    });
  }
  
  return next(req);
};
```

### 4. Guard Protects Routes

```typescript
// app.routes.ts
{
  path: 'products/create',
  loadComponent: () => import('./features/products/product-create/...'),
  canActivate: [authGuard]  // ← Requires authentication
}
```

---

## 🧪 Testing

### Unit Tests (Karma + Jasmine)

```bash
# Run all tests
npm test

# Run with coverage
npm run test:coverage

# Run in headless mode (CI)
ng test --browsers=ChromeHeadless --watch=false
```

### Example Test

```typescript
describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;
  let productService: jasmine.SpyObj<ProductService>;

  beforeEach(async () => {
    const productServiceSpy = jasmine.createSpyObj('ProductService', ['getProducts']);

    await TestBed.configureTestingModule({
      imports: [ProductListComponent],
      providers: [
        { provide: ProductService, useValue: productServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    productService = TestBed.inject(ProductService) as jasmine.SpyObj<ProductService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load products on init', () => {
    const mockProducts = { data: [...], totalCount: 10 };
    productService.getProducts.and.returnValue(of(mockProducts));

    component.ngOnInit();

    expect(productService.getProducts).toHaveBeenCalled();
    expect(component.products.length).toBe(mockProducts.data.length);
  });
});
```

---

## 🐳 Docker Deployment

### Dockerfile (Multi-stage Build)

```dockerfile
# Build stage
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine
COPY --from=build /app/dist/luftborn-frontend/browser /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### nginx.conf (Routing Configuration)

```nginx
server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;

    # Angular routing - serve index.html for all routes
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Proxy API requests to backend
    location /api {
        proxy_pass http://backend:5000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }

    # Gzip compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript;
}
```

---

## 🔧 Configuration

### TypeScript Configuration (tsconfig.json)

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ES2022",
    "lib": ["ES2022", "DOM"],
    "strict": true,                    // Strict type checking
    "noImplicitAny": true,
    "strictNullChecks": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  }
}
```

### Angular Configuration (angular.json)

Key settings:
- **Output path**: `dist/luftborn-frontend/browser`
- **Optimization**: Enabled for production
- **Budgets**: Enforce bundle size limits
- **Source maps**: Enabled for development only

---

## 🎯 Performance Optimizations

1. **Lazy Loading**
   - Feature modules loaded on demand
   - Reduces initial bundle size

2. **OnPush Change Detection**
   - Components only update when inputs change
   - Better performance for large lists

3. **TrackBy Functions**
   - Efficient list rendering
   - Prevents unnecessary DOM updates

4. **Production Build Optimizations**
   - Tree-shaking removes unused code
   - Minification reduces file size
   - Gzip compression (via Nginx)

---

## 📦 npm Packages Used

### Core
- `@angular/core`, `@angular/common` - Framework
- `@angular/router` - Routing
- `@angular/forms` - Forms (Reactive)
- `rxjs` - Reactive programming

### Development
- `@angular-devkit/build-angular` - Build tools
- `typescript` - Type checking
- `karma`, `jasmine` - Testing

**No other dependencies!** Lightweight and focused.

---

## 🐛 Troubleshooting

### CORS Issues

**Problem**: "Access-Control-Allow-Origin" error

**Solution**: Backend must allow frontend origin
```json
// backend/appsettings.json
{
  "AllowedOrigins": ["http://localhost:4200"]
}
```

### API Connection Issues

**Problem**: Frontend can't reach backend

**Solution**: Check `environment.ts` API URL
```typescript
export const environment = {
  apiUrl: 'http://localhost:5000/api/v1'  // ← Verify this
};
```

### Route Not Found (404)

**Problem**: Refresh on route shows 404

**Solution**: Nginx must redirect all routes to `index.html`
```nginx
location / {
    try_files $uri $uri/ /index.html;  # ← This line is critical
}
```

---

## 📚 Further Reading

- [Angular Documentation](https://angular.dev)
- [RxJS Documentation](https://rxjs.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Angular Style Guide](https://angular.dev/style-guide)

---

**Ready to code?** Start with `src/app/app.routes.ts` to see the routing structure! 🎨