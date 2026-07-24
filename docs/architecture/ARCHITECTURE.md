# PromptGuard Software Architecture

Version: 1.0

Status: Draft

Last Updated: July 2026

Owner: Renick Rajesh

---

# 1. Introduction

This document defines the high-level software architecture of PromptGuard.

It describes the system structure, architectural principles, major components, communication patterns, and technology stack used throughout the platform.

The objective is to provide a scalable, maintainable, and extensible architecture that supports the rapid evolution of PromptGuard while maintaining high software quality.

This document serves as the primary technical reference for all future development.

---

# 2. System Overview

PromptGuard is an enterprise platform for evaluating, testing, and monitoring Large Language Model (LLM) applications.

The platform enables engineering teams to:

- Record production prompts
- Build reusable evaluation datasets
- Replay prompts against different models
- Detect regressions automatically
- Compare prompt versions
- Measure AI quality
- Integrate evaluation into CI/CD pipelines

PromptGuard functions as an AI Quality Platform that sits between client applications and LLM providers.

---

# 3. Architectural Style

PromptGuard follows a **Modular Monolith Architecture**.

Version 1 will be implemented as a single FastAPI application with clearly separated modules.

Each module has a single responsibility and communicates through internal service interfaces.

This approach provides:

- Simpler deployment
- Easier debugging
- Lower operational cost
- Faster development
- Clear module boundaries
- Future migration path to microservices

The architecture intentionally avoids unnecessary distributed complexity while remaining scalable.

---

# 4. Design Principles

The architecture is built around the following principles.

## 4.1 Separation of Concerns

Each module performs one well-defined responsibility.

Examples:

- Authentication manages users.
- AI Gateway communicates with LLM providers.
- Replay Engine executes regression tests.
- Evaluation Engine scores outputs.

---

## 4.2 Provider Independence

PromptGuard never communicates directly with an LLM provider.

Every request passes through the AI Gateway.

Supported providers include:

- OpenAI
- Google Gemini
- Anthropic Claude
- Azure OpenAI
- Ollama
- Future providers

Switching providers should require configuration changes rather than code changes.

---

## 4.3 Scalability

Long-running operations execute asynchronously.

Replay execution and evaluation should never block user requests.

Background workers process heavy workloads independently.

---

## 4.4 Observability

Every request generates:

- Request ID
- Timing metrics
- Token usage
- Cost metrics
- Provider metadata
- Structured logs

Observability is considered a core product capability rather than an operational concern.

---

## 4.5 Security

Security is enforced throughout every layer.

Core principles include:

- JWT Authentication
- Role-Based Access Control (RBAC)
- Secure API Keys
- Encrypted secrets
- Audit logging
- HTTPS-only communication

---

# 5. Layered Architecture

PromptGuard is divided into six logical layers.

## Presentation Layer

Responsible for:

- React Dashboard
- Project Management
- Replay Dashboard
- Dataset Builder
- Authentication UI
- Reports

Technology:

- React
- TypeScript
- Tailwind CSS

---

## API Layer

Responsible for:

- REST API
- Authentication
- Authorization
- Validation
- Rate Limiting
- API Versioning

Technology:

- FastAPI

---

## Business Layer

Responsible for:

- AI Gateway
- Replay Engine
- Evaluation Engine
- Dataset Management
- Project Management
- Notifications

---

## Infrastructure Layer

Responsible for:

- Redis
- Background Jobs
- WebSockets
- Logging
- Monitoring
- External Integrations

---

## Data Layer

Responsible for persistent storage.

Primary database:

MongoDB Atlas

Stores:

- Users
- Organizations
- Projects
- Prompt Logs
- Replay Runs
- Evaluation Results
- Reports

---

## External Layer

External integrations include:

- OpenAI
- Gemini
- Anthropic
- GitHub
- Slack
- Email Providers

---

# 6. High-Level Component Diagram

```text
                         Users
                           │
                           ▼
                    React Frontend
                           │
                           ▼
                    FastAPI Gateway
                           │
        ┌──────────────────┼──────────────────┐
        │                  │                  │
 Authentication      Project Service     AI Gateway
        │                  │                  │
        └──────────────┬───┴──────────────────┘
                       │
                Replay Engine
                       │
               Evaluation Engine
                       │
         MongoDB    Redis    LiteLLM
                       │
         OpenAI | Gemini | Claude | Ollama
```

---

# 7. Technology Stack

| Layer | Technology |
|--------|------------|
| Frontend | React + TypeScript |
| Styling | Tailwind CSS |
| Backend | FastAPI |
| Database | MongoDB Atlas |
| Cache | Redis |
| Queue | Celery |
| ORM/Driver | Motor |
| AI Gateway | LiteLLM |
| Authentication | JWT |
| Deployment | Docker |
| CI/CD | GitHub Actions |
| Monitoring | Prometheus + Grafana |
| Error Tracking | Sentry |

---

# 8. Future Evolution

Although Version 1 uses a modular monolith, the architecture is designed to support future migration to microservices.

Potential future services include:

- Replay Service
- Evaluation Service
- Notification Service
- Billing Service
- Analytics Service

Migration should not require major architectural redesign because module boundaries are established from the beginning.

---

# 9. Summary

The architecture prioritizes simplicity, maintainability, and scalability.

Rather than optimizing prematurely for distributed systems, PromptGuard adopts a modular monolith that enables rapid development while preserving a clear path for future growth.

This architecture forms the technical foundation upon which every subsequent module, API, and deployment strategy will be built.
