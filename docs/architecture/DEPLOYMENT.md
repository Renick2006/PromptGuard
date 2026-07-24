# PromptGuard Deployment Architecture

Version: 1.0

Status: Draft

Last Updated: July 2026

Owner: Renick Rajesh

---

# 1. Introduction

This document describes how PromptGuard is deployed across development, staging, and production environments.

The deployment architecture is designed for scalability, reliability, and maintainability while supporting continuous delivery.

---

# 2. Deployment Environments

PromptGuard supports three deployment environments:

| Environment | Purpose |
|------------|---------|
| Development | Local development and testing |
| Staging | Pre-production validation |
| Production | Live user environment |

Each environment maintains separate configuration, secrets, and databases.

---

# 3. High-Level Deployment Architecture

```text
                 Internet
                     │
                     ▼
              Reverse Proxy
                     │
          ┌──────────┴──────────┐
          ▼                     ▼
    React Frontend         FastAPI Backend
                                  │
          ┌───────────────────────┼────────────────────────┐
          ▼                       ▼                        ▼
     MongoDB Atlas            Redis                  LiteLLM Gateway
                                                          │
                                                          ▼
                                             OpenAI / Anthropic / Groq
```

---

# 4. Components

## React Frontend

Responsibilities:

- User interface
- Dashboard
- Authentication
- API communication

---

## FastAPI Backend

Responsibilities:

- Business logic
- Authentication
- AI Gateway
- Replay Engine
- Evaluation Engine

---

## MongoDB Atlas

Stores:

- Organizations
- Projects
- Traces
- Replay Runs
- Evaluations
- Reports

---

## Redis

Responsibilities:

- Background job queue
- Caching
- Rate limiting
- Session storage

---

## Celery Workers

Execute:

- Replay jobs
- Evaluations
- Report generation
- Notifications

---

# 5. Deployment Workflow

```text
Developer
    │
    ▼
Git Push
    │
    ▼
GitHub Actions
    │
    ▼
Run Tests
    │
    ▼
Build Docker Images
    │
    ▼
Deploy
```

---

# 6. Configuration Management

Environment variables include:

- DATABASE_URL
- REDIS_URL
- JWT_SECRET
- OPENAI_API_KEY
- ANTHROPIC_API_KEY
- SENTRY_DSN

Secrets should never be committed to source control.

---

# 7. Security

Deployment security includes:

- HTTPS
- Secure headers
- JWT authentication
- Secret management
- Rate limiting
- Input validation
- Database encryption at rest

---

# 8. Scaling Strategy

Frontend:

- Static hosting with CDN

Backend:

- Multiple FastAPI instances behind a load balancer

Workers:

- Horizontal scaling using additional Celery workers

Database:

- MongoDB Atlas autoscaling

---

# 9. Monitoring

The deployment includes:

- Prometheus metrics
- Grafana dashboards
- Sentry error tracking
- Structured application logs

---

# 10. Backup and Recovery

Database:

- Automated daily backups
- Point-in-time recovery

Application:

- Version-controlled source code
- Reproducible Docker images

---

# 11. Future Deployment Enhancements

Future improvements include:

- Kubernetes orchestration
- Blue-green deployments
- Canary releases
- Infrastructure as Code (Terraform)
- Multi-region deployment

---

# 12. Summary

PromptGuard's deployment architecture provides a secure, scalable, and maintainable foundation for delivering AI quality services across multiple environments.