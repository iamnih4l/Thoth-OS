# Reflection Engine

> **Module**: Core  
> **Version**: 1.0.0  
> **Status**: Active

---

## Purpose

The Reflection Engine enables systematic self-evaluation of outputs, processes, and decisions. It implements metacognitive loops that review what was produced, assess its quality against defined criteria, and generate improvement recommendations. The Reflection Engine transforms Thoth OS from a one-shot system into a self-improving one.

---

## Responsibilities

1. **Output Evaluation** — Assess the quality, completeness, accuracy, and relevance of any generated output against task requirements.

2. **Process Review** — Analyze the approach taken to complete a task. Was the right strategy chosen? Were there more efficient paths?

3. **Assumption Auditing** — Surface implicit assumptions made during task execution. Challenge them. Verify them. Correct them.

4. **Gap Detection** — Identify what's missing from outputs: edge cases not covered, requirements not addressed, quality standards not met.

5. **Improvement Generation** — Produce specific, actionable recommendations for improving outputs and processes.

6. **Learning Extraction** — Distill lessons learned from reflection cycles and send them to the Memory Manager for persistence.

---

## Invocation Rules

| Condition | Action |
|---|---|
| Complex output is generated | Run quality reflection before delivery |
| Plan execution completes | Conduct retrospective reflection |
| User provides negative feedback | Trigger deep reflection on failure mode |
| Confidence is below 80% | Self-reflect before finalizing output |
| Architecture or design decision is made | Reflect on trade-offs and alternatives |
| Multiple solution approaches exist | Comparative reflection on options |

---

## Inputs

| Input | Type | Description |
|---|---|---|
| `output` | Any | The artifact to reflect upon |
| `task_requirements` | Object | Original requirements and success criteria |
| `approach_taken` | String | Description of the method/process used |
| `quality_criteria` | Array | Specific criteria for evaluation |
| `time_budget` | Enum | `quick` (30s), `standard` (2min), `deep` (5min+) |

---

## Outputs

| Output | Type | Description |
|---|---|---|
| `quality_score` | Object | Scores across dimensions (accuracy, completeness, clarity, efficiency) |
| `gaps` | Array | Missing elements, uncovered edge cases |
| `assumptions` | Array | Implicit assumptions with validation status |
| `improvements` | Array | Specific, actionable improvement recommendations |
| `learnings` | Array | Lessons to persist in Memory Manager |
| `confidence` | Float | Overall confidence in the output (0.0 - 1.0) |

---

## Reflection Framework

### Quick Reflection (30 seconds)
```
1. Does the output answer the actual question asked?
2. Is it factually accurate?
3. Is anything obviously missing?
4. Would I be confident sharing this?
```

### Standard Reflection (2 minutes)
```
1. Requirements Coverage
   - Are all explicit requirements addressed?
   - Are implicit requirements considered?
   
2. Quality Check
   - Is the output clear and well-structured?
   - Are there errors, ambiguities, or contradictions?
   - Does it follow established patterns and standards?

3. Completeness
   - Are edge cases handled?
   - Are error scenarios addressed?
   - Is the output self-contained or does it need context?

4. Improvement Potential
   - What's the weakest part?
   - What would a senior expert critique?
   - What would make this exceptional rather than adequate?
```

### Deep Reflection (5+ minutes)
```
All Standard items, plus:

5. Strategic Alignment
   - Does this align with project goals?
   - Does this create technical debt?
   - Will this scale with expected growth?

6. Alternative Analysis
   - What other approaches could have worked?
   - What are the trade-offs of the chosen approach vs alternatives?
   - Would a different approach be better for the long term?

7. Assumption Audit
   - List every assumption made
   - Rate each as: verified / reasonable / risky / unfounded
   - Identify assumptions that could invalidate the output

8. Second-Order Effects
   - How does this affect other parts of the system?
   - What maintenance burden does this create?
   - What precedent does this set?
```

---

## Example Usage

### Scenario: Reflecting on a generated API design

```
Input:
  output: REST API design for user management
  requirements: CRUD operations, pagination, filtering, auth
  approach: Resource-based REST with JWT auth

Reflection Output:
  quality_score:
    accuracy: 0.9
    completeness: 0.75
    clarity: 0.85
    efficiency: 0.8

  gaps:
    - Missing rate limiting specification
    - No mention of CORS configuration
    - Pagination doesn't specify cursor vs offset approach
    - No API versioning strategy defined

  assumptions:
    - "JWT is sufficient" → reasonable, but should mention 
       refresh token strategy
    - "REST is the right pattern" → verified, data is 
       resource-oriented
    - "PostgreSQL handles the scale" → risky without knowing 
       expected user count

  improvements:
    1. Add rate limiting headers (X-RateLimit-*)
    2. Define CORS policy for frontend origins
    3. Use cursor-based pagination for large datasets
    4. Add /v1/ prefix to all routes
    5. Include error response schema (RFC 7807)

  learnings:
    - "Always include rate limiting in API designs"
    - "API versioning should be decided upfront, not retrofitted"

  confidence: 0.78
```

---

## Best Practices

1. **Make reflection proportional to stakes.** Quick reflection for small tasks. Deep reflection for architectural decisions, public APIs, and security-sensitive code.

2. **Reflect from the user's perspective.** Ask "Would the user find this useful, clear, and complete?" not just "Is this technically correct?"

3. **Challenge your own confidence.** High confidence should trigger a brief skepticism check. The Dunning-Kruger effect applies to AI systems too.

4. **Persist learnings.** Every reflection cycle should produce at least one learning worth remembering. Send it to Memory Manager.

5. **Don't reflect in loops.** Reflection should improve output once or twice. If reflection on reflection on reflection is happening, the original approach was wrong. Replan instead.

6. **Use checklists, not intuition.** Structured reflection against defined criteria catches more issues than freeform "does this look right?"

7. **Include positive observations.** Reflection isn't just about finding flaws. Note what was done well and why, so those patterns get reinforced.

---

## Integration Points

| Module | Interaction |
|---|---|
| Quality Checker | Provides quality criteria for reflection |
| Memory Manager | Receives learnings from reflection cycles |
| Planning Engine | Reflection triggers replanning when gaps are significant |
| Context Manager | Provides task context for informed reflection |
| Decision Engine | Reflection informs future decision-making |
