# Quality Checker

> **Module**: Core  
> **Version**: 1.0.0  
> **Status**: Active

---

## Purpose

The Quality Checker enforces quality standards across all outputs in Thoth OS — code, documentation, architecture designs, plans, and content. It acts as an automated code reviewer, linter, and quality gate that catches issues before they reach the user.

Quality is not a phase. It's a continuous process integrated into every step. The Quality Checker makes quality a systemic property, not an individual responsibility.

---

## Responsibilities

1. **Code Quality Assessment** — Evaluate code for correctness, readability, maintainability, performance, and security. Apply language-specific best practices and project conventions.

2. **Documentation Quality** — Verify docs are complete, accurate, well-structured, and up-to-date relative to the code they describe.

3. **Architecture Quality** — Assess designs for scalability, maintainability, separation of concerns, and alignment with established patterns.

4. **Output Completeness** — Verify that all requirements are addressed, edge cases are handled, and error scenarios are covered.

5. **Standards Enforcement** — Apply workspace rules from AGENTS.md, project conventions, and industry best practices consistently.

6. **Security Scanning** — Check for common vulnerabilities: injection flaws, exposed secrets, insecure defaults, missing validation.

---

## Invocation Rules

| Condition | Action |
|---|---|
| Code is generated or modified | Run code quality checks |
| Documentation is produced | Run documentation quality checks |
| Architecture design is proposed | Run architecture quality review |
| Before delivery to user | Run final quality gate |
| Security-sensitive code is written | Run security scan |
| Test code is generated | Verify test quality and coverage |

---

## Inputs

| Input | Type | Description |
|---|---|---|
| `artifact` | Any | The output to evaluate |
| `artifact_type` | Enum | `code`, `documentation`, `architecture`, `plan`, `content` |
| `requirements` | Object | Original requirements for completeness checking |
| `standards` | Object | Applicable quality standards and conventions |
| `check_level` | Enum | `quick`, `standard`, `thorough` |

---

## Outputs

| Output | Type | Description |
|---|---|---|
| `quality_report` | Object | Comprehensive quality assessment |
| `issues` | Array | Found issues with severity, location, and fix suggestion |
| `score` | Object | Quality scores by dimension |
| `pass` | Boolean | Whether the artifact meets minimum quality threshold |
| `fixes` | Array | Auto-generated fixes for common issues |

---

## Quality Dimensions

### Code Quality Rubric

| Dimension | Weight | Criteria |
|---|---|---|
| **Correctness** | 0.25 | Does it work? Logic errors, off-by-one, null handling |
| **Security** | 0.20 | Input validation, injection prevention, auth checks |
| **Readability** | 0.15 | Naming, structure, comments, cognitive complexity |
| **Maintainability** | 0.15 | Modularity, coupling, cohesion, testability |
| **Performance** | 0.10 | Algorithmic efficiency, unnecessary work, memory usage |
| **Error Handling** | 0.10 | Edge cases, graceful degradation, error messages |
| **Testing** | 0.05 | Test coverage, test quality, edge case coverage |

### Documentation Quality Rubric

| Dimension | Weight | Criteria |
|---|---|---|
| **Accuracy** | 0.30 | Does the doc match the code? |
| **Completeness** | 0.25 | Are all features/APIs documented? |
| **Clarity** | 0.20 | Can the target audience understand it? |
| **Examples** | 0.15 | Are there working, copy-pasteable examples? |
| **Structure** | 0.10 | Logical organization, scanability |

---

## Checklist Templates

### Code Review Checklist
```
Correctness
- [ ] Logic handles all specified requirements
- [ ] Edge cases are handled (null, empty, boundary values)
- [ ] Error paths return meaningful error messages
- [ ] No unreachable code or dead branches

Security
- [ ] All user inputs are validated and sanitized
- [ ] No hardcoded secrets or credentials
- [ ] SQL uses parameterized queries
- [ ] Authentication/authorization checks present where needed
- [ ] No sensitive data in logs or error messages

Readability
- [ ] Variable/function names are descriptive
- [ ] Functions are < 30 lines (ideally < 15)
- [ ] No deeply nested code (max 3 levels)
- [ ] Comments explain "why", not "what"

Maintainability
- [ ] Single Responsibility Principle followed
- [ ] No copy-paste duplication
- [ ] Dependencies are injected, not hardcoded
- [ ] Configuration is externalized

Performance
- [ ] No N+1 query patterns
- [ ] No unnecessary database calls in loops
- [ ] Large lists use pagination
- [ ] Expensive computations are cached where appropriate

Testing
- [ ] Happy path tested
- [ ] Error paths tested
- [ ] Edge cases tested
- [ ] Mocks are used for external dependencies
```

---

## Example Usage

### Scenario: Quality checking a generated API handler

```
Input: Express route handler for user registration

Quality Report:
  overall_score: 0.72 (NEEDS IMPROVEMENT)

  issues:
    - severity: HIGH
      location: line 15
      issue: "Password stored without hashing"
      fix: "Use bcrypt.hash(password, 12) before storage"

    - severity: HIGH
      location: line 8
      issue: "No input validation on email field"
      fix: "Add email validation using validator.isEmail()"

    - severity: MEDIUM
      location: line 22
      issue: "Error returns stack trace to client"
      fix: "Return generic error message, log stack trace server-side"

    - severity: LOW
      location: line 5
      issue: "Magic number 12 for salt rounds"
      fix: "Extract to config: BCRYPT_SALT_ROUNDS=12"

  scores:
    correctness: 0.80
    security: 0.45  ← Fails minimum threshold
    readability: 0.85
    maintainability: 0.75
    performance: 0.90
    error_handling: 0.55

  pass: false (security below 0.70 threshold)
```

---

## Best Practices

1. **Fail fast on security issues.** Security findings above MEDIUM severity should block delivery. No exceptions.

2. **Be specific in issue reports.** "Code could be better" is useless. "Line 15: password stored in plaintext; use bcrypt.hash()" is actionable.

3. **Provide fixes, not just findings.** Every issue should come with a concrete fix suggestion. Finding problems is easy; solving them is valuable.

4. **Calibrate severity accurately.** Not every issue is critical. Over-alarming causes alert fatigue. Under-reporting causes security breaches.

5. **Check against project standards first.** Project-specific conventions trump generic best practices when they conflict.

6. **Run incrementally.** Check new/modified code, not the entire codebase every time. Incremental quality checks are sustainable; full scans are not.

7. **Track quality trends.** Quality should improve over time. If it's declining, flag the trend for the Reflection Engine to analyze.

---

## Integration Points

| Module | Interaction |
|---|---|
| Reflection Engine | Receives quality reports for deeper analysis |
| Context Manager | Provides project standards and conventions |
| Memory Manager | Stores quality patterns and recurring issues |
| Documentation Generator | Validates generated documentation quality |
| Task Orchestrator | Quality gate before task completion |
| Prompt Optimizer | Adapts prompts based on common quality failures |
