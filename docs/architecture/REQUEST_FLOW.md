# PromptGuard Request Flow

Version: 1.0

Status: Draft

Last Updated: July 2026

Owner: Renick Rajesh

---

# 1. Introduction

This document describes how requests move through PromptGuard from the moment a user interacts with the platform until the final response is returned.

The objective is to provide a consistent request lifecycle across all modules while ensuring security, observability, scalability, and maintainability.

Every request should be traceable from entry to completion.

---

# 2. Core Request Lifecycle

Every incoming request follows the same high-level lifecycle.

```text
User
   │
   ▼
React Frontend
   │
   ▼
FastAPI API
   │
   ▼
Authentication
   │
   ▼
Authorization
   │
   ▼
Business Service
   │
   ▼
Database / AI Gateway
   │
   ▼
Business Service
   │
   ▼
Response
```

Each stage is responsible for a single concern before forwarding the request.

---

# 3. AI Gateway Flow

The AI Gateway is the central routing layer for all model interactions.

```text
Client Application
        │
        ▼
AI Gateway
        │
        ▼
Validate Request
        │
        ▼
Load Project Configuration
        │
        ▼
Select Provider
        │
        ▼
Forward Request via LiteLLM
        │
        ▼
Receive Response
        │
        ▼
Normalize Response
        │
        ▼
Record Metrics
        │
        ▼
Return Response
```

### Responsibilities

- Validate incoming requests
- Select the configured model provider
- Forward prompts
- Normalize responses
- Record token usage
- Calculate estimated cost
- Measure latency
- Capture provider metadata

---

# 4. Prompt Recording Flow

Every prompt passing through PromptGuard is recorded.

```text
Prompt Received
        │
        ▼
Generate Trace ID
        │
        ▼
Store Prompt
        │
        ▼
Forward to Provider
        │
        ▼
Receive Response
        │
        ▼
Store Response
        │
        ▼
Update Metrics
```

Captured metadata includes:

- Prompt ID
- Project ID
- User ID
- Provider
- Model
- Prompt Version
- Timestamp
- Latency
- Token Usage
- Estimated Cost

---

# 5. Replay Flow

Regression testing is performed through replay jobs.

```text
User Starts Replay
        │
        ▼
Load Dataset
        │
        ▼
Create Replay Run
        │
        ▼
Queue Replay Job
        │
        ▼
Background Worker
        │
        ▼
AI Gateway
        │
        ▼
Collect Responses
        │
        ▼
Evaluation Engine
        │
        ▼
Generate Report
```

Replay execution is asynchronous.

The user can monitor progress in real time.

---

# 6. Evaluation Flow

Every replayed response passes through the evaluation pipeline.

```text
Expected Output
        │
        ▼
Actual Output
        │
        ▼
Evaluation Rules
        │
        ▼
Exact Match
        │
        ▼
JSON Validation
        │
        ▼
Semantic Similarity
        │
        ▼
LLM Judge
        │
        ▼
Composite Score
        │
        ▼
Pass / Fail
```

Evaluation results are stored for historical comparison.

---

# 7. Dashboard Flow

Dashboard metrics are generated from historical data.

```text
MongoDB
      │
      ▼
Analytics Service
      │
      ▼
Aggregate Metrics
      │
      ▼
Dashboard API
      │
      ▼
React Dashboard
```

Displayed metrics include:

- Replay Success Rate
- Evaluation Score
- Quality Timeline
- Token Usage
- Cost Trends
- Latency Trends
- Provider Usage

---

# 8. Notification Flow

Notifications are generated after important events.

```text
Replay Completed
        │
        ▼
Notification Service
        │
        ├── Slack
        ├── Email
        └── Webhooks
```

Supported events:

- Replay completed
- Replay failed
- Evaluation below threshold
- Deployment blocked
- Integration failure

---

# 9. Error Handling Flow

Errors follow a consistent lifecycle.

```text
Exception
     │
     ▼
Structured Logger
     │
     ▼
Error Response
     │
     ▼
Monitoring
     │
     ▼
Sentry
```

Each error includes:

- Request ID
- Timestamp
- Component
- Error Code
- Message

---

# 10. Observability

Every request generates telemetry.

Collected metrics:

- Request ID
- Trace ID
- Duration
- Token Usage
- Cost
- Provider
- Model
- Status
- User
- Project

This information powers analytics, debugging, and replay capabilities.

---

# 11. Summary

PromptGuard follows a consistent request lifecycle across all platform components.

By standardizing request handling, prompt recording, evaluation, and monitoring, the platform provides reliable AI quality assurance while remaining scalable and maintainable.

Every request becomes an observable event that contributes to the overall understanding of AI system performance.