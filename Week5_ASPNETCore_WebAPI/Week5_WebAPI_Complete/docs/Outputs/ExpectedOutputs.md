# Expected Outputs & Screenshots Guide

## Hands-On 1 – Values API

### GET /api/Values → 200 OK
```json
["value1", "value2", "value3"]
```

### POST /api/Values → 201 Created
Request: `"hello"`  
Response: `"hello"`

### DELETE /api/Values/0 → 204 No Content

---

## Hands-On 2 – Swagger UI

Screenshot should show:
- Swagger UI at http://localhost:5000/swagger
- Title: "Week5 Web API"
- All controllers expanded: Auth, Emp, Values
- Authorize button (padlock icon) visible

---

## Hands-On 3 – Filters

### CustomAuthFilter – Missing header → 400
```
Authorization header is missing.
```

### CustomExceptionFilter – Exception → 500
```json
{ "error": "An internal server error occurred." }
```
Log entry in `Logs/error.txt`:
```
[2024-01-15 10:30:00] NullReferenceException: Object reference not set...
```

---

## Hands-On 4 – Employee CRUD

### GET /api/Emp → 200
```json
[
  {
    "id": 1, "name": "Alice Johnson", "salary": 75000,
    "permanent": true, "dateOfBirth": "1990-05-15T00:00:00",
    "department": { "id": 1, "name": "Engineering" },
    "skills": [{ "id": 1, "name": "C#" }, { "id": 2, "name": "Azure" }]
  },
  {
    "id": 2, "name": "Bob Smith", "salary": 65000,
    "permanent": false, "dateOfBirth": "1985-08-22T00:00:00",
    "department": { "id": 2, "name": "HR" },
    "skills": [{ "id": 3, "name": "Recruitment" }]
  }
]
```

### GET /api/Emp/0 → 400
```
"Id must be greater than 0."
```

### GET /api/Emp/999 → 400
```
"Employee with Id 999 not found."
```

---

## Hands-On 5 – JWT

### POST /api/Auth/login → 200
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOiJhZG1pbiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJhZG1pbiIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IkFkbWluIiwianRpIjoiYWJjMTIzIiwiZXhwIjoxNzA1MzE0NjAwfQ.signature",
  "expiresIn": "10 minutes"
}
```

### POST /api/Emp (no token) → 401
```json
{
  "type": "https://tools.ietf.org/html/rfc7235#section-3.1",
  "title": "Unauthorized",
  "status": 401
}
```

### POST /api/Emp (POC token, Admin required) → 403
```json
{
  "type": "https://tools.ietf.org/html/rfc7231#section-6.5.3",
  "title": "Forbidden",
  "status": 403
}
```

---

## Hands-On 6 – Kafka

### Producer Output
```
=== Kafka Producer ===
Topic: chat-topic
Type a message and press Enter. Type 'exit' to quit.

Message: Hello from Producer!
  ✓ Delivered to [chat-topic [[0]] @0]
Message: Second message
  ✓ Delivered to [chat-topic [[0]] @1]
```

### Consumer Output
```
=== Kafka Consumer ===
Topic: chat-topic  |  Group: chat-consumer-group
Listening for messages... Press Ctrl+C to stop.

[chat-topic [[0]] @0] Hello from Producer!
[chat-topic [[0]] @1] Second message
```

### Console Chat Output (Alice's terminal)
```
Chat started as 'Alice'. Type messages below (Ctrl+C to exit):

Hello Bob!
  ← [Bob] Hi Alice! How are you?
I'm good, thanks!
```

---

## Screenshots to Capture

1. Swagger UI homepage showing all endpoints
2. Swagger – Authorize dialog with Bearer token
3. Swagger – GET /api/Emp response (200)
4. Swagger – POST /api/Emp without token (401)
5. Swagger – POST /api/Emp with Admin token (201)
6. Postman – Login request and token response
7. Postman – GET /api/Emp with Bearer token
8. Kafka Producer terminal sending messages
9. Kafka Consumer terminal receiving messages
10. ChatConsole – two terminals chatting
11. ChatWindows – GUI form with messages
