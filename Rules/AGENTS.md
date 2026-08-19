# Thoth OS — Global Rules

> These rules apply to every agent, skill, workflow, and interaction within the Thoth OS workspace.

---

## Philosophy

1. **Think before coding.** Always analyze requirements, consider edge cases, and plan your approach before writing a single line. If a task is complex, produce a brief plan first.
2. **Optimize for scalability.** Every solution should handle 10x growth without fundamental rewrites. Consider data volume, user load, and system complexity.
3. **Prefer modular solutions.** Break systems into composable, single-responsibility components. Avoid monoliths. Each module should be independently testable and deployable.
4. **Default to secure implementations.** Never store secrets in code. Validate all inputs. Use parameterized queries. Apply the principle of least privilege. Assume all external input is hostile.
5. **Produce production-ready outputs.** No placeholder code, no TODO comments left unresolved, no mock data in final outputs. Every deliverable should be deployable as-is.

---

## Code Standards

6. **Write clean, self-documenting code.** Use descriptive names. Keep functions short. Follow the Single Responsibility Principle. If a comment is needed to explain *what* the code does, the code should be rewritten.
7. **Handle errors gracefully.** Never swallow exceptions. Provide meaningful error messages. Implement proper fallbacks. Log errors with sufficient context for debugging.
8. **Test everything meaningful.** Write unit tests for business logic. Write integration tests for APIs. Write E2E tests for critical user flows. Aim for >80% coverage on core modules.
9. **Document as you build.** Every public API needs documentation. Every architectural decision needs a rationale. Every non-obvious implementation needs inline explanation of *why*.
10. **Follow language conventions.** Use idiomatic patterns for the target language. Follow official style guides (PEP 8 for Python, Airbnb for JS/TS, Effective Go for Go).

---

## Architecture

11. **Generate diagrams whenever architecture is discussed.** Use Mermaid for flow diagrams, sequence diagrams, ERDs, and system architecture. Visuals are non-negotiable for architectural communication.
12. **Separate concerns ruthlessly.** Data access, business logic, and presentation must live in distinct layers. Never mix database queries with UI rendering.
13. **Design for observability.** Every service should emit structured logs, metrics, and traces. Use correlation IDs across service boundaries. Make debugging in production possible.
14. **API-first design.** Define contracts before implementation. Use OpenAPI/Swagger for REST. Use schema definitions for GraphQL. Version APIs from day one.
15. **Prefer composition over inheritance.** Use interfaces, mixins, and dependency injection. Deep inheritance hierarchies are a maintenance burden.

---

## Decision Making

16. **Challenge assumptions.** Question every requirement. Ask "why" before "how." Validate that the problem is worth solving before architecting the solution.
17. **Explain trade-offs explicitly.** Every technical decision involves trade-offs. State what you gain, what you sacrifice, and why the trade-off is acceptable. Use comparison tables for major decisions.
18. **Use data to decide.** Prefer benchmarks over intuition. Profile before optimizing. Measure before declaring success. Evidence-based decisions outperform opinion-based ones.
19. **Fail fast, recover gracefully.** Validate inputs at system boundaries. Use circuit breakers for external dependencies. Implement retry logic with exponential backoff.

---

## Communication

20. **Be concise but complete.** Eliminate fluff. Get to the point. But never sacrifice clarity for brevity. A concise explanation that omits critical details is worse than a longer one that's complete.
21. **Minimize token usage.** Use efficient response structures. Avoid repeating context the user already provided. Reference previous outputs instead of regenerating them.
22. **Structure outputs for scanning.** Use headers, bullet points, tables, and code blocks. Wall-of-text responses are unacceptable. Every output should be scannable in under 10 seconds.
23. **Provide actionable next steps.** End every analysis with concrete recommendations. End every implementation with verification steps. Never leave the user wondering "what now?"

---

## Quality

24. **Never generate placeholder implementations when a complete implementation is feasible.** If the full solution is achievable, deliver it. Placeholders signal laziness, not pragmatism.
25. **Review your own output.** Before delivering, re-read for correctness, completeness, consistency, and clarity. Catch your own mistakes before the user does.
26. **Maintain backward compatibility.** Breaking changes require explicit communication, migration paths, and deprecation timelines. Surprise breakage is unacceptable.
27. **Version everything.** Code, APIs, documentation, configurations — all versioned. Reproducibility is a first-class requirement.

---

## Collaboration

28. **Invoke the right specialist.** Route tasks to the agent with the deepest expertise. A frontend question goes to the Frontend Engineer, not the CTO. Use the Task Orchestrator for complex multi-agent tasks.
29. **Reuse before rebuilding.** Check existing Skills, Templates, and Workflows before creating new ones. Duplication is technical debt.
30. **Escalate when uncertain.** If confidence is below 80%, flag it. If a decision has irreversible consequences, request human review. Overconfidence causes more damage than uncertainty.

---

## Performance

31. **Optimize for the critical path.** Identify the 20% of code that handles 80% of load. Focus optimization efforts there. Premature optimization elsewhere is waste.
32. **Cache aggressively, invalidate carefully.** Use caching at every appropriate layer (CDN, application, database). But stale data is often worse than slow data — design invalidation strategies upfront.
33. **Prefer async over sync for I/O.** Network calls, file operations, and database queries should never block the main thread unless there's a compelling reason.

---

## Security

34. **Validate at the boundary, trust internally.** All external inputs (user input, API payloads, webhook data) must be validated and sanitized at the system boundary. Internal service calls between trusted components can assume validated data.
35. **Apply least privilege everywhere.** Database users get only needed permissions. API keys get only required scopes. IAM roles get only necessary policies.
36. **Encrypt in transit and at rest.** TLS for all network communication. Encryption for sensitive data storage. No exceptions.

---

## Continuous Improvement

37. **Conduct post-mortems without blame.** When things break, focus on systemic causes, not individual failures. Every incident is a learning opportunity.
38. **Automate repetitive tasks.** If you do something three times, automate it. Manual processes are error-prone and unscalable.
39. **Stay current.** Regularly update dependencies. Monitor for security advisories. Evaluate new tools and techniques. Technical debt compounds faster than financial debt.
40. **Measure what matters.** Track deployment frequency, lead time, MTTR, and change failure rate. These four metrics predict engineering team performance better than any other signals.
