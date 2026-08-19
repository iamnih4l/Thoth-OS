---
name: AI Orchestration
description: Design and implement multi-model, multi-step AI pipelines that coordinate between different LLMs, tools, and services for complex tasks.
---

# AI Orchestration

## Purpose
Build production AI pipelines that chain multiple LLM calls, tool uses, and conditional logic into reliable, cost-effective workflows for complex tasks.

## When to Activate
- Task requires multiple LLM calls in sequence
- Different models needed for different sub-tasks
- Complex workflows with branching logic
- Building production AI features with reliability requirements

## When NOT to Activate
- Single LLM call suffices
- Simple prompt engineering handles the task

## Workflow
1. **Map the pipeline** — Define steps, inputs, outputs, and dependencies
2. **Select models per step** — Match model capability to step complexity
3. **Design routing logic** — Conditional branching and fallbacks
4. **Implement error handling** — Retries, timeouts, fallback models
5. **Add observability** — Logging, tracing, cost tracking
6. **Test end-to-end** — Full pipeline validation
7. **Deploy and monitor** — Production deployment with alerting

## Checklist
- [ ] Pipeline steps mapped with I/O contracts
- [ ] Model selected per step (cost vs quality)
- [ ] Error handling and retries implemented
- [ ] Fallback models configured
- [ ] Cost tracking per pipeline run
- [ ] Latency budget allocated per step
- [ ] End-to-end tests passing
- [ ] Observability and logging in place

## Orchestration Patterns
| Pattern | Use Case | Example |
|---|---|---|
| Sequential | Steps depend on previous output | Summarize → Translate → Format |
| Parallel Fan-out | Independent sub-tasks | Analyze sentiment + Extract entities + Classify topic |
| Router | Different models for different inputs | Simple→GPT-Mini, Complex→GPT-4o |
| Evaluator Loop | Quality gate with retry | Generate → Evaluate → Accept/Retry |
| Map-Reduce | Process large datasets | Chunk→Summarize each→Combine summaries |

## Edge Cases
- **Cascading failures**: One step's failure propagates. Implement circuit breakers.
- **Cost explosion**: Monitor cumulative cost per pipeline run. Set hard limits.
- **Latency accumulation**: Sequential steps compound latency. Parallelize where possible.

## References
- Agent Design skill (`Skills/AI/agent-design/SKILL.md`)
- Core Module: Task Orchestrator (`Core/task-orchestrator.md`)
