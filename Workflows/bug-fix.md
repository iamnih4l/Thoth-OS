# Bug Fix Workflow

> **Version**: 1.0.0  
> **Trigger**: `/debug` command

---

## Flow Diagram

```mermaid
graph TD
    A[Bug Reported] --> B[Reproduce]
    B --> C{Reproducible?}
    C -->|No| D[Gather More Info]
    D --> B
    C -->|Yes| E[Isolate Root Cause]
    E --> F[Design Fix]
    F --> G[Implement Fix]
    G --> H[Write Regression Test]
    H --> I[Code Review]
    I --> J[Deploy Fix]
    J --> K[Verify in Production]
    K --> L[Document Root Cause]

    style A fill:#EF4444,color:#fff
    style K fill:#10B981,color:#fff
```

## Steps

| Step | Agent | Deliverable | Max Time |
|---|---|---|---|
| Reproduce | QA Engineer | Reproduction steps | 30 min |
| Isolate | Principal Engineer | Root cause analysis | 2 hours |
| Fix | Domain Engineer | Bug fix + regression test | 4 hours |
| Review | Peer Engineer | Approved PR | 1 hour |
| Deploy | DevOps Engineer | Production deployment | 30 min |
| Verify | QA Engineer | Production verification | 30 min |
| Document | Domain Engineer | Post-mortem (if P0/P1) | 30 min |

## Decision Points
1. **Severity Assessment**: P0 (drop everything) vs P1 (next sprint) vs P2 (backlog)
2. **Fix vs Workaround**: Quick fix now + proper fix later, or proper fix now?
3. **Rollback Decision**: If fix introduces new issues, rollback immediately

## Success Criteria
- [ ] Bug is no longer reproducible
- [ ] Regression test prevents recurrence
- [ ] No new bugs introduced by the fix
- [ ] Root cause documented for learning
