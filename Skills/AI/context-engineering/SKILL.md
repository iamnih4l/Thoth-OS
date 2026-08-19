---
name: Context Engineering
description: Design and optimize the context provided to LLMs to maximize output quality while minimizing token usage and cost.
---

# Context Engineering

## Purpose
Systematically design what information an LLM receives as context to produce the best possible outputs. Context engineering is the art of giving the model exactly what it needs — no more, no less.

## When to Activate
- Designing system prompts or agent instructions
- Context window is near capacity
- Output quality varies due to inconsistent context
- Building multi-turn conversation systems
- Optimizing cost by reducing token usage

## When NOT to Activate
- Simple, single-turn queries with minimal context needs
- Tasks where context is fixed and already optimized

## Workflow
1. **Audit** — List all context an LLM currently receives
2. **Classify** — Categorize as essential, helpful, or unnecessary
3. **Prioritize** — Rank essential context by impact on output quality
4. **Structure** — Organize context in optimal order (important first)
5. **Compress** — Reduce token usage without losing information
6. **Test** — Validate output quality with optimized context
7. **Monitor** — Track context efficiency over time

## Checklist
- [ ] All context sources identified
- [ ] Context classified by importance
- [ ] Irrelevant context removed
- [ ] Context ordered by importance (front-loaded)
- [ ] Structured format used (JSON/YAML over prose where appropriate)
- [ ] Token budget allocated per context category
- [ ] Tested with minimal context to find true essentials
- [ ] Progressive disclosure implemented for complex tasks

## Input Format
```yaml
current_context: "All context currently provided to the LLM"
task_type: "The type of task the LLM performs"
token_budget: "Maximum tokens available for context"
quality_issues: "Known output quality problems"
```

## Output Format
```markdown
## Context Design
### Context Architecture
[Diagram showing context flow and priority]
### Token Budget Allocation
| Category | Tokens | Priority | Content |
|---|---|---|---|
### Optimization Results
| Metric | Before | After |
|---|---|---|
| Total tokens | X | Y |
| Output quality | X/10 | Y/10 |
| Cost per query | $X | $Y |
```

## Examples
### Context Priority Stack
```
Priority 1 (Always include): System instructions, task definition
Priority 2 (Include when relevant): User preferences, project context
Priority 3 (Include on demand): Examples, references, history
Priority 4 (Compress or exclude): Verbose logs, full file contents
```

## Edge Cases
- **Context poisoning**: Irrelevant context can degrade output quality. Less is often more.
- **Recency bias**: Models pay more attention to recent context. Put critical info at the start AND end.
- **Context window overflow**: Implement graceful degradation — summarize oldest context first.

## References
- Core Module: Context Manager (`Core/context-manager.md`)
- Core Module: Token Optimizer (`Core/token-optimizer.md`)
