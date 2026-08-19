# Context Manager

> **Module**: Core  
> **Version**: 1.0.0  
> **Status**: Active

---

## Purpose

The Context Manager is responsible for maintaining, organizing, and optimizing the conversational and project context across all interactions within Thoth OS. It ensures that every agent has access to the relevant information it needs — and only what it needs — to perform its task effectively.

Context is the most valuable resource in an AI-powered workspace. Poorly managed context leads to hallucinations, redundant work, contradictory outputs, and wasted tokens. The Context Manager treats context as a first-class system resource.

---

## Responsibilities

1. **Context Assembly** — Gather and structure relevant context before any task execution. This includes project state, conversation history, active files, user preferences, and domain-specific knowledge.

2. **Context Pruning** — Remove irrelevant, outdated, or redundant information from the active context window. Prioritize recency, relevance, and importance.

3. **Context Routing** — Deliver the right context to the right agent. A Frontend Engineer doesn't need database migration history. A Security Engineer doesn't need UI color palettes.

4. **Context Persistence** — Coordinate with the Memory Manager to persist critical context across sessions. Identify what should be remembered long-term versus what is session-ephemeral.

5. **Context Conflict Resolution** — Detect and resolve contradictions in context (e.g., conflicting requirements, outdated specs vs. current code).

6. **Context Compression** — Work with the Token Optimizer to compress context when approaching token limits without losing critical information.

---

## Invocation Rules

| Condition | Action |
|---|---|
| New conversation starts | Load project context, user preferences, active task state |
| Agent is invoked | Assemble agent-specific context package |
| Context window exceeds 70% capacity | Trigger context pruning |
| Cross-agent handoff occurs | Package and transfer relevant context |
| User references previous work | Retrieve and inject historical context |
| Contradiction detected | Flag for resolution before proceeding |

---

## Inputs

| Input | Type | Description |
|---|---|---|
| `conversation_history` | Array | Recent messages and interactions |
| `project_state` | Object | Current project files, configs, architecture |
| `active_task` | Object | Currently executing task with its requirements |
| `agent_profile` | Object | The target agent's role, expertise, and context needs |
| `user_preferences` | Object | User's coding style, tech stack preferences, conventions |
| `knowledge_base` | Object | Relevant knowledge items from the Knowledge directory |

---

## Outputs

| Output | Type | Description |
|---|---|---|
| `context_package` | Object | Structured context optimized for the target agent/task |
| `context_summary` | String | Compressed summary of current state for quick orientation |
| `pruning_report` | Object | What was removed and why, for auditability |
| `conflict_alerts` | Array | Detected contradictions requiring resolution |
| `token_usage_report` | Object | Current context token count and budget remaining |

---

## Example Usage

### Scenario: Starting a new feature development task

```
1. User requests: "Build a user authentication system with OAuth2"

2. Context Manager assembles:
   ├── Project tech stack (Node.js, Express, PostgreSQL)
   ├── Existing auth-related code (if any)
   ├── Security requirements from Rules/AGENTS.md
   ├── Relevant Skills (authentication, secure-coding, api-security)
   ├── Architecture patterns from previous decisions
   └── User's preference for JWT vs session-based auth (from history)

3. Context Manager routes to:
   ├── Backend Engineer: Full technical context + API specs
   ├── Security Engineer: Threat model + OWASP guidelines
   └── QA Engineer: Test requirements + edge cases

4. Context Manager monitors:
   ├── Token usage across the conversation
   ├── New context generated during implementation
   └── Decisions that should persist to Memory Manager
```

### Scenario: Resuming work after a break

```
1. User returns to conversation

2. Context Manager loads:
   ├── Last active task and its status
   ├── Pending decisions awaiting input
   ├── Recent changes to the codebase
   ├── Open questions from previous session
   └── Updated dependencies or breaking changes

3. Context Manager presents:
   "Welcome back. Here's where we left off:
    - Auth system: API routes complete, middleware pending
    - Open decision: Redis vs in-memory session store
    - Blocker: OAuth provider callback URL needs configuration"
```

---

## Best Practices

1. **Front-load critical context.** The most important information should appear first in the context window. LLMs exhibit primacy bias — information at the beginning receives more attention.

2. **Use structured formats.** JSON, YAML, and markdown tables are more token-efficient and parseable than natural language descriptions for conveying structured data.

3. **Tag context by category.** Label context blocks as `[REQUIREMENT]`, `[CONSTRAINT]`, `[PREFERENCE]`, `[HISTORY]`, `[REFERENCE]` so agents can quickly identify what's essential vs. supplementary.

4. **Implement progressive disclosure.** Start with high-level context. Inject detailed context only when the task demands it. A code review doesn't need the full project architecture upfront.

5. **Track context freshness.** Attach timestamps to context items. Automatically flag context older than the last significant change as potentially stale.

6. **Never assume context carries over.** Between agent invocations, explicitly pass context. Don't rely on implicit state. Explicit context transfer prevents hallucinated continuity.

7. **Budget context tokens.** Allocate a context budget per task: ~40% for project state, ~30% for task-specific details, ~20% for instructions/rules, ~10% for examples/references.

---

## Integration Points

| Module | Interaction |
|---|---|
| Memory Manager | Persists important context; retrieves historical context |
| Token Optimizer | Compresses context when approaching limits |
| Task Orchestrator | Provides task requirements for context assembly |
| Planning Engine | Receives context for plan generation |
| Quality Checker | Validates that context is consistent and current |
