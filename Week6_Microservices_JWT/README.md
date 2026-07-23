# JWT Authentication — ASP.NET Core 8 Web API
### Cognizant Digital Nurture · Week 6 · Microservices Architecture

---

## Project Overview

This project demonstrates **JWT (JSON Web Token) Authentication** and **Role-based Authorization**
in an ASP.NET Core 8 Web API following clean architecture principles.

---

## Folder Structure

```
JwtAuthApi.sln
└── JwtAuthApi/
    ├── Configuration/
    │   └── JwtSettings.cs          # Strongly-typed config bound to appsettings.json
    ├── Controllers/
    │   ├── AuthController.cs       # Login + token introspection endpoints
    │   ├── ProductController.cs    # Public + protected product endpoints
    │   └── UserController.cs       # Admin-only user listing
    ├── DTOs/
    │   ├── ApiResponse.cs          # Generic response envelope
    │   ├── LoginRequest.cs         # Login request body
    │   └── LoginResponse.cs        # Login success response
    ├── Helpers/
    │   └── PasswordHelper.cs       # Password utility (swap with BCrypt in production)
    ├── Interfaces/
    │   ├── IJwtService.cs          # JWT contract
    │   └── IUserService.cs         # User service contract
    ├── Models/
    │   ├── Product.cs              # Product domain model
    │   └── User.cs                 # User domain model
    ├── Properties/
    │   └── launchSettings.json     # Dev server configuration
    ├── Services/
    │   ├── JwtService.cs           # JWT generation & validation
    │   └── UserService.cs          # In-memory user store
    ├── Program.cs                  # App entry point, DI, middleware pipeline
    ├── appsettings.json            # JWT config, logging
    └── appsettings.Development.json
```

---

## NuGet Packages

| Package | Version | Purpose |
|---|---|---|
| `Microsoft.AspNetCore.Authentication.JwtBearer` | 8.0.0 | JWT middleware |
| `Swashbuckle.AspNetCore` | 6.5.0 | Swagger / OpenAPI UI |
| `System.IdentityModel.Tokens.Jwt` | 8.0.2 | JWT token creation |

---

## Setup & Run

### 1. Restore packages
```bash
cd JwtAuthApi
dotnet restore
```

### 2. Build
```bash
dotnet build
```

### 3. Run
```bash
dotnet run
```

The API starts at:
- HTTP  → `http://localhost:5000`
- HTTPS → `https://localhost:5001`
- Swagger UI → `http://localhost:5000/swagger`

---

## API Endpoints

| Method | Route | Auth | Role |
|---|---|---|---|
| POST | `/api/auth/login` | ❌ Public | — |
| GET | `/api/auth/me` | ✅ JWT | Any |
| GET | `/api/products` | ❌ Public | — |
| GET | `/api/products/{id}` | ✅ JWT | Any |
| POST | `/api/products` | ✅ JWT | Admin |
| DELETE | `/api/products/{id}` | ✅ JWT | Admin |
| GET | `/api/users` | ✅ JWT | Admin |

---

## Demo Credentials

| Username | Password | Role |
|---|---|---|
| `admin` | `Admin@123` | Admin |
| `john` | `User@123` | User |

---

## Postman Requests

### 1. Login as Admin — get JWT token
```
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "username": "admin",
  "password": "Admin@123"
}
```

**Expected Response (200 OK):**
```json
{
  "success": true,
  "message": "Login successful.",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "username": "admin",
    "email": "admin@jwtdemo.com",
    "role": "Admin",
    "expiresAt": "2024-01-01T11:00:00Z"
  }
}
```

---

### 2. Login as User
```
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "username": "john",
  "password": "User@123"
}
```

---

### 3. Access protected endpoint (any authenticated user)
```
GET http://localhost:5000/api/products/1
Authorization: Bearer <paste token here>
```

**Expected Response (200 OK):**
```json
{
  "success": true,
  "message": "Success",
  "data": {
    "id": 1,
    "name": "Laptop",
    "description": "High-performance laptop",
    "price": 75000,
    "category": "Electronics"
  }
}
```

---

### 4. Access Admin-only endpoint (create product)
```
POST http://localhost:5000/api/products
Authorization: Bearer <admin token>
Content-Type: application/json

{
  "name": "Tablet",
  "description": "10-inch Android tablet",
  "price": 25000,
  "category": "Electronics"
}
```

**Expected Response (201 Created):**
```json
{
  "success": true,
  "message": "Product created successfully.",
  "data": {
    "id": 4,
    "name": "Tablet",
    "description": "10-inch Android tablet",
    "price": 25000,
    "category": "Electronics"
  }
}
```

---

### 5. Access Admin endpoint with User token (forbidden)
```
POST http://localhost:5000/api/products
Authorization: Bearer <john's user token>
```

**Expected Response (403 Forbidden):**
```json
{
  "success": false,
  "message": "Forbidden. You do not have permission to access this resource."
}
```

---

### 6. Access protected endpoint without token (unauthorized)
```
GET http://localhost:5000/api/products/1
```

**Expected Response (401 Unauthorized):**
```json
{
  "success": false,
  "message": "Unauthorized. Please provide a valid JWT token."
}
```

---

### 7. Get token claims (introspection)
```
GET http://localhost:5000/api/auth/me
Authorization: Bearer <any valid token>
```

---

### 8. Get all users (Admin only)
```
GET http://localhost:5000/api/users
Authorization: Bearer <admin token>
```

---

## JWT Flow Diagram

```
Client                          API Server
  │                                │
  │── POST /api/auth/login ────────▶│
  │   { username, password }        │  Validate credentials
  │                                 │  Generate JWT (HMAC-SHA256)
  │◀── 200 OK { token } ───────────│
  │                                 │
  │── GET /api/products/1 ─────────▶│
  │   Authorization: Bearer <token> │  Validate JWT signature
  │                                 │  Check expiry & claims
  │◀── 200 OK { product } ─────────│
```

---

## Security Notes

1. **Secret Key** — The key in `appsettings.json` is for demo only. In production, store it in AWS Secrets Manager or Azure Key Vault.
2. **Password Storage** — Passwords are plain-text for demo. Replace `PasswordHelper` with BCrypt or ASP.NET Core Identity.
3. **HTTPS** — Always enforce HTTPS in production (`UseHttpsRedirection` is already configured).
4. **Token Expiry** — Default is 60 minutes. Adjust `ExpirationMinutes` in `appsettings.json`.
5. **ClockSkew = Zero** — Tokens expire exactly at their `exp` claim with no tolerance window.

---

*Cognizant Digital Nurture · Week 6 · Microservices Architecture using ASP.NET Core Web API*
