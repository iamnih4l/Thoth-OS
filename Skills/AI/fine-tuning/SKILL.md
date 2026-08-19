---
name: Fine-Tuning
description: Fine-tune LLMs on custom datasets to improve task-specific performance, reduce latency, and lower costs for specialized use cases.
---

# Fine-Tuning

## Purpose
Customize pre-trained LLMs for specific tasks by training on curated datasets, improving quality and reducing per-query costs for high-volume, specialized applications.

## When to Activate
- Prompt engineering can't achieve required quality
- High-volume task with consistent format (classification, extraction, formatting)
- Need to reduce latency and cost per query
- Want to embed domain-specific knowledge or style

## When NOT to Activate
- Prompt engineering achieves acceptable results
- Task requires frequently updated knowledge (use RAG)
- Insufficient training data (<100 high-quality examples)
- One-off or infrequent tasks

## Workflow
1. **Evaluate necessity** — Can prompt engineering solve this?
2. **Prepare dataset** — Collect, clean, and format training examples
3. **Split data** — Train (80%) / Validation (10%) / Test (10%)
4. **Choose base model** — Select model appropriate for task
5. **Configure training** — Set hyperparameters
6. **Train** — Run fine-tuning job
7. **Evaluate** — Test against held-out data and compare to base model
8. **Deploy** — Serve the fine-tuned model
9. **Monitor** — Track quality over time

## Checklist
- [ ] Prompt engineering baseline established
- [ ] 100+ high-quality training examples prepared
- [ ] Data format matches provider requirements (JSONL)
- [ ] Dataset reviewed for quality and consistency
- [ ] Validation set created for evaluation
- [ ] Base model selected
- [ ] Hyperparameters configured
- [ ] Evaluation metrics defined
- [ ] Cost-benefit analysis completed

## Input Format
```yaml
task: "Specific task to fine-tune for"
dataset_size: "Number of training examples"
base_model: "gpt-4o-mini | llama-3 | mistral"
provider: "OpenAI | Together | Anyscale"
budget: "Training cost budget"
```

## Output Format
```markdown
## Fine-Tuning Report
### Dataset Stats
| Metric | Value |
### Training Config
| Parameter | Value |
### Results
| Metric | Base Model | Fine-Tuned | Improvement |
### Cost Analysis
| Factor | Base Model | Fine-Tuned |
| Cost per 1K queries | $X | $Y |
| Latency (p50) | Xms | Yms |
### Deployment
[Serving configuration]
```

## Edge Cases
- **Overfitting**: Monitor validation loss. Use early stopping.
- **Catastrophic forgetting**: Fine-tuned model loses general capabilities.
- **Data quality > quantity**: 100 perfect examples > 10,000 noisy ones.
- **Distribution shift**: Model degrades when real inputs differ from training data.

## References
- ML Engineer Agent (`Agents/Engineering/ml-engineer.md`)
- LLM Evaluation skill (`Skills/AI/llm-evaluation/SKILL.md`)
