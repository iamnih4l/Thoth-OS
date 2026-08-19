---
name: Threat Modeling
description: Systematically identify, prioritize, and mitigate security threats using STRIDE, DREAD, or attack tree methodologies.
---

# Threat Modeling

## Purpose
Proactively identify potential security threats and design mitigations before they become vulnerabilities.

## When to Activate
- New system or feature design
- Security architecture review
- Compliance requirements

## When NOT to Activate
- Trivial internal tools
- Already-completed threat assessments

## Workflow
1. **Understand** - Analyze requirements and constraints
2. **Plan** - Design the approach
3. **Implement** - Build with best practices
4. **Validate** - Test and verify
5. **Document** - Capture decisions and usage
6. **Review** - Quality assurance

## Checklist
- [ ] Requirements understood
- [ ] Approach designed
- [ ] Best practices applied
- [ ] Edge cases handled
- [ ] Tests or validation complete
- [ ] Documentation updated

## Input Format
```yaml
task: 'Task description'
context: 'Project context'
```

## Output Format
```markdown
## Implementation
[Production-ready output]
```

## Examples
See workflow for standard usage patterns.

## Edge Cases
- Handle boundary conditions and error scenarios
- Consider scale, security, and performance implications

## References
- Related Thoth OS skills and agents
