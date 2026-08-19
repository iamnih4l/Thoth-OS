---
name: Agent Design
description: Architect and implement AI agent systems — from single agents to multi-agent orchestration — that can reason, plan, use tools, and collaborate to solve complex tasks.
---

# Agent Design

## Purpose
Design AI agents that autonomously accomplish goals by breaking them into steps, using tools, reasoning about results, and adapting their approach. Covers single agents, multi-agent systems, tool use, and orchestration patterns.

## When to Activate
- Building autonomous AI systems that perform multi-step tasks
- Designing tool-using AI agents
- Creating multi-agent collaboration systems
- Implementing agent routing and orchestration

## When NOT to Activate
- Simple prompt-response interactions (use Prompt Engineering)
- Static RAG pipelines without agent loops
- Tasks that don't require planning or tool use

## Workflow
1. **Define agent goals** — What should the agent accomplish?
2. **Design tool set** — What tools does the agent need?
3. **Plan reasoning loop** — How does the agent think, act, observe?
4. **Implement guardrails** — Safety limits, max iterations, fallbacks
5. **Test with scenarios** — Diverse inputs including edge cases
6. **Monitor and evaluate** — Track success rates and failure modes
7. **Iterate** — Refine based on real-world performance

## Checklist
- [ ] Agent goal clearly defined
- [ ] Tools designed with clear input/output schemas
- [ ] Reasoning loop implemented (think → act → observe)
- [ ] Max iteration limit set (prevent infinite loops)
- [ ] Error handling for tool failures
- [ ] Memory/state management designed
- [ ] Evaluation criteria defined
- [ ] Cost estimation completed
- [ ] Safety guardrails in place

## Input Format
```yaml
goal: "What the agent should accomplish"
tools: ["list of available tools"]
constraints: ["max iterations", "cost budget", "time limit"]
pattern: "ReAct | Plan-and-Execute | Multi-Agent"
```

## Output Format
```markdown
## Agent Architecture
### Agent Profile
[Role, capabilities, limitations]
### Tool Definitions
| Tool | Purpose | Input | Output |
### Reasoning Loop
[Flowchart of think → act → observe cycle]
### Multi-Agent Coordination (if applicable)
[Agent interaction patterns]
### Guardrails
[Safety controls and limits]
```

## Examples
### ReAct Agent Pattern
```
Thought: I need to find the user's last order
Action: query_database(user_id=123, table="orders", limit=1)
Observation: Order #456, placed 2024-01-15, status: delivered
Thought: Now I have the info, I can respond
Action: respond("Your last order #456 was delivered on Jan 15")
```

## Edge Cases
- **Infinite loops**: Always set max_iterations. Use cycle detection.
- **Tool hallucination**: Agent may try to call tools that don't exist. Validate tool names.
- **Cost explosion**: Multi-step agents can make many LLM calls. Set cost budgets.
- **Agent confusion**: If the agent is stuck, implement fallback to human escalation.

## References
- Core Module: Task Orchestrator (`Core/task-orchestrator.md`)
- AI Engineer Agent (`Agents/Engineering/ai-engineer.md`)
