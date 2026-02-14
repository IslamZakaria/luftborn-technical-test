# Luftborn .NET Code Test

Full-stack product management system built with **.NET 10**, **Angular 19**, and **PostgreSQL**.

![.NET](https://img.shields.io/badge/.NET-10.0-512BD4?logo=dotnet)
![Angular](https://img.shields.io/badge/Angular-19-DD0031?logo=angular)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-336791?logo=postgresql)
![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?logo=docker)

---

## 🚀 Quick Start

### Prerequisites
- Docker Desktop
- Docker Compose

### Run Everything (One Command)

```bash
# Clone repository
git clone <your-repo-url>
cd luftborn-technical-test

# Start all services
docker compose up --build
```

**Access Points:**
- **Frontend**: http://localhost:4200
- **Backend API**: http://localhost:5000
- **Swagger Docs**: http://localhost:5000/swagger
- **Health Check**: http://localhost:5000/health

---

## 📂 Project Structure

```
luftborn-dotnet-test/
├── README.md                    # ← You are here
├── docker-compose.yml           # Orchestrates all services
├── .env.example                 # Environment variables template
│
└── src/
    ├── backend/                 # .NET 10 Web API
    │   ├── README.md           # Backend documentation
    │   ├── Dockerfile          # Backend container
    │   └── Luftborn.sln        # Visual Studio solution
    │
    └── frontend/                # Angular 19 SPA
        ├── README.md           # Frontend documentation
        ├── Dockerfile          # Frontend container
        └── package.json        # npm dependencies
```

---

## ✨ Features Implemented

### Backend (.NET 10)
- ✅ **Clean Architecture** (Domain, Application, Infrastructure, API)
- ✅ **Product CRUD** - Create, Read, Update, Delete operations
- ✅ **JWT Authentication** - Manual implementation (no Identity framework)
- ✅ **Manual Object Mapping** - Custom mappers (no AutoMapper)
- ✅ **PostgreSQL + EF Core** - Code-first migrations
- ✅ **FluentValidation** - Input validation
- ✅ **Rate Limiting** - 100 requests/minute per IP
- ✅ **Structured Logging** - Serilog with correlation IDs
- ✅ **Unit & Integration Tests** - xUnit + Testcontainers

### Frontend (Angular 19)
- ✅ **Standalone Components** - Modern Angular architecture
- ✅ **TypeScript Strict Mode** - Type safety
- ✅ **Lazy Loading Routes** - Performance optimization
- ✅ **HTTP Interceptors** - Auth token injection, error handling
- ✅ **Route Guards** - Protected routes
- ✅ **Luftborn Design System** - SCSS with brand colors
- ✅ **Responsive UI** - Works on all devices

---

## 🧪 Testing the Application

### 1. Register a New User

```bash
curl -X POST http://localhost:5000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@luftborn.com",
    "password": "Test@1234",
    "firstName": "John",
    "lastName": "Doe"
  }'
```

### 2. Login and Get JWT Token

```bash
curl -X POST http://localhost:5000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@luftborn.com",
    "password": "Test@1234"
  }'
```

Copy the `accessToken` from response.

### 3. Create a Product (Authenticated)

```bash
curl -X POST http://localhost:5000/api/v1/products \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "name": "Wireless Mouse",
    "description": "Ergonomic wireless mouse",
    "sku": "WM-001",
    "price": 29.99,
    "stockQuantity": 100,
    "category": 1,
    "isActive": true
  }'
```

### 4. Get All Products (Public)

```bash
curl http://localhost:5000/api/v1/products?pageNumber=1&pageSize=10
```

---

## 📖 API Documentation

Full interactive API documentation available at:
**http://localhost:5000/swagger** (when running)

### Key Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/v1/auth/register` | Register new user | No |
| POST | `/api/v1/auth/login` | Login and get JWT | No |
| GET | `/api/v1/products` | List products (paginated) | No |
| GET | `/api/v1/products/{id}` | Get product by ID | No |
| POST | `/api/v1/products` | Create product | **Yes** |
| PUT | `/api/v1/products/{id}` | Update product | **Yes** |
| DELETE | `/api/v1/products/{id}` | Delete product | **Yes** |

---

## 🛠️ Development Setup (Without Docker)

### Backend

```bash
cd src/backend

# Restore dependencies
dotnet restore

# Update database
dotnet ef database update --project Luftborn.Infrastructure --startup-project Luftborn.Api

# Run API
cd Luftborn.Api
dotnet run

# Run tests
cd ../Luftborn.Tests
dotnet test
```

**See `src/backend/README.md` for detailed backend documentation.**

### Frontend

```bash
cd src/frontend

# Install dependencies
npm install

# Start dev server
npm start

# Build for production
npm run build
```

**See `src/frontend/README.md` for detailed frontend documentation.**

---

## 🏗️ Architecture Overview

```
┌─────────────────────────────────────────────────────┐
│              Docker Compose Network                  │
│  ┌──────────────┐  ┌──────────────┐  ┌───────────┐ │
│  │   Angular    │  │   .NET API   │  │ PostgreSQL│ │
│  │   (Nginx)    │  │   (Kestrel)  │  │           │ │
│  │  Port: 4200  │  │  Port: 5000  │  │ Port: 5432│ │
│  └──────────────┘  └──────────────┘  └───────────┘ │
└─────────────────────────────────────────────────────┘
```

**Backend Architecture (Clean Architecture):**
```
API Layer (Controllers, Middleware)
    ↓
Application Layer (Services, DTOs, Validators)
    ↓
Domain Layer (Entities, Interfaces)
    ↓
Infrastructure Layer (EF Core, Repositories, JWT)
```

---

## 🔐 Security Features

- ✅ **JWT Authentication** - Manual implementation
- ✅ **Password Hashing** - BCrypt
- ✅ **Rate Limiting** - 100 req/min per IP
- ✅ **CORS Protection** - Whitelist configuration
- ✅ **Input Validation** - FluentValidation
- ✅ **SQL Injection Prevention** - EF Core parameterized queries

---

## 🔧 Configuration

### Environment Variables

Copy `.env.example` to `.env` and customize:

```env
# Database
DATABASE_HOST=postgres
DATABASE_PORT=5432
DATABASE_NAME=luftborn_db
DATABASE_USER=postgres
DATABASE_PASSWORD=postgres

# JWT
JWT_SECRET=your-super-secret-key-here-min-32-characters
JWT_ISSUER=luftborn-api
JWT_AUDIENCE=luftborn-client
```

---

## 🐛 Troubleshooting

### Database Connection Failed
```bash
# Check PostgreSQL is running
docker ps | grep postgres

# View logs
docker compose logs postgres
```

### Frontend Can't Reach API
```bash
# Verify backend is running
curl http://localhost:5000/health

# Check CORS in backend appsettings.json
```

### Reset Everything
```bash
# Stop and remove all containers + volumes
docker compose down -v

# Rebuild from scratch
docker compose up --build
```

---

## 📦 Technology Stack

| Component | Technology | Version |
|-----------|-----------|---------|
| Backend Framework | ASP.NET Core | 10.0 |
| Frontend Framework | Angular | 19 |
| Database | PostgreSQL | 16 |
| ORM | Entity Framework Core | 10.0 |
| Validation | FluentValidation | Latest |
| Logging | Serilog | Latest |
| Testing | xUnit + Testcontainers | Latest |
| Containerization | Docker | Latest |

---

## 📝 Requirements Met

✅ ASP.NET Core application  
✅ Basic CRUD operations  
✅ SSO-ready architecture (JWT + extension points)  
✅ C# implementation  
✅ JavaScript/TypeScript (Angular)  
✅ CSS/SCSS styling  
✅ Clean Architecture  
✅ Manual implementations (no AutoMapper, custom JWT)  
✅ Single Responsibility Principle  
✅ Self-documenting code  
✅ Minimal comments  
✅ Docker deployment  

---

## 👤 Author

**Islam**  
Submission for Luftborn Technical Assessment  
**Date**: February 15, 2026

---

## 📧 Contact

**Luftborn Contact**: Khaled Tarek Youssef (kta@luftborn.com)

---

## 📄 License

This project is created as a technical assessment for Luftborn.

---

**Ready to run? Execute:** `docker compose up --build` 🚀