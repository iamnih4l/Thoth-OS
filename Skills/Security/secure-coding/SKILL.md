---
name: Secure Coding
description: Write code that is resistant to common vulnerabilities including injection, XSS, CSRF, and insecure deserialization.
---

# Secure Coding

## Purpose
Apply secure coding practices to prevent vulnerabilities at the source code level.

## When to Activate
- All code writing tasks
- Security-sensitive features (auth, payments)
- Code review for security

## When NOT to Activate
- Throwaway prototypes (though good habits help)

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
