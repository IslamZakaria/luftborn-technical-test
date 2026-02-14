# Luftborn Backend - .NET 10 Web API

Clean Architecture implementation with manual JWT authentication and object mapping.

---

## 🏗️ Project Structure

```
src/backend/
├── Luftborn.Domain/              # Domain Layer (Entities, Interfaces)
│   ├── Entities/
│   │   ├── Product.cs           # Product entity
│   │   └── User.cs              # User entity
│   ├── Enums/
│   │   └── ProductCategory.cs   # Product categories
│   └── Common/
│       └── BaseEntity.cs        # Base entity with common properties
│
├── Luftborn.Application/         # Application Layer (Business Logic)
│   ├── DTOs/                    # Data Transfer Objects
│   ├── Interfaces/              # Service interfaces
│   ├── Services/                # Business logic implementations
│   ├── Validators/              # FluentValidation rules
│   └── Mapping/                 # **Manual mappers (no AutoMapper)**
│
├── Luftborn.Infrastructure/      # Infrastructure Layer (Data Access)
│   ├── Data/
│   │   └── ApplicationDbContext.cs  # EF Core DbContext
│   ├── Repositories/            # Generic repository implementation
│   ├── Authentication/
│   │   └── JwtTokenService.cs   # **Manual JWT implementation**
│   └── Migrations/              # EF Core migrations
│
├── Luftborn.Api/                 # API Layer (Presentation)
│   ├── Controllers/             # API endpoints
│   ├── Middleware/              # Custom middleware
│   ├── Program.cs               # Application entry point
│   └── appsettings.json         # Configuration
│
└── Luftborn.Tests/               # Tests
    ├── Unit/                    # Unit tests
    └── Integration/             # Integration tests (Testcontainers)
```

---

## 🚀 Quick Start

### Prerequisites
- .NET 10 SDK
- PostgreSQL 16 (or use Docker)

### Run with Docker Compose (Recommended)

```bash
# From project root
docker compose up --build
```

### Run Locally (Without Docker)

1. **Start PostgreSQL**
```bash
# Using Docker
docker run -d \
  --name postgres \
  -e POSTGRES_DB=luftborn_db \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=postgres \
  -p 5432:5432 \
  postgres:16-alpine
```

2. **Update Connection String**

Edit `Luftborn.Api/appsettings.Development.json`:
```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Host=localhost;Port=5432;Database=luftborn_db;Username=postgres;Password=postgres"
  }
}
```

3. **Restore Dependencies**
```bash
dotnet restore
```

4. **Apply Database Migrations**
```bash
cd Luftborn.Infrastructure
dotnet ef database update --startup-project ../Luftborn.Api
```

5. **Run the API**
```bash
cd ../Luftborn.Api
dotnet run
```

API will be available at:
- **HTTP**: http://localhost:5000
- **Swagger**: http://localhost:5000/swagger

---

## 🧪 Running Tests

### All Tests
```bash
cd Luftborn.Tests
dotnet test
```

### Unit Tests Only
```bash
dotnet test --filter Category=Unit
```

### Integration Tests Only
```bash
dotnet test --filter Category=Integration
```

### With Coverage
```bash
dotnet test /p:CollectCoverage=true /p:CoverletOutputFormat=lcov
```

---

## 🗄️ Database Migrations

### Create New Migration
```bash
cd Luftborn.Infrastructure
dotnet ef migrations add YourMigrationName --startup-project ../Luftborn.Api
```

### Apply Migrations
```bash
dotnet ef database update --startup-project ../Luftborn.Api
```

### Remove Last Migration
```bash
dotnet ef migrations remove --startup-project ../Luftborn.Api
```

### Generate SQL Script
```bash
dotnet ef migrations script --startup-project ../Luftborn.Api -o migration.sql
```

---

## 🔧 Configuration

### appsettings.json Structure

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Host=localhost;Database=luftborn_db;..."
  },
  "JwtSettings": {
    "Secret": "your-super-secret-key-min-32-chars",
    "Issuer": "luftborn-api",
    "Audience": "luftborn-client",
    "ExpirationMinutes": 60,
    "RefreshTokenExpirationDays": 7
  },
  "RateLimiting": {
    "PermitLimit": 100,
    "WindowSeconds": 60
  },
  "Serilog": {
    "MinimumLevel": {
      "Default": "Information",
      "Override": {
        "Microsoft": "Warning",
        "System": "Warning"
      }
    }
  }
}
```

---

## 🏛️ Clean Architecture Layers

### 1. Domain Layer (Core)
**Purpose**: Business entities and core interfaces  
**Dependencies**: None (pure C#)

**Key Files**:
- `Product.cs` - Product entity with business rules
- `User.cs` - User entity for authentication
- `IRepository<T>` - Generic repository interface
- `IUnitOfWork` - Transaction management

### 2. Application Layer (Business Logic)
**Purpose**: Use cases, DTOs, validation, services  
**Dependencies**: Domain only

**Key Files**:
- `ProductService.cs` - Product business logic
- `AuthenticationService.cs` - Auth business logic
- `ProductMapper.cs` - **Manual object mapping**
- `CreateProductValidator.cs` - FluentValidation rules

### 3. Infrastructure Layer (Data Access)
**Purpose**: Database, external services, JWT  
**Dependencies**: Domain, Application

**Key Files**:
- `ApplicationDbContext.cs` - EF Core DbContext
- `Repository<T>.cs` - Generic repository implementation
- `JwtTokenService.cs` - **Manual JWT implementation**

### 4. API Layer (Presentation)
**Purpose**: Controllers, middleware, HTTP concerns  
**Dependencies**: All layers

**Key Files**:
- `ProductsController.cs` - Product endpoints
- `AuthController.cs` - Authentication endpoints
- `GlobalExceptionMiddleware.cs` - Error handling
- `Program.cs` - DI configuration

---

## 🔐 Manual JWT Implementation

**Location**: `Luftborn.Infrastructure/Authentication/JwtTokenService.cs`

### Why Manual?

Instead of using ASP.NET Core Identity, we implemented JWT from scratch to:
- ✅ Demonstrate deep understanding of JWT
- ✅ Avoid over-engineering for simple use case
- ✅ Have full control over token generation
- ✅ Meet "write your own code" requirement

### How It Works

1. **User logs in** → `AuthenticationService` validates credentials
2. **Generate JWT** → `JwtTokenService.GenerateAccessToken(user)`
3. **Create claims** → User ID, email, roles
4. **Sign token** → Using `JwtSettings.Secret`
5. **Return token** → Client stores in localStorage/cookie
6. **Validate on request** → JWT middleware decodes & validates

### Key Methods

```csharp
// Generate access token (60 min expiration)
string GenerateAccessToken(User user);

// Generate refresh token (7 days expiration)
string GenerateRefreshToken();

// Validate token signature and expiration
ClaimsPrincipal ValidateToken(string token);

// Extract claims from valid token
int GetUserIdFromToken(string token);
```

---

## 🗺️ Manual Object Mapping

**Location**: `Luftborn.Application/Mapping/`

### Why Manual Mapping?

Instead of using AutoMapper:
- ✅ Explicit, readable transformations
- ✅ No "magic" configuration
- ✅ Better performance (no reflection overhead)
- ✅ Type-safe at compile time
- ✅ Easier to debug

### Example: ProductMapper.cs

```csharp
public static class ProductMapper
{
    // Entity → DTO
    public static ProductDto ToDto(Product product)
    {
        return new ProductDto
        {
            Id = product.Id,
            Name = product.Name,
            Description = product.Description,
            SKU = product.SKU,
            Price = product.Price,
            StockQuantity = product.StockQuantity,
            Category = product.Category,
            ImageUrl = product.ImageUrl,
            IsActive = product.IsActive,
            CreatedAt = product.CreatedAt,
            UpdatedAt = product.UpdatedAt
        };
    }

    // CreateDto → Entity
    public static Product ToEntity(CreateProductDto dto)
    {
        return new Product
        {
            Name = dto.Name,
            Description = dto.Description,
            SKU = dto.SKU,
            Price = dto.Price,
            StockQuantity = dto.StockQuantity,
            Category = dto.Category,
            ImageUrl = dto.ImageUrl,
            IsActive = dto.IsActive
        };
    }

    // Update existing entity from UpdateDto
    public static void UpdateEntity(Product product, UpdateProductDto dto)
    {
        product.Name = dto.Name;
        product.Description = dto.Description;
        product.Price = dto.Price;
        product.StockQuantity = dto.StockQuantity;
        product.Category = dto.Category;
        product.ImageUrl = dto.ImageUrl;
        product.IsActive = dto.IsActive;
    }
}
```

---

## 📋 API Endpoints

### Authentication

```
POST   /api/v1/auth/register     - Register new user
POST   /api/v1/auth/login        - Login and get JWT
POST   /api/v1/auth/refresh      - Refresh access token
```

### Products

```
GET    /api/v1/products          - Get paginated products (public)
GET    /api/v1/products/{id}     - Get product by ID (public)
GET    /api/v1/products/search   - Search products (public)
POST   /api/v1/products          - Create product (auth required)
PUT    /api/v1/products/{id}     - Update product (auth required)
DELETE /api/v1/products/{id}     - Delete product (auth required)
```

### Health

```
GET    /health                   - Health check endpoint
```

---

## 🛡️ Security Features

1. **JWT Authentication**
   - Bearer token validation
   - Claims-based authorization
   - Refresh token support

2. **Password Security**
   - BCrypt hashing (cost factor: 11)
   - Salt generation
   - No plain-text storage

3. **Rate Limiting**
   - 100 requests per minute per IP
   - Prevents brute-force attacks

4. **Input Validation**
   - FluentValidation rules
   - Model state validation
   - Business rule enforcement

5. **SQL Injection Prevention**
   - EF Core parameterized queries
   - LINQ query composition

6. **CORS Protection**
   - Whitelist allowed origins
   - Credentials support

---

## 📦 NuGet Packages Used

### Core
- `Microsoft.AspNetCore.App` - Web framework
- `Microsoft.EntityFrameworkCore` - ORM
- `Npgsql.EntityFrameworkCore.PostgreSQL` - PostgreSQL provider

### Validation & Logging
- `FluentValidation.AspNetCore` - Input validation
- `Serilog.AspNetCore` - Structured logging
- `Serilog.Sinks.Console` - Console output
- `Serilog.Sinks.File` - File output

### Authentication
- `BCrypt.Net-Next` - Password hashing
- `System.IdentityModel.Tokens.Jwt` - JWT handling
- `Microsoft.AspNetCore.Authentication.JwtBearer` - JWT middleware

### API Documentation
- `Swashbuckle.AspNetCore` - Swagger/OpenAPI

### Testing
- `xUnit` - Test framework
- `FluentAssertions` - Assertion library
- `Moq` - Mocking framework
- `Testcontainers` - Docker-based integration tests

---

## 🐛 Troubleshooting

### Connection String Issues

**Problem**: "Unable to connect to database"

**Solution**:
```bash
# Check PostgreSQL is running
docker ps | grep postgres

# Test connection
psql -h localhost -U postgres -d luftborn_db
```

### Migration Issues

**Problem**: "No migrations found"

**Solution**:
```bash
# Rebuild and apply migrations
dotnet clean
dotnet build
dotnet ef database update --startup-project ../Luftborn.Api
```

### JWT Validation Fails

**Problem**: "Unauthorized" on protected endpoints

**Check**:
1. Token is being sent: `Authorization: Bearer <token>`
2. Token is not expired
3. JWT secret matches in appsettings.json
4. Token was generated by the same server

---

## 🔍 Code Quality Standards

### Naming Conventions
- **Classes/Interfaces**: PascalCase (`ProductService`, `IRepository`)
- **Methods**: PascalCase (`GetProductById`, `CreateProduct`)
- **Variables**: camelCase (`productDto`, `userId`)
- **Private fields**: _camelCase (`_dbContext`, `_logger`)

### SOLID Principles
- ✅ **S**ingle Responsibility - Each class has one purpose
- ✅ **O**pen/Closed - Open for extension, closed for modification
- ✅ **L**iskov Substitution - Derived classes are substitutable
- ✅ **I**nterface Segregation - Small, focused interfaces
- ✅ **D**ependency Inversion - Depend on abstractions, not concretions

---

## 📚 Further Reading

- [Clean Architecture by Robert C. Martin](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
- [Entity Framework Core Documentation](https://docs.microsoft.com/en-us/ef/core/)
- [JWT Best Practices](https://tools.ietf.org/html/rfc8725)
- [FluentValidation Documentation](https://fluentvalidation.net/)

---

**Ready to code?** Start with `Luftborn.Api/Program.cs` to see how it all comes together! 🚀