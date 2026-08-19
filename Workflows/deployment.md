# Deployment Workflow

> **Version**: 1.0.0  
> **Trigger**: `/deploy` command

---

## Flow Diagram

```mermaid
graph TD
    A[Code Ready] --> B[Run Tests]
    B --> C{All Pass?}
    C -->|No| D[Fix Failures]
    D --> B
    C -->|Yes| E[Build Artifacts]
    E --> F[Deploy to Staging]
    F --> G[Smoke Tests]
    G --> H{Staging OK?}
    H -->|No| D
    H -->|Yes| I[Deploy to Production]
    I --> J[Health Checks]
    J --> K{Healthy?}
    K -->|No| L[Rollback]
    K -->|Yes| M[Monitor 30min]
    M --> N{Stable?}
    N -->|No| L
    N -->|Yes| O[✅ Complete]
    L --> P[Investigate & Fix]

    style A fill:#6366F1,color:#fff
    style O fill:#10B981,color:#fff
    style L fill:#EF4444,color:#fff
```

## Pre-Deployment Checklist
- [ ] All tests passing (unit, integration, E2E)
- [ ] Code review approved
- [ ] Security scan clean
- [ ] Database migrations tested
- [ ] Environment variables configured
- [ ] Rollback plan documented
- [ ] Monitoring alerts configured

## Deployment Strategy Options
| Strategy | Risk | Downtime | Complexity | Best For |
|---|---|---|---|---|
| Blue-Green | Low | Zero | Medium | Most deployments |
| Canary | Very Low | Zero | High | High-traffic services |
| Rolling | Low | Zero | Medium | Kubernetes deployments |
| Recreate | High | Yes | Low | Dev/staging only |

## Success Criteria
- [ ] Zero downtime during deployment
- [ ] Health checks passing within 2 minutes
- [ ] No error rate increase after deployment
- [ ] Rollback successful within 5 minutes (if needed)
