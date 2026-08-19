# Decision Engine

> **Module**: Core  
> **Version**: 1.0.0  
> **Status**: Active

---

## Purpose

The Decision Engine provides a structured framework for making technical, strategic, and architectural decisions. It eliminates analysis paralysis by applying systematic evaluation criteria, documenting trade-offs, and producing clear recommendations with supporting rationale.

Every undocumented decision is a future mystery. Every unmade decision is a current bottleneck. The Decision Engine addresses both.

---

## Responsibilities

1. **Decision Framing** — Structure ambiguous choices into clear decision problems with defined options, criteria, and constraints.

2. **Option Evaluation** — Systematically assess each option against weighted criteria using decision matrices, trade-off analysis, and comparative frameworks.

3. **Trade-off Documentation** — Explicitly document what is gained and sacrificed with each option. No decision is free; make the cost visible.

4. **Recommendation Generation** — Produce clear, defensible recommendations with supporting evidence and rationale.

5. **Decision Recording** — Capture every significant decision as an Architecture Decision Record (ADR) for the Memory Manager.

6. **Precedent Checking** — Verify consistency with past decisions. Flag when a new decision contradicts or conflicts with established patterns.

---

## Invocation Rules

| Condition | Action |
|---|---|
| Technology selection required | Run comparison matrix |
| Multiple valid approaches exist | Perform trade-off analysis |
| Architecture pattern selection | Generate ADR |
| User asks "should I..." or "which..." | Activate decision framework |
| Conflicting requirements detected | Resolve with stakeholder priorities |
| Decision has long-term implications | Require deep analysis |

---

## Inputs

| Input | Type | Description |
|---|---|---|
| `decision_question` | String | Clear statement of what needs to be decided |
| `options` | Array | Available options/alternatives |
| `criteria` | Array | Evaluation criteria with weights |
| `constraints` | Array | Hard constraints that eliminate options |
| `context` | Object | Project context from Context Manager |
| `past_decisions` | Array | Relevant past decisions from Memory Manager |
| `stakeholder_priorities` | Object | Who cares about what, and how much |

---

## Outputs

| Output | Type | Description |
|---|---|---|
| `recommendation` | Object | Recommended option with confidence level |
| `decision_matrix` | Object | Scored matrix of all options vs criteria |
| `trade_off_summary` | String | What you gain and lose with the recommendation |
| `adr` | Object | Architecture Decision Record |
| `risks` | Array | Risks of the recommended option |
| `reversibility` | Enum | `easily_reversible`, `costly_to_reverse`, `irreversible` |

---

## Decision Matrix Template

| Criteria | Weight | Option A | Option B | Option C |
|---|---|---|---|---|
| Performance | 0.25 | ⭐⭐⭐⭐ (4) | ⭐⭐⭐ (3) | ⭐⭐⭐⭐⭐ (5) |
| Developer Experience | 0.20 | ⭐⭐⭐⭐⭐ (5) | ⭐⭐⭐ (3) | ⭐⭐ (2) |
| Ecosystem / Community | 0.20 | ⭐⭐⭐⭐⭐ (5) | ⭐⭐⭐⭐ (4) | ⭐⭐⭐ (3) |
| Scalability | 0.15 | ⭐⭐⭐ (3) | ⭐⭐⭐⭐ (4) | ⭐⭐⭐⭐⭐ (5) |
| Learning Curve | 0.10 | ⭐⭐⭐⭐ (4) | ⭐⭐⭐ (3) | ⭐⭐ (2) |
| Cost | 0.10 | ⭐⭐⭐⭐⭐ (5) | ⭐⭐⭐ (3) | ⭐⭐ (2) |
| **Weighted Score** | | **4.30** | **3.35** | **3.45** |

**Recommendation**: Option A  
**Confidence**: 85%

---

## ADR Format

```markdown
# ADR-[NUMBER]: [Decision Title]

## Status
Proposed | Accepted | Deprecated | Superseded by ADR-XXX

## Context
What is the issue that we're seeing that is motivating this decision?

## Decision
What is the change that we're proposing and/or doing?

## Options Considered
### Option 1: [Name]
- Pros: ...
- Cons: ...

### Option 2: [Name]
- Pros: ...
- Cons: ...

## Consequences
### Positive
- ...

### Negative
- ...

### Risks
- ...

## Reversibility
How easily can this decision be reversed?
```

---

## Example Usage

### Scenario: Choosing a frontend framework

```
Decision Question: "Which frontend framework for our B2B SaaS dashboard?"

Options: React, Vue.js, Svelte, Angular

Constraints:
  - Must support TypeScript
  - Must have mature component library ecosystem
  - Team has React experience

Criteria (weighted):
  - Team familiarity (0.25)
  - Component ecosystem (0.20)
  - Performance (0.20)
  - TypeScript support (0.15)
  - Hiring pool (0.10)
  - Bundle size (0.10)

Decision Matrix Result:
  React:   4.15 (winner)
  Vue.js:  3.50
  Svelte:  3.25
  Angular: 3.10

Recommendation: React
Rationale: Team already knows React (0 ramp-up time), largest 
  component ecosystem (shadcn, Radix, MUI), excellent TypeScript 
  support, largest hiring pool. Performance gap vs Svelte is 
  marginal for dashboard workloads.

Trade-offs:
  Gain: Team velocity, ecosystem depth, hiring flexibility
  Lose: Svelte's smaller bundle size, Vue's simpler mental model

Reversibility: Costly to reverse (full rewrite)

ADR-001 recorded in Memory Manager.
```

---

## Best Practices

1. **Make the irreversible decisions carefully, and the reversible ones quickly.** Spend 80% of your decision time on the 20% of decisions that are hard to undo.

2. **Weight criteria explicitly.** Unweighted comparisons treat all criteria as equally important, which they never are. Force prioritization.

3. **Include "do nothing" as an option.** Sometimes the best decision is to defer. Make this an explicit option and evaluate it against the same criteria.

4. **Separate must-haves from nice-to-haves.** Hard constraints eliminate options. Weighted criteria rank what remains. Don't mix the two.

5. **Document the rejected options.** Future you will wonder "why didn't we use X?" The answer should be in the ADR, not in someone's fading memory.

6. **Check for anchoring bias.** If one option was considered first or has a champion, deliberately strengthen the case for alternatives before scoring.

7. **Set a decision deadline.** Timeboxed decisions prevent analysis paralysis. For reversible decisions, a good decision now beats a perfect decision next week.

---

## Integration Points

| Module | Interaction |
|---|---|
| Memory Manager | Stores ADRs; retrieves past decisions for consistency |
| Planning Engine | Decisions unblock planning; plans generate decision points |
| Reflection Engine | Reflects on decision quality and outcomes |
| Context Manager | Provides project context for informed decisions |
| Quality Checker | Validates decisions against architectural standards |
