# Prompt Optimizer

> **Module**: Core  
> **Version**: 1.0.0  
> **Status**: Active

---

## Purpose

The Prompt Optimizer refines, structures, and enhances prompts to maximize output quality from any LLM interaction. It applies prompt engineering best practices to transform vague requests into precise, well-structured prompts that consistently produce excellent results.

A well-crafted prompt is the difference between a mediocre output and an exceptional one. The Prompt Optimizer ensures every interaction with an LLM is optimized for clarity, specificity, and effectiveness.

---

## Responsibilities

1. **Prompt Structuring** — Organize prompts with clear role definitions, context, instructions, constraints, output format specifications, and examples.

2. **Ambiguity Resolution** — Detect and resolve ambiguous language, missing constraints, and underspecified requirements in prompts.

3. **Example Injection** — Add few-shot examples when they improve output quality. Select examples that demonstrate the desired format, style, and depth.

4. **Constraint Specification** — Ensure all relevant constraints (length, format, style, audience, technical level) are explicitly stated.

5. **Chain-of-Thought Optimization** — Implement step-by-step reasoning chains where complex logic or analysis is required.

6. **Prompt Template Management** — Maintain a library of proven prompt templates for common task types.

---

## Invocation Rules

| Condition | Action |
|---|---|
| User provides vague or underspecified request | Enhance with structure and constraints |
| Complex reasoning task | Add chain-of-thought scaffolding |
| Formatting-sensitive output needed | Add explicit format specification with example |
| Multi-step task | Decompose into sequential prompts |
| Quality of previous output was low | Re-optimize the prompt and retry |
| New prompt template needed | Create and catalog it |

---

## Inputs

| Input | Type | Description |
|---|---|---|
| `raw_prompt` | String | The original, unoptimized prompt |
| `task_type` | Enum | `code`, `analysis`, `creative`, `research`, `review`, `planning` |
| `target_model` | String | The LLM being targeted (affects optimization strategy) |
| `quality_priority` | Enum | `speed`, `balanced`, `quality` |
| `output_format` | String | Desired output format (markdown, JSON, code, etc.) |
| `examples` | Array | Optional few-shot examples |

---

## Outputs

| Output | Type | Description |
|---|---|---|
| `optimized_prompt` | String | Enhanced, structured prompt |
| `optimization_notes` | Array | What was changed and why |
| `expected_quality` | Float | Predicted quality improvement (0.0 - 1.0) |
| `token_estimate` | Integer | Estimated tokens for the optimized prompt |

---

## Optimization Techniques

### 1. Role Priming
```
Before: "Write a function to sort users"
After:  "You are a senior software engineer specializing in 
         performance-critical applications. Write a function 
         to sort users by activity score using an algorithm 
         optimized for datasets of 10K-100K records."
```

### 2. Constraint Specification
```
Before: "Create a landing page"
After:  "Create a landing page with:
         - Hero section with headline, subheadline, CTA
         - 3 feature cards with icons
         - Testimonial carousel (3 quotes)
         - Pricing table (3 tiers)
         - Mobile-responsive, dark mode
         - Use Inter font, #6366F1 primary color
         - Total code under 500 lines"
```

### 3. Output Format Definition
```
Before: "Analyze this code"
After:  "Analyze this code and provide:
         
         ## Summary
         One paragraph overview.
         
         ## Issues Found
         | # | Severity | Line | Issue | Fix |
         |---|----------|------|-------|-----|
         
         ## Positive Patterns
         - List what's done well
         
         ## Recommended Refactors
         1. Specific refactor with before/after code"
```

### 4. Chain-of-Thought
```
Before: "Is this architecture scalable?"
After:  "Evaluate this architecture for scalability. 
         Think step by step:
         1. Identify the current bottleneck points
         2. Estimate the load each component can handle
         3. Determine which components need horizontal scaling
         4. Assess data consistency implications of scaling
         5. Provide a final scalability verdict with specific 
            recommendations"
```

### 5. Few-Shot Examples
```
Before: "Convert this requirement to a user story"
After:  "Convert this requirement to a user story.
         
         Example Input: 'Users need to reset passwords'
         Example Output: 'As a registered user, I want to 
         reset my password via email, so that I can regain 
         access to my account if I forget my credentials.
         
         Acceptance Criteria:
         - User receives reset email within 60 seconds
         - Reset link expires after 24 hours
         - Password must meet complexity requirements
         - Old sessions are invalidated after reset'
         
         Now convert: '[user's requirement]'"
```

---

## Prompt Quality Checklist

- [ ] **Role**: Is the agent's role/expertise clearly defined?
- [ ] **Context**: Is sufficient background provided?
- [ ] **Task**: Is the specific task unambiguously stated?
- [ ] **Constraints**: Are all relevant constraints specified?
- [ ] **Format**: Is the desired output format defined?
- [ ] **Examples**: Would examples improve clarity?
- [ ] **Edge Cases**: Are boundary conditions mentioned?
- [ ] **Quality Bar**: Is the expected quality level communicated?
- [ ] **Length**: Is the prompt comprehensive but not bloated?
- [ ] **Audience**: Is the target audience for the output specified?

---

## Best Practices

1. **Be specific, not verbose.** Precision beats length. "Sort by timestamp descending, limit 50" is better than "Sort them in reverse chronological order, showing a reasonable number of recent items."

2. **Front-load instructions.** Put the most important instructions at the beginning of the prompt. Models pay more attention to early content.

3. **Use delimiters for data.** Separate instructions from data using ``` blocks, XML tags, or --- separators. This prevents instruction-data confusion.

4. **Specify what NOT to do.** Negative constraints ("Don't use deprecated APIs", "Don't include placeholder code") are often as important as positive instructions.

5. **Match prompt complexity to task complexity.** A simple question doesn't need a 500-word prompt. A complex architecture design does.

6. **Test and iterate.** The first prompt is rarely optimal. Keep a log of prompt versions and their output quality.

7. **Use system-level instructions for persistent behavior.** Role definitions and style guidelines belong in system prompts, not repeated in every user message.

---

## Integration Points

| Module | Interaction |
|---|---|
| Token Optimizer | Compresses optimized prompts that exceed token budgets |
| Context Manager | Provides relevant context for prompt enhancement |
| Quality Checker | Evaluates output quality to inform prompt optimization |
| Reflection Engine | Reviews prompt effectiveness and suggests improvements |
| Memory Manager | Stores successful prompt patterns for reuse |
