# PromptGuard Database Indexing Strategy

Version: 1.0

Status: Draft

Last Updated: July 2026

Owner: Renick Rajesh

---

# 1. Introduction

This document defines the indexing strategy for MongoDB collections used in PromptGuard.

Proper indexing ensures efficient query execution, minimizes latency, and supports the platform as data volume grows.

---

# 2. Indexing Principles

The indexing strategy follows these principles:

- Index frequently queried fields.
- Avoid excessive indexes that slow write operations.
- Use compound indexes for common query patterns.
- Enforce uniqueness where required.
- Use TTL indexes only for temporary data.

---

# 3. organizations

## Indexes

| Fields | Type | Purpose |
|--------|------|---------|
| _id | Primary | Default primary key |
| slug | Unique | Organization lookup by URL |

---

# 4. users

## Indexes

| Fields | Type | Purpose |
|--------|------|---------|
| _id | Primary | User identifier |
| email | Unique | Login and authentication |

---

# 5. projects

## Indexes

| Fields | Type | Purpose |
|--------|------|---------|
| _id | Primary | Project identifier |
| organization_id | Standard | Fetch projects for an organization |
| name | Standard | Search projects by name |

---

# 6. traces

The `traces` collection is the largest and most frequently queried collection.

## Indexes

| Fields | Type | Purpose |
|--------|------|---------|
| trace_id | Unique | Public trace lookup |
| project_id | Standard | Filter traces by project |
| user_id | Standard | User activity |
| created_at | Descending | Recent traces |
| status | Standard | Filter success/failure |

### Compound Indexes

| Fields | Purpose |
|--------|---------|
| (project_id, created_at) | Dashboard timeline |
| (project_id, status) | Error analysis |
| (project_id, model) | Model comparison |
| (project_id, provider) | Provider analytics |

---

# 7. prompt_versions

## Indexes

| Fields | Type | Purpose |
|--------|------|---------|
| project_id | Standard | Project prompts |
| version | Standard | Version lookup |
| (project_id, version) | Unique | Prevent duplicate versions |

---

# 8. datasets

## Indexes

| Fields | Type | Purpose |
|--------|------|---------|
| project_id | Standard | Project datasets |
| name | Standard | Dataset search |

---

# 9. replay_runs

## Indexes

| Fields | Type | Purpose |
|--------|------|---------|
| project_id | Standard | Project replay history |
| dataset_id | Standard | Dataset lookup |
| status | Standard | Active replay jobs |
| started_at | Descending | Recent executions |

### Compound Index

| Fields | Purpose |
|--------|---------|
| (project_id, started_at) | Replay history |

---

# 10. evaluations

## Indexes

| Fields | Type | Purpose |
|--------|------|---------|
| trace_id | Unique | One evaluation per trace |
| score | Standard | Score filtering |
| verdict | Standard | Pass/Fail analysis |

---

# 11. reports

## Indexes

| Fields | Type | Purpose |
|--------|------|---------|
| replay_run_id | Standard | Report retrieval |

---

# 12. api_keys

## Indexes

| Fields | Type | Purpose |
|--------|------|---------|
| project_id | Standard | Project API keys |
| provider | Standard | Provider-specific keys |

---

# 13. notifications

## Indexes

| Fields | Type | Purpose |
|--------|------|---------|
| user_id | Standard | User notifications |
| created_at | Descending | Latest notifications |

---

# 14. TTL Indexes

TTL (Time-To-Live) indexes automatically remove expired documents.

Potential future collections using TTL:

| Collection | Expiration |
|------------|------------|
| sessions | 30 days |
| refresh_tokens | 30 days |
| temporary_uploads | 24 hours |
| replay_logs | 90 days (optional) |

---

# 15. Query Optimization

Typical optimized queries include:

- Fetch latest traces for a project
- Retrieve replay history
- Filter failed evaluations
- Compare provider performance
- Generate dashboard analytics
- Search prompt versions

All common access patterns are supported through appropriate indexes.

---

# 16. Performance Considerations

To maintain performance as PromptGuard scales:

- Avoid indexing large text fields such as `prompt` and `response`.
- Use pagination for large result sets.
- Archive old traces if storage becomes excessive.
- Monitor index usage regularly and remove unused indexes.
- Review query plans using MongoDB's `explain()` when optimizing queries.

---

# 17. Future Improvements

Future indexing enhancements may include:

- Text indexes for prompt search.
- Atlas Search integration.
- Sharding by `project_id`.
- Materialized analytics collections.
- Read replicas for reporting workloads.

---

# 18. Summary

The indexing strategy is designed to support fast lookups, efficient analytics, and scalable growth while balancing read performance with write efficiency.