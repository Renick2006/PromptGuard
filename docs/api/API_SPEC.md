# PromptGuard REST API Specification

Version: 1.0

Status: Draft

Last Updated: July 2026

Owner: Renick Rajesh

---

# 1. Introduction

This document defines the REST API for PromptGuard.

The API serves as the communication layer between the frontend, backend, and external integrations.

The specification follows REST principles, uses JSON for data exchange, and is designed to be documented using OpenAPI.

---

# 2. API Design Principles

PromptGuard APIs follow these principles:

- RESTful resource naming
- Stateless communication
- JWT-based authentication
- Consistent error responses
- Pagination for list endpoints
- API versioning
- Predictable HTTP status codes

Base URL:

```
/api/v1
```

---

# 3. Authentication

Protected endpoints require a JWT access token.

Example:

```
Authorization: Bearer <access_token>
```

Authentication flow:

```text
Login
   │
   ▼
Verify Credentials
   │
   ▼
Generate JWT
   │
   ▼
Return Access Token
```

---

# 4. Standard Response Format

## Success Response

```json
{
  "success": true,
  "data": {},
  "message": "Request completed successfully."
}
```

## Error Response

```json
{
  "success": false,
  "error": {
    "code": "PROJECT_NOT_FOUND",
    "message": "The requested project does not exist."
  }
}
```

---

# 5. Authentication Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /auth/register | Register a new user |
| POST | /auth/login | User login |
| POST | /auth/refresh | Refresh JWT |
| POST | /auth/logout | Logout |
| GET | /auth/me | Current user profile |

---

# 6. Organization Endpoints

| Method | Endpoint |
|--------|----------|
| GET | /organizations |
| POST | /organizations |
| GET | /organizations/{id} |
| PATCH | /organizations/{id} |
| DELETE | /organizations/{id} |

---

# 7. Project Endpoints

| Method | Endpoint |
|--------|----------|
| GET | /projects |
| POST | /projects |
| GET | /projects/{id} |
| PATCH | /projects/{id} |
| DELETE | /projects/{id} |

---

# 8. Trace Endpoints

| Method | Endpoint |
|--------|----------|
| GET | /traces |
| GET | /traces/{trace_id} |
| POST | /traces |
| DELETE | /traces/{trace_id} |

Query parameters:

- project_id
- provider
- model
- status
- start_date
- end_date
- page
- limit

---

# 9. Prompt Version Endpoints

| Method | Endpoint |
|--------|----------|
| GET | /prompt-versions |
| POST | /prompt-versions |
| GET | /prompt-versions/{id} |

---

# 10. Dataset Endpoints

| Method | Endpoint |
|--------|----------|
| GET | /datasets |
| POST | /datasets |
| PATCH | /datasets/{id} |
| DELETE | /datasets/{id} |

---

# 11. Replay Endpoints

| Method | Endpoint |
|--------|----------|
| POST | /replays/start |
| GET | /replays |
| GET | /replays/{id} |
| POST | /replays/{id}/cancel |

---

# 12. Evaluation Endpoints

| Method | Endpoint |
|--------|----------|
| GET | /evaluations |
| GET | /evaluations/{id} |

---

# 13. Reports

| Method | Endpoint |
|--------|----------|
| GET | /reports |
| GET | /reports/{id} |

---

# 14. Notifications

| Method | Endpoint |
|--------|----------|
| GET | /notifications |
| PATCH | /notifications/{id}/read |

---

# 15. Pagination

List endpoints support pagination.

Example:

```
GET /projects?page=1&limit=20
```

Response:

```json
{
  "page": 1,
  "limit": 20,
  "total": 143,
  "items": []
}
```

---

# 16. HTTP Status Codes

| Code | Meaning |
|------|---------|
| 200 | OK |
| 201 | Created |
| 204 | No Content |
| 400 | Bad Request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |
| 409 | Conflict |
| 422 | Validation Error |
| 500 | Internal Server Error |

---

# 17. API Versioning

PromptGuard uses URL versioning.

Current version:

```
/api/v1
```

Future breaking changes will be released under `/api/v2`.

---

# 18. Security

- JWT authentication
- HTTPS only
- Rate limiting
- Input validation
- Argon2 password hashing
- API key encryption

---

# 19. Summary

The PromptGuard REST API is designed to be secure, predictable, and easy to consume. Consistent resource naming, standardized responses, and versioning ensure long-term maintainability and compatibility.