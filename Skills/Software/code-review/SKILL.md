---
name: Code Review
description: Conduct thorough, constructive code reviews that improve code quality, share knowledge, and catch bugs before they reach production.
---

# Code Review

## Purpose
Systematically evaluate code for correctness, security, performance, readability, and maintainability.

## When to Activate
- Pull request reviews
- Self-review before submitting code
- Establishing review standards
- Audit of existing codebases

## When NOT to Activate
- Reviewing auto-generated boilerplate
- Trivial formatting-only changes

## Workflow
1. **Understand** - Analyze requirements and constraints
2. **Plan** - Design the approach with appropriate patterns
3. **Implement** - Build using best practices
4. **Validate** - Test against requirements and edge cases
5. **Document** - Capture decisions and usage instructions
6. **Review** - Self-review for quality and completeness

## Checklist
- [ ] Requirements clearly understood
- [ ] Approach designed before implementation
- [ ] Best practices applied
- [ ] Edge cases handled
- [ ] Tests written for critical paths
- [ ] Documentation updated
- [ ] Code reviewed for quality

## Input Format
```yaml
task: 'Description of what needs to be accomplished'
context: 'Relevant project context'
constraints: ['constraint 1', 'constraint 2']
```

## Output Format
```markdown
## Implementation
### Approach
[Chosen approach with rationale]
### Code/Content
[Production-ready output]
### Testing
[Verification steps]
### Documentation
[Usage documentation]
```

## Examples
### Example 1
See workflow for standard usage pattern.

## Edge Cases
- Consider boundary conditions
- Handle error scenarios gracefully
- Account for scale and performance

## References
- Related skills and agents within Thoth OS
- Industry documentation and best practices
