# PromptGuard Database Design

Version: 1.0

Status: Draft

Last Updated: July 2026

Owner: Renick Rajesh

---

# 1. Introduction

This document defines the logical database design of PromptGuard.

It describes the primary collections, relationships, indexing strategy, and data ownership model used throughout the platform.

PromptGuard uses MongoDB Atlas because the application's data is naturally document-oriented and evolves frequently as AI capabilities expand.

---

# 2. Database Principles

The database is designed according to the following principles.

## Single Source of Truth

Every entity has one authoritative collection.

---

## Multi-Tenant

Organizations own Projects.

Projects own every AI resource.

---

## Traceability

Every AI interaction is traceable.

No prompt should exist without a corresponding trace.

---

## Versioning

Prompt versions and datasets are immutable after publication.

Historical records must remain reproducible.

---

## Scalability

Collections are indexed for high-volume read/write operations.

Replay jobs should support millions of stored traces.

---

# 3. Collection Overview

| Collection | Purpose |
|------------|---------|
| organizations | Organizations |
| users | User accounts |
| memberships | Organization membership |
| projects | AI projects |
| api_keys | Project API keys |
| traces | Every AI interaction |
| prompt_versions | Versioned prompts |
| datasets | Regression datasets |
| replay_runs | Replay execution metadata |
| evaluations | Evaluation results |
| reports | Generated reports |
| notifications | Notification history |

---

# 4. Entity Relationships

```text
Organization
    │
    ├── Members
    │
    └── Projects
            │
            ├── Prompt Versions
            ├── Traces
            ├── Replay Runs
            ├── Evaluations
            ├── Reports
            └── Datasets
```

---

# 5. Core Design Philosophy

PromptGuard revolves around one central concept:

## Trace

A Trace represents one complete AI interaction.

Every prompt sent through PromptGuard creates exactly one Trace.

A Trace connects:

- User
- Project
- Prompt
- Response
- Provider
- Model
- Token Usage
- Cost
- Latency
- Evaluation
- Replay Run

Every analytics feature in PromptGuard is built on top of Traces.

---

# 6. Collection Ownership

Organization

↓

Project

↓

Trace

↓

Evaluation

↓

Reports

Every collection references its parent entity through immutable identifiers.

---

# 7. Future Collections

Potential future additions include:

- billing
- feature_flags
- experiments
- model_registry
- prompt_templates
- audit_logs
- usage_limits

---

# 8. Summary

The PromptGuard database is designed around traceability, scalability, and reproducibility.

By treating every AI interaction as a Trace and organizing resources under Projects and Organizations, the platform provides a consistent foundation for evaluation, analytics, and future enterprise capabilities.