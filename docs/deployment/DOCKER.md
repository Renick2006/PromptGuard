# PromptGuard Docker Strategy

Version: 1.0

Status: Draft

Last Updated: July 2026

Owner: Renick Rajesh

---

# 1. Introduction

This document defines the Docker strategy for PromptGuard.

Docker provides a consistent development, testing, and deployment environment across all stages of the application lifecycle.

---

# 2. Objectives

The Docker setup should:

- Ensure environment consistency
- Simplify onboarding
- Support local development
- Enable production deployments
- Isolate services
- Simplify dependency management

---

# 3. Container Architecture

PromptGuard is composed of multiple containers.

```text
                 Docker Network
                       │
 ┌──────────────────────────────────────────┐
 │                                          │
 ▼                                          ▼
Frontend (React)                  Backend (FastAPI)
                                           │
              ┌────────────────────────────┼──────────────────────────┐
              ▼                            ▼                          ▼
        MongoDB                      Redis                     Celery Worker
```

---

# 4. Containers

## Frontend

Responsibilities:

- React application
- Static asset serving
- API communication

---

## Backend

Responsibilities:

- REST API
- Authentication
- AI Gateway
- Replay Engine
- Evaluation Engine

---

## MongoDB

Responsibilities:

- Persistent data storage

Volumes:

- Database files

---

## Redis

Responsibilities:

- Cache
- Celery broker
- Rate limiting

---

## Celery Worker

Responsibilities:

- Replay execution
- Evaluations
- Notifications
- Report generation

---

# 5. Docker Compose

Development uses Docker Compose to orchestrate services.

Core services include:

- frontend
- backend
- mongodb
- redis
- worker

Future additions:

- prometheus
- grafana
- nginx

---

# 6. Networking

All containers communicate over a private Docker network.

Only the frontend and backend expose ports to the host.

---

# 7. Volumes

Persistent volumes:

| Service | Purpose |
|----------|---------|
| MongoDB | Database storage |
| Redis (optional) | Cache persistence |
| Backend | Development hot reload |

---

# 8. Environment Variables

Environment variables are injected using `.env` files.

Examples:

- DATABASE_URL
- REDIS_URL
- JWT_SECRET
- OPENAI_API_KEY
- ANTHROPIC_API_KEY

Sensitive values must never be committed to source control.

---

# 9. Image Strategy

Images should be:

- Small
- Reproducible
- Versioned
- Based on official base images

Recommended:

- python:3.12-slim
- node:22-alpine

---

# 10. Build Process

Docker build process:

```text
Source Code
      │
      ▼
Docker Build
      │
      ▼
Docker Image
      │
      ▼
Docker Compose
      │
      ▼
Running Containers
```

---

# 11. Health Checks

Containers should expose health checks.

Examples:

- Backend API health endpoint
- MongoDB readiness
- Redis availability
- Celery worker heartbeat

---

# 12. Best Practices

- Use multi-stage builds.
- Keep images lightweight.
- Pin dependency versions.
- Avoid running containers as root.
- Store secrets outside images.
- Minimize rebuild time with layer caching.

---

# 13. Future Improvements

Future enhancements include:

- Multi-architecture builds
- Docker image signing
- Kubernetes deployment
- Image vulnerability scanning
- Automatic image publishing

---

# 14. Summary

Docker provides a reproducible and portable runtime environment for PromptGuard, enabling consistent development and reliable deployments.