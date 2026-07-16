# API Documentation

Base URL: `http://localhost:5000`

---

## Auth Controller

### POST /api/Auth/login

Generates a JWT token valid for 10 minutes.

**Request Body**
```json
{
  "username": "admin",
  "password": "Admin@123"
}
```

**Response 200**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "expiresIn": "10 minutes"
}
```

**Response 401**
```json
"Invalid username or password."
```

---

## Values Controller

Base route: `api/Values`

### GET /api/Values
Returns all string values.

**Response 200**
```json
["value1", "value2", "value3"]
```

### GET /api/Values/{id}
Returns value at index.

**Response 200** `"value1"`  
**Response 404** `"No value at index 5."`

### POST /api/Values
Adds a new value.

**Request Body** `"newValue"`

**Response 201**
```json
"newValue"
```

### PUT /api/Values/{id}
Updates value at index.

**Request Body** `"updatedValue"`

**Response 200** `"updatedValue"`  
**Response 400** `"Index 99 is out of range."`

### DELETE /api/Values/{id}
Removes value at index.

**Response 204** *(No Content)*  
**Response 400** `"Index 99 is out of range."`

---

## Employee Controller

Base route: `api/Emp`  
Most endpoints require `Authorization: Bearer <token>` header.

### GET /api/Emp *(Public)*
Returns all employees.

**Response 200**
```json
[
  {
    "id": 1,
    "name": "Alice Johnson",
    "salary": 75000,
    "permanent": true,
    "dateOfBirth": "1990-05-15T00:00:00",
    "department": { "id": 1, "name": "Engineering" },
    "skills": [
      { "id": 1, "name": "C#" },
      { "id": 2, "name": "Azure" }
    ]
  }
]
```

### GET /api/Emp/{id} *(Public)*
Returns employee by ID.

**Response 200** – Employee object  
**Response 400** `"Employee with Id 99 not found."`

### POST /api/Emp *(Admin role required)*
Creates a new employee.

**Request Body**
```json
{
  "id": 3,
  "name": "Carol White",
  "salary": 80000,
  "permanent": true,
  "dateOfBirth": "1992-03-10T00:00:00",
  "department": { "id": 1, "name": "Engineering" },
  "skills": [
    { "id": 4, "name": "React" }
  ]
}
```

**Response 201** – Created employee  
**Response 400** – Validation error

### PUT /api/Emp/{id} *(Admin role required)*
Updates an existing employee.

**Request Body** – Same as POST  
**Response 200** – Updated employee  
**Response 400** – Not found or invalid ID

### DELETE /api/Emp/{id} *(Admin role required)*
Deletes an employee.

**Response 204** *(No Content)*  
**Response 400** – Not found or invalid ID

---

## HTTP Status Codes Reference

| Code | Meaning | When Used |
|---|---|---|
| 200 | OK | Successful GET / PUT |
| 201 | Created | Successful POST |
| 204 | No Content | Successful DELETE |
| 400 | Bad Request | Validation failure / not found |
| 401 | Unauthorized | Missing or invalid JWT |
| 403 | Forbidden | Valid JWT but insufficient role |
| 500 | Internal Server Error | Unhandled exception |

---

## REST Architecture Notes

- **REST** (Representational State Transfer) is a stateless, client-server architectural style.
- **RESTful services** use HTTP verbs to perform CRUD operations on resources.
- **Microservices** decompose an application into small, independently deployable services.
- **Dependency Injection** (DI) is built into ASP.NET Core via `IServiceCollection`.
- **appsettings.json** stores environment-specific configuration (connection strings, JWT keys).
- **launchSettings.json** configures how the app starts in development (ports, env vars).
- **Program.cs** is the single entry point using .NET 8 minimal hosting model.
