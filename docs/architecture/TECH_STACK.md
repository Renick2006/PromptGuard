# PromptGuard Technology Stack

Version: 1.0

Status: Draft

Last Updated: July 2026

Owner: Renick Rajesh

---

# 1. Introduction

This document defines the technologies selected for PromptGuard and explains the rationale behind each choice.

The stack is designed to prioritize developer productivity, scalability, maintainability, and long-term growth.

---

# 2. System Overview

| Layer | Technology |
|--------|------------|
| Frontend | React + TypeScript |
| Backend | FastAPI |
| Database | MongoDB Atlas |
| Cache | Redis |
| Background Jobs | Celery |
| Message Broker | Redis |
| AI Gateway | LiteLLM |
| Authentication | JWT + Argon2 |
| API Docs | OpenAPI / Swagger |
| Monitoring | Prometheus |
| Dashboards | Grafana |
| Error Tracking | Sentry |
| Containerization | Docker |
| CI/CD | GitHub Actions |

---

# 3. Frontend

## React

Purpose:

- Dashboard
- Project management
- Replay monitoring
- Analytics

Reasons:

- Component-based architecture
- Large ecosystem
- Strong TypeScript support

---

## TypeScript

Purpose:

- Static typing
- Better tooling
- Reduced runtime errors

---

## Tailwind CSS

Purpose:

- Utility-first styling
- Consistent design system
- Rapid UI development

---

## shadcn/ui

Purpose:

- Accessible components
- Professional UI
- Easy customization

---

# 4. Backend

## FastAPI

Responsibilities:

- REST API
- Authentication
- Business logic
- AI Gateway integration

Reasons:

- Excellent performance
- Automatic OpenAPI generation
- Native async support
- Strong typing with Pydantic

---

## Pydantic v2

Purpose:

- Request validation
- Response serialization
- Configuration models

---

# 5. Database

## MongoDB Atlas

Purpose:

- Store traces
- Projects
- Replay runs
- Evaluations
- Reports

Reasons:

- Flexible schema
- Horizontal scaling
- Managed cloud service

---

# 6. Caching

## Redis

Responsibilities:

- Session caching
- Queue broker
- Temporary data
- Rate limiting

---

# 7. Background Processing

## Celery

Responsibilities:

- Replay execution
- Evaluation jobs
- Report generation
- Notifications

---

# 8. AI Integration

## LiteLLM

Responsibilities:

- Provider abstraction
- Request routing
- Model selection
- Cost tracking

Supported providers include:

- OpenAI
- Anthropic
- Google
- Azure OpenAI
- Groq
- Ollama

---

# 9. Authentication

Technologies:

- JWT Access Tokens
- Refresh Tokens
- Argon2 Password Hashing

Security Features:

- Short-lived access tokens
- Secure password hashing
- Token refresh workflow

---

# 10. Monitoring

## Prometheus

Collects:

- API latency
- Request counts
- Replay metrics
- AI Gateway metrics

---

## Grafana

Displays:

- Dashboard metrics
- Performance trends
- Infrastructure health

---

## Sentry

Tracks:

- Exceptions
- Stack traces
- Performance issues

---

# 11. DevOps

## Docker

Purpose:

- Consistent development
- Production deployment

---

## GitHub Actions

Responsibilities:

- Automated testing
- Linting
- Docker builds
- Deployments

---

# 12. Development Tools

| Tool | Purpose |
|------|---------|
| VS Code | Development |
| Git | Version Control |
| GitHub | Source Control |
| Postman | API Testing |
| MongoDB Compass | Database Management |

---

# 13. Future Technologies

Potential future additions:

- Kubernetes
- Kafka
- OpenTelemetry
- Vector Database
- Elasticsearch
- Temporal
- Terraform

---

# 14. Technology Selection Principles

Technologies are selected based on:

- Community support
- Performance
- Maintainability
- Scalability
- Developer experience
- Cloud compatibility

---

# 15. Summary

The PromptGuard technology stack provides a modern, scalable, and maintainable foundation for building an enterprise-grade AI quality platform.