---
name: LLM Evaluation
description: Systematically evaluate LLM outputs for quality, accuracy, safety, and cost-effectiveness using automated and human evaluation methods.
---

# LLM Evaluation

## Purpose
Measure and compare LLM performance across dimensions like accuracy, relevance, safety, and cost to make informed model selection and prompt optimization decisions.

## When to Activate
- Comparing models for a specific use case
- Validating prompt changes haven't degraded quality
- Building evaluation pipelines for production AI systems
- Benchmarking fine-tuned models against base models

## When NOT to Activate
- One-off queries where informal assessment suffices
- Non-AI tasks

## Workflow
1. **Define metrics** — What dimensions matter for this use case?
2. **Create eval dataset** — Representative test cases with expected outputs
3. **Run evaluations** — Automated scoring + human review
4. **Compare results** — Statistical analysis across models/prompts
5. **Decide** — Select best model/prompt based on data
6. **Monitor** — Continuous evaluation in production

## Checklist
- [ ] Evaluation metrics defined (accuracy, relevance, safety, cost, latency)
- [ ] Eval dataset created (50+ diverse test cases)
- [ ] Ground truth / reference answers established
- [ ] Automated scoring implemented
- [ ] Human evaluation protocol designed
- [ ] Statistical significance considered
- [ ] Cost-per-query included in comparison

## Input Format
```yaml
models: ["gpt-4o", "claude-sonnet", "gemini-pro"]
eval_dataset: "Path to evaluation dataset"
metrics: ["accuracy", "relevance", "groundedness", "latency", "cost"]
judge_model: "gpt-4o (for LLM-as-judge)"
```

## Output Format
```markdown
## Evaluation Report
### Results Summary
| Model | Accuracy | Relevance | Safety | Latency | Cost/Query |
### Detailed Analysis
[Per-metric breakdown with examples]
### Recommendation
[Which model/prompt to use and why]
```

## Edge Cases
- **LLM-as-judge bias**: Judges may favor their own model family. Use cross-model judging.
- **Eval data contamination**: Ensure eval data wasn't in training data.
- **Metric gaming**: Optimize for user value, not just metric scores.

## References
- AI Engineer Agent (`Agents/Engineering/ai-engineer.md`)
- Prompt Engineering skill (`Skills/AI/prompt-engineering/SKILL.md`)
