# Week5_WebAPI_Complete

Complete ASP.NET Core 8.0 Web API solution covering all 6 Hands-On exercises.

## Projects

| Project | Type | Description |
|---|---|---|
| `Week5_WebAPI` | ASP.NET Core 8 Web API | Main API – all 6 hands-ons |
| `KafkaProducer` | Console App | Standalone Kafka message producer |
| `KafkaConsumer` | Console App | Standalone Kafka message consumer |
| `ChatConsole` | Console App | Bidirectional console chat via Kafka |
| `ChatWindows` | WinForms App | GUI chat application via Kafka |

## Quick Start

```bash
# 1. Restore packages
dotnet restore Week5_WebAPI_Complete.sln

# 2. Run the Web API
cd Week5_WebAPI
dotnet run

# 3. Open Swagger UI
# http://localhost:5000/swagger
```

## Hands-On Coverage

| # | Topic | Endpoint |
|---|---|---|
| 1 | REST basics, CRUD, HTTP codes | `api/Values` |
| 2 | Swagger, custom route | `api/Emp` |
| 3 | Models, Filters, Validation | `api/Emp` |
| 4 | Full CRUD with in-memory store | `api/Emp` |
| 5 | JWT Authentication | `api/Auth/login` |
| 6 | Kafka Producer/Consumer/Chat | Kafka projects |

## Default Credentials (Hands-On 5)

| Username | Password | Role |
|---|---|---|
| admin | Admin@123 | Admin |
| poc | Poc@123 | POC |

## JWT Config

```json
{
  "Issuer":   "mySystem",
  "Audience": "myUsers",
  "Expiry":   "10 minutes"
}
```

See `docs/` for full API documentation, setup guide, and Postman collection.
