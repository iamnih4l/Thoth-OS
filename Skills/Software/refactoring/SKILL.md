---
name: Refactoring
description: Improve code structure and design without changing external behavior, systematically reducing technical debt and improving maintainability.
---

# Refactoring

## Purpose
Restructure existing code to improve readability, reduce complexity, and enable future changes without altering functionality.

## When to Activate
- Code smells identified
- Technical debt paydown
- Before adding features to messy code
- Post-MVP cleanup

## When NOT to Activate
- Code that works and won't need changes
- During critical production incidents (fix first, refactor later)

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
