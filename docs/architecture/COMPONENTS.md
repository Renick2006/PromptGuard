# PromptGuard System Components

Version: 1.0

Status: Draft

Last Updated: July 2026

Owner: Renick Rajesh

---

# 1. Introduction

This document describes the major software components that make up PromptGuard.

Each component is designed as an independent module with clearly defined responsibilities, interfaces, dependencies, and outputs.

Although PromptGuard Version 1 is implemented as a modular monolith, every component is intentionally isolated to enable future migration into independent microservices if required.

---

# 2. Component Overview

The platform consists of the following core components:

| Component | Purpose |
|------------|---------|
| Authentication Service | User authentication and authorization |
| Organization Service | Multi-tenant organization management |
| Project Service | Project lifecycle management |
| AI Gateway | Unified interface to LLM providers |
| Prompt Logger | Records prompts and responses |
| Dataset Manager | Creates and manages evaluation datasets |
| Replay Engine | Executes regression test runs |
| Evaluation Engine | Scores model responses |
| Dashboard Service | Aggregates analytics and metrics |
| Notification Service | Sends alerts and deployment notifications |
| Integration Service | External integrations (GitHub, Slack, etc.) |

---

# 3. Component Specifications

---

## 3.1 Authentication Service

### Responsibilities

- User registration
- Login
- JWT generation
- Refresh tokens
- Password hashing
- Session validation
- Role-Based Access Control (RBAC)

### Inputs

- Login requests
- Registration requests
- API tokens

### Outputs

- JWT Access Token
- Refresh Token
- Authenticated user context

### Dependencies

- MongoDB
- JWT
- Argon2 Password Hasher

---

## 3.2 Organization Service

### Responsibilities

- Organization creation
- Team management
- Member invitations
- User roles
- Access permissions

### Dependencies

- Authentication Service
- MongoDB

---

## 3.3 Project Service

### Responsibilities

- Create projects
- Update project settings
- Manage environments
- Configure providers
- Store API keys
- Maintain project metadata

### Inputs

- Project configuration
- Provider settings

### Outputs

- Project information
- Configuration objects

### Dependencies

- MongoDB
- Authentication Service

---

## 3.4 AI Gateway

The AI Gateway is the central routing layer of PromptGuard.

Every request to an LLM provider passes through this component.

### Responsibilities

- Provider routing
- Prompt forwarding
- Response normalization
- Retry policies
- Timeout handling
- Cost calculation
- Token accounting
- Latency tracking
- Provider failover
- Request tracing

### Inputs

- Prompt request
- Model configuration
- Generation parameters

### Outputs

- LLM response
- Usage statistics
- Provider metadata

### Dependencies

- LiteLLM
- Redis
- MongoDB

---

## 3.5 Prompt Logger

### Responsibilities

- Store prompts
- Store responses
- Store metadata
- Store latency
- Store token usage
- Version prompt history

### Dependencies

- MongoDB

---

## 3.6 Dataset Manager

### Responsibilities

- Create datasets
- Import prompts
- Export datasets
- Version datasets
- Label test cases
- Organize benchmark collections

### Dependencies

- MongoDB
- Prompt Logger

---

## 3.7 Replay Engine

The Replay Engine is responsible for executing regression tests.

### Responsibilities

- Load datasets
- Queue replay jobs
- Execute prompts
- Track execution progress
- Handle retries
- Store replay results

### Inputs

- Dataset
- Target model
- Prompt version

### Outputs

- Replay run
- Execution logs
- Response collection

### Dependencies

- Redis
- AI Gateway
- MongoDB

---

## 3.8 Evaluation Engine

The Evaluation Engine determines response quality.

### Responsibilities

- Exact Match
- JSON Validation
- Regex Validation
- Semantic Similarity
- LLM-as-a-Judge
- Composite scoring
- Pass/Fail decision

### Inputs

- Expected output
- Actual output
- Evaluation rules

### Outputs

- Evaluation score
- Quality report
- Regression report

### Dependencies

- Sentence Transformers
- LiteLLM
- MongoDB

---

## 3.9 Dashboard Service

### Responsibilities

- Dashboard metrics
- Historical trends
- Cost analytics
- Token analytics
- Replay summaries
- Quality timeline

### Dependencies

- MongoDB

---

## 3.10 Notification Service

### Responsibilities

- Slack notifications
- Email notifications
- Deployment alerts
- Replay completion alerts

### Dependencies

- Integration Service

---

## 3.11 Integration Service

### Responsibilities

- GitHub
- Slack
- Webhooks
- Future integrations

### Dependencies

- External APIs

---

# 4. Component Relationships

```text
React Frontend
        │
        ▼
Authentication
        │
        ▼
Project Service
        │
        ▼
AI Gateway
        │
        ├─────────────► Prompt Logger
        │
        ▼
Replay Engine
        │
        ▼
Evaluation Engine
        │
        ▼
Dashboard Service
        │
        ▼
Notification Service
```

---

# 5. Cross-Cutting Concerns

Every component follows the same engineering standards.

## Logging

Each request must generate:

- Request ID
- Timestamp
- Duration
- Component name

---

## Error Handling

Errors must be:

- Structured
- Logged
- Traceable
- User-friendly

---

## Security

Every component must:

- Validate authentication
- Validate authorization
- Sanitize inputs
- Prevent unauthorized access

---

## Monitoring

Each component exposes metrics for:

- Response time
- Throughput
- Error rate
- Success rate
- Resource usage

---

# 6. Future Components

The architecture is intentionally extensible.

Potential future additions include:

- Billing Service
- AI Experiment Service
- Feature Flag Service
- A/B Testing Engine
- Prompt Optimization Engine
- Model Cost Optimizer

---

# 7. Summary

PromptGuard is composed of modular components with clearly defined responsibilities and interfaces.

This modular design simplifies maintenance, encourages separation of concerns, and provides a smooth migration path to microservices if future scaling requirements demand it.

Every future backend implementation should map directly to one or more components defined in this document.