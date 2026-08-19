# Memory Manager

> **Module**: Core  
> **Version**: 1.0.0  
> **Status**: Active

---

## Purpose

The Memory Manager provides persistent, structured knowledge storage and retrieval across sessions. While the Context Manager handles in-session state, the Memory Manager ensures that critical decisions, learnings, project knowledge, and user preferences survive beyond individual conversations.

Without memory, every session starts from zero. The Memory Manager transforms Thoth OS from a stateless tool into a knowledge-accumulating system that gets smarter with every interaction.

---

## Responsibilities

1. **Knowledge Capture** — Identify and extract valuable information from conversations: architectural decisions, user preferences, project patterns, resolved bugs, and lessons learned.

2. **Knowledge Organization** — Store memories in structured, retrievable formats organized by project, domain, type, and importance. Maintain a taxonomy that scales.

3. **Knowledge Retrieval** — Surface relevant memories when needed. Use semantic similarity, keyword matching, and temporal relevance to find the right memories at the right time.

4. **Knowledge Maintenance** — Detect and resolve stale, contradictory, or superseded memories. Memory rot is as dangerous as no memory at all.

5. **Knowledge Indexing** — Maintain indices for fast retrieval across large knowledge bases. Support full-text search, tag-based filtering, and relationship traversal.

6. **Privacy Management** — Classify memories by sensitivity. Ensure secrets, credentials, and personal data are handled appropriately and never leaked into general context.

---

## Invocation Rules

| Condition | Action |
|---|---|
| Architectural decision is made | Capture as a Decision Record with rationale |
| User corrects agent behavior | Store as a preference/learning |
| Bug is resolved | Capture root cause, fix, and prevention strategy |
| Project configuration changes | Update project state memory |
| Session ends | Extract and persist session highlights |
| Agent requests historical context | Retrieve and rank relevant memories |
| Contradiction with existing memory detected | Flag for reconciliation |

---

## Inputs

| Input | Type | Description |
|---|---|---|
| `content` | String | Raw content to be memorized |
| `category` | Enum | `decision`, `preference`, `learning`, `project_state`, `pattern`, `error`, `reference` |
| `project` | String | Associated project identifier |
| `tags` | Array | Searchable tags for retrieval |
| `importance` | Enum | `critical`, `high`, `medium`, `low` |
| `expiry` | Date | Optional expiration for time-sensitive memories |
| `relationships` | Array | Links to related memories |

---

## Outputs

| Output | Type | Description |
|---|---|---|
| `memory_id` | String | Unique identifier for the stored memory |
| `retrieval_results` | Array | Ranked list of relevant memories |
| `memory_summary` | String | Condensed summary of stored knowledge on a topic |
| `staleness_report` | Object | Memories flagged as potentially outdated |
| `conflict_report` | Object | Contradictory memories requiring resolution |

---

## Memory Schema

```yaml
memory:
  id: "mem_2024_001"
  created: "2024-01-15T10:30:00Z"
  updated: "2024-01-15T10:30:00Z"
  category: "decision"
  project: "auth-service"
  importance: "critical"
  
  content:
    title: "Session storage strategy"
    summary: "Chose Redis over in-memory sessions for horizontal scalability"
    detail: |
      Decision: Use Redis for session storage
      Alternatives considered: In-memory (express-session), PostgreSQL, MongoDB
      Rationale: Need horizontal scaling across multiple server instances.
      In-memory doesn't share state. PostgreSQL adds latency for frequent reads.
      Redis provides sub-millisecond reads with built-in TTL support.
    trade_offs:
      - gain: "Horizontal scalability, built-in TTL, sub-ms latency"
      - sacrifice: "Additional infrastructure dependency, Redis operational overhead"
  
  tags: ["redis", "sessions", "authentication", "infrastructure"]
  relationships: ["mem_2024_002", "mem_2024_005"]
  expiry: null
```

---

## Example Usage

### Scenario: Capturing an architectural decision

```
1. During development, the team decides to use PostgreSQL over MongoDB

2. Memory Manager captures:
   {
     category: "decision",
     title: "Primary database selection",
     summary: "PostgreSQL selected over MongoDB for strong consistency 
               and relational data patterns",
     rationale: "Application has highly relational data (users → orders → 
                 items → reviews). PostgreSQL's ACID compliance, JOIN 
                 performance, and mature ecosystem outweigh MongoDB's 
                 flexibility for this use case.",
     tags: ["database", "postgresql", "architecture"],
     importance: "critical"
   }

3. Later, when building a new microservice:
   - Agent asks: "What database should this service use?"
   - Memory Manager retrieves the decision record
   - Agent aligns with established architecture or escalates if 
     the new service has different requirements
```

### Scenario: Learning from a user correction

```
1. User says: "Don't use class components in React, always use 
   functional components with hooks"

2. Memory Manager stores:
   {
     category: "preference",
     title: "React component style preference",
     summary: "Always use functional components with hooks, 
               never class components",
     tags: ["react", "frontend", "code-style"],
     importance: "high"
   }

3. In all future React work:
   - Frontend Engineer checks preferences before generating code
   - Memory Manager surfaces this preference automatically
   - Code reviews flag class components as violations
```

---

## Best Practices

1. **Capture decisions, not just outcomes.** Store the *why* alongside the *what*. Decisions without rationale are useless when revisiting them later.

2. **Use consistent tagging.** Maintain a controlled vocabulary for tags. `"db"`, `"database"`, `"DB"`, `"data-store"` should all resolve to one canonical tag.

3. **Rank by retrieval value.** Not all memories are equal. A critical architecture decision matters more than a minor formatting preference. Weight retrieval results by importance.

4. **Implement memory decay.** Reduce the retrieval weight of old memories over time, unless they're tagged as `critical` or `permanent`. Recent decisions should outrank old ones.

5. **Cross-reference memories.** Link related memories together. A database decision is related to an ORM choice, which is related to a migration strategy. The relationship graph makes retrieval smarter.

6. **Validate before overwriting.** When new information contradicts an existing memory, don't silently overwrite. Flag the conflict, present both versions, and let the resolution be explicit.

7. **Audit memory periodically.** Schedule memory reviews to purge stale entries, resolve conflicts, and consolidate redundant memories.

---

## Integration Points

| Module | Interaction |
|---|---|
| Context Manager | Requests relevant memories for context assembly |
| Planning Engine | Retrieves past plans and outcomes for improved planning |
| Reflection Engine | Stores learnings from reflection cycles |
| Decision Engine | Retrieves past decisions for consistency checking |
| Quality Checker | Validates outputs against stored standards and preferences |
