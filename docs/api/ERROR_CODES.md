# PromptGuard API Error Codes

Version: 1.0

Status: Draft

Last Updated: July 2026

Owner: Renick Rajesh

---

# 1. Introduction

This document defines the standardized error codes returned by the PromptGuard REST API.

Every error response follows a consistent structure to simplify client-side handling and debugging.

---

# 2. Error Response Format

```json
{
  "success": false,
  "error": {
    "code": "PROJECT_NOT_FOUND",
    "message": "The requested project could not be found.",
    "details": null
  }
}
```

---

# 3. Authentication Errors

| Code | HTTP Status | Description |
|------|-------------|-------------|
| INVALID_CREDENTIALS | 401 | Incorrect email or password |
| TOKEN_EXPIRED | 401 | JWT token expired |
| INVALID_TOKEN | 401 | Invalid JWT token |
| UNAUTHORIZED | 401 | Authentication required |
| FORBIDDEN | 403 | User lacks permission |

---

# 4. User Errors

| Code | HTTP Status | Description |
|------|-------------|-------------|
| USER_NOT_FOUND | 404 | User does not exist |
| EMAIL_ALREADY_EXISTS | 409 | Email already registered |
| INVALID_PASSWORD | 400 | Password validation failed |

---

# 5. Organization Errors

| Code | HTTP Status | Description |
|------|-------------|-------------|
| ORGANIZATION_NOT_FOUND | 404 | Organization not found |
| ORGANIZATION_ALREADY_EXISTS | 409 | Duplicate organization |

---

# 6. Project Errors

| Code | HTTP Status | Description |
|------|-------------|-------------|
| PROJECT_NOT_FOUND | 404 | Project does not exist |
| PROJECT_ALREADY_EXISTS | 409 | Duplicate project |
| INVALID_PROJECT | 400 | Invalid project configuration |

---

# 7. Dataset Errors

| Code | HTTP Status | Description |
|------|-------------|-------------|
| DATASET_NOT_FOUND | 404 | Dataset not found |
| INVALID_DATASET | 400 | Dataset validation failed |
| DATASET_VERSION_EXISTS | 409 | Dataset version already exists |

---

# 8. Replay Errors

| Code | HTTP Status | Description |
|------|-------------|-------------|
| REPLAY_NOT_FOUND | 404 | Replay run not found |
| REPLAY_ALREADY_RUNNING | 409 | Replay already in progress |
| REPLAY_FAILED | 500 | Replay execution failed |

---

# 9. Trace Errors

| Code | HTTP Status | Description |
|------|-------------|-------------|
| TRACE_NOT_FOUND | 404 | Trace not found |
| TRACE_CREATION_FAILED | 500 | Failed to create trace |

---

# 10. Evaluation Errors

| Code | HTTP Status | Description |
|------|-------------|-------------|
| EVALUATION_NOT_FOUND | 404 | Evaluation not found |
| EVALUATION_FAILED | 500 | Evaluation execution failed |

---

# 11. API Key Errors

| Code | HTTP Status | Description |
|------|-------------|-------------|
| API_KEY_NOT_FOUND | 404 | API key not found |
| INVALID_API_KEY | 401 | API key invalid |
| PROVIDER_UNAVAILABLE | 503 | LLM provider unavailable |

---

# 12. Validation Errors

| Code | HTTP Status | Description |
|------|-------------|-------------|
| VALIDATION_ERROR | 422 | Request validation failed |
| INVALID_INPUT | 400 | Invalid request payload |
| MISSING_REQUIRED_FIELD | 400 | Required field missing |

---

# 13. Rate Limiting

| Code | HTTP Status | Description |
|------|-------------|-------------|
| RATE_LIMIT_EXCEEDED | 429 | Too many requests |

---

# 14. Server Errors

| Code | HTTP Status | Description |
|------|-------------|-------------|
| INTERNAL_SERVER_ERROR | 500 | Unexpected server error |
| DATABASE_ERROR | 500 | Database operation failed |
| SERVICE_UNAVAILABLE | 503 | Service temporarily unavailable |

---

# 15. Error Handling Guidelines

- Always return a structured error response.
- Never expose internal implementation details.
- Log all server-side errors with trace IDs.
- Include request identifiers for debugging.
- Use appropriate HTTP status codes.

---

# 16. Summary

PromptGuard uses standardized error codes to provide predictable API behavior, simplify debugging, and improve client-side error handling.