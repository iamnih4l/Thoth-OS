# Software Development Workflow

> **Version**: 1.0.0  
> **Trigger**: `/build` command

---

## Flow Diagram

```mermaid
graph TD
    A[Requirements] --> B[Design & Architecture]
    B --> C[Implementation Plan]
    C --> D[Sprint Execution]
    D --> E[Code Review]
    E --> F{Approved?}
    F -->|No| D
    F -->|Yes| G[Testing]
    G --> H{Tests Pass?}
    H -->|No| D
    H -->|Yes| I[Staging Deploy]
    I --> J[QA Verification]
    J --> K{QA Pass?}
    K -->|No| D
    K -->|Yes| L[Production Deploy]
    L --> M[Monitor]

    style A fill:#6366F1,color:#fff
    style L fill:#10B981,color:#fff
```

## Phases

### Phase 1: Requirements & Design
**Agents**: Product Manager, Software Architect, CTO
- Write PRD → Design architecture → Define API contracts → Create sprint plan

### Phase 2: Implementation
**Agents**: Backend Engineer, Frontend Engineer, Flutter Engineer
- Set up project → Implement features → Write tests → Code review

### Phase 3: Quality & Deploy
**Agents**: QA Engineer, Security Engineer, DevOps Engineer
- Run test suite → Security review → Stage → Deploy → Monitor

## Success Criteria
- [ ] All acceptance criteria met
- [ ] Test coverage >80% on core modules
- [ ] No critical or high severity bugs
- [ ] Security review passed
- [ ] Performance within acceptable limits
- [ ] Documentation updated

## Automation Opportunities
| Process | Tool |
|---|---|
| CI/CD | GitHub Actions |
| Code review | Automated linting + PR reviews |
| Testing | Automated test suite in CI |
| Deployment | Automated deploy pipeline |
| Monitoring | Automated alerting |
