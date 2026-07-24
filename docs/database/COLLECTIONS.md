# PromptGuard Collection Schemas

Version: 1.0

Status: Draft

Last Updated: July 2026

Owner: Renick Rajesh

---

# 1. Introduction

This document defines the schema for every MongoDB collection used in PromptGuard.

For each collection, the following are specified:

- Purpose
- Field definitions
- Validation rules
- Index recommendations
- Example document

These schemas serve as the reference for backend models, API validation, and future database migrations.

---

# 2. organizations

## Purpose

Stores organization information. Every project belongs to exactly one organization.

| Field | Type | Required | Indexed | Description | Example |
|------|------|----------|----------|-------------|---------|
| _id | ObjectId | ✅ | ✅ | Unique organization ID | ObjectId(...) |
| name | String | ✅ | ✅ | Organization name | OpenAI Labs |
| slug | String | ✅ | ✅ | URL-friendly identifier | openai-labs |
| created_at | Date | ✅ | ❌ | Creation timestamp | 2026-07-24T10:00:00Z |

### Example

```json
{
  "_id": "ObjectId(...)",
  "name": "OpenAI Labs",
  "slug": "openai-labs",
  "created_at": "2026-07-24T10:00:00Z"
}
```

---

# 3. users

## Purpose

Stores user account information.

| Field | Type | Required | Indexed | Description | Example |
|------|------|----------|----------|-------------|---------|
| _id | ObjectId | ✅ | ✅ | User ID | ObjectId(...) |
| email | String | ✅ | ✅ | Email address | alex@example.com |
| password_hash | String | ✅ | ❌ | Argon2 hash | ***** |
| full_name | String | ✅ | ❌ | User name | Alex Johnson |
| avatar_url | String | ❌ | ❌ | Profile image | https://... |
| created_at | Date | ✅ | ❌ | Registration time | 2026-07-24 |

---

# 4. projects

## Purpose

Represents an AI project managed by PromptGuard.

| Field | Type | Required | Indexed | Description |
|------|------|----------|----------|-------------|
| _id | ObjectId | ✅ | ✅ | Project ID |
| organization_id | ObjectId | ✅ | ✅ | Parent organization |
| name | String | ✅ | ✅ | Project name |
| description | String | ❌ | ❌ | Project description |
| provider | String | ✅ | ❌ | OpenAI, Anthropic, etc. |
| default_model | String | ✅ | ❌ | Default LLM |
| created_at | Date | ✅ | ❌ | Creation date |

---

# 5. traces

## Purpose

The Trace is the core entity in PromptGuard.

Every AI interaction creates one Trace.

| Field | Type | Required | Indexed | Description |
|------|------|----------|----------|-------------|
| trace_id | UUID | ✅ | ✅ | Public Trace ID |
| project_id | ObjectId | ✅ | ✅ | Parent project |
| user_id | ObjectId | ✅ | ✅ | User |
| provider | String | ✅ | ❌ | Model provider |
| model | String | ✅ | ❌ | Model name |
| prompt | String | ✅ | ❌ | User prompt |
| response | String | ✅ | ❌ | AI response |
| latency_ms | Integer | ✅ | ❌ | Request latency |
| input_tokens | Integer | ✅ | ❌ | Prompt tokens |
| output_tokens | Integer | ✅ | ❌ | Completion tokens |
| total_tokens | Integer | ✅ | ❌ | Total token usage |
| estimated_cost | Decimal | ✅ | ❌ | Estimated cost |
| status | String | ✅ | ❌ | Success / Failed |
| created_at | Date | ✅ | ✅ | Timestamp |

### Example

```json
{
  "trace_id": "trc_01JABCDE123",
  "project_id": "ObjectId(...)",
  "provider": "OpenAI",
  "model": "gpt-5.5",
  "prompt": "Explain quantum computing.",
  "response": "Quantum computing is...",
  "latency_ms": 812,
  "input_tokens": 42,
  "output_tokens": 215,
  "total_tokens": 257,
  "estimated_cost": 0.012,
  "status": "success",
  "created_at": "2026-07-24T10:30:00Z"
}
```

---

# 6. prompt_versions

## Purpose

Stores immutable versions of prompts.

| Field | Type | Required | Indexed |
|------|------|----------|----------|
| _id | ObjectId | ✅ | ✅ |
| project_id | ObjectId | ✅ | ✅ |
| version | Integer | ✅ | ✅ |
| content | String | ✅ | ❌ |
| created_at | Date | ✅ | ❌ |

---

# 7. datasets

## Purpose

Stores datasets used for regression testing.

| Field | Type | Required | Indexed |
|------|------|----------|----------|
| _id | ObjectId | ✅ | ✅ |
| project_id | ObjectId | ✅ | ✅ |
| name | String | ✅ | ✅ |
| version | Integer | ✅ | ❌ |
| examples | Array | ✅ | ❌ |
| created_at | Date | ✅ | ❌ |

---

# 8. replay_runs

## Purpose

Stores replay execution metadata.

| Field | Type | Required | Indexed |
|------|------|----------|----------|
| _id | ObjectId | ✅ | ✅ |
| project_id | ObjectId | ✅ | ✅ |
| dataset_id | ObjectId | ✅ | ✅ |
| status | String | ✅ | ❌ |
| total_cases | Integer | ✅ | ❌ |
| passed_cases | Integer | ✅ | ❌ |
| failed_cases | Integer | ✅ | ❌ |
| started_at | Date | ✅ | ❌ |
| completed_at | Date | ❌ | ❌ |

---

# 9. evaluations

## Purpose

Stores evaluation results for traces.

| Field | Type | Required | Indexed |
|------|------|----------|----------|
| _id | ObjectId | ✅ | ✅ |
| trace_id | UUID | ✅ | ✅ |
| score | Decimal | ✅ | ❌ |
| exact_match | Boolean | ✅ | ❌ |
| semantic_similarity | Decimal | ❌ | ❌ |
| llm_judge | Decimal | ❌ | ❌ |
| verdict | String | ✅ | ❌ |

---

# 10. reports

## Purpose

Stores generated replay and evaluation reports.

| Field | Type | Required | Indexed |
|------|------|----------|----------|
| _id | ObjectId | ✅ | ✅ |
| replay_run_id | ObjectId | ✅ | ✅ |
| generated_at | Date | ✅ | ❌ |
| report_url | String | ❌ | ❌ |

---

# 11. api_keys

## Purpose

Stores encrypted project API keys.

| Field | Type | Required | Indexed |
|------|------|----------|----------|
| _id | ObjectId | ✅ | ✅ |
| project_id | ObjectId | ✅ | ✅ |
| provider | String | ✅ | ❌ |
| encrypted_key | String | ✅ | ❌ |
| created_at | Date | ✅ | ❌ |

---

# 12. notifications

## Purpose

Stores notification history.

| Field | Type | Required | Indexed |
|------|------|----------|----------|
| _id | ObjectId | ✅ | ✅ |
| user_id | ObjectId | ✅ | ✅ |
| type | String | ✅ | ❌ |
| message | String | ✅ | ❌ |
| status | String | ✅ | ❌ |
| created_at | Date | ✅ | ❌ |

---

# 13. Summary

The database schema is designed to be scalable, traceable, and extensible. Every collection supports PromptGuard's core capabilities while maintaining clear ownership through Organizations and Projects.