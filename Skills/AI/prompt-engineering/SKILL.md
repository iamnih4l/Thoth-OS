---
name: Prompt Engineering
description: Design, optimize, and iterate on prompts for LLMs to maximize output quality, consistency, and efficiency across all task types.
---

# Prompt Engineering

## Purpose

Craft effective prompts that consistently produce high-quality outputs from LLMs. This skill covers prompt structure, optimization techniques, common patterns, and evaluation methods for all prompt types — from simple queries to complex multi-step reasoning chains.

---

## When to Activate

- Writing or optimizing prompts for any LLM interaction
- Output quality is inconsistent or below expectations
- Building prompt templates for repeated tasks
- Designing system prompts for agents or assistants
- Creating few-shot examples for specific tasks
- Implementing chain-of-thought reasoning

## When NOT to Activate

- Task requires no LLM interaction
- Simple, one-off questions that don't need optimization
- Model fine-tuning (use Fine Tuning skill instead)

---

## Workflow

1. **Define the task** — What exactly should the LLM produce?
2. **Identify the audience** — Who consumes the output?
3. **Structure the prompt** — Role + Context + Task + Constraints + Format + Examples
4. **Add guardrails** — Negative constraints, edge case handling
5. **Test with examples** — Run the prompt against diverse inputs
6. **Iterate** — Refine based on output quality
7. **Document** — Capture the final prompt template with usage notes

---

## Checklist

- [ ] Role/persona defined for the LLM
- [ ] Task clearly and unambiguously stated
- [ ] Output format explicitly specified
- [ ] Constraints and boundaries set
- [ ] Few-shot examples included (if beneficial)
- [ ] Negative instructions added (what NOT to do)
- [ ] Edge cases addressed
- [ ] Prompt tested against 3+ diverse inputs
- [ ] Token usage is reasonable for the task

---

## Input Format

```yaml
task: "Description of what the prompt should accomplish"
model: "Target LLM (GPT-4, Claude, Gemini, etc.)"
output_format: "Expected output structure"
constraints: ["constraint 1", "constraint 2"]
examples: ["example input/output pairs"]
quality_priority: "speed | balanced | quality"
```

---

## Output Format

```markdown
## Optimized Prompt

### System Prompt
[system-level instructions]

### User Prompt Template
[template with {{variables}}]

### Few-Shot Examples
[input/output pairs]

### Usage Notes
- When to use this prompt
- Common failure modes
- Optimization tips
```

---

## Examples

### Example 1: Code Review Prompt
```
System: You are a senior software engineer conducting a code review. 
Focus on correctness, security, performance, and readability. 
Be specific with line numbers. Provide fix suggestions, not just findings.

User: Review this code:
```{{code}}```

Output format:
## Summary (1 paragraph)
## Issues (table: Severity | Line | Issue | Fix)
## Positive Patterns (bullet list)
## Refactoring Suggestions (numbered, with before/after)
```

### Example 2: Chain-of-Thought for Analysis
```
Analyze this business model. Think step by step:
1. First, identify the target customer segment
2. Then, evaluate the value proposition
3. Assess the revenue model sustainability
4. Identify the key risks
5. Provide your final assessment with a confidence score
```

---

## Edge Cases

- **Model-specific behavior**: Different models respond differently to the same prompt. Test across target models.
- **Token limits**: Long system prompts reduce response capacity. Compress where possible.
- **Prompt injection**: For user-facing prompts, add input sanitization and delimiter-based data separation.
- **Stochastic outputs**: For deterministic needs, set temperature to 0 and use explicit formatting constraints.
- **Multi-language**: Specify output language explicitly if the input may be in different languages.

---

## References

- [OpenAI Prompt Engineering Guide](https://platform.openai.com/docs/guides/prompt-engineering)
- [Anthropic Prompt Engineering](https://docs.anthropic.com/claude/docs/prompt-engineering)
- [Google Prompt Engineering](https://ai.google.dev/docs/prompt_best_practices)
- Core Module: Prompt Optimizer (`Core/prompt-optimizer.md`)
