---
name: AI Security
description: Secure AI systems against prompt injection, data poisoning, model theft, and adversarial attacks while ensuring safe, ethical AI outputs.
---

# AI Security

## Purpose
Protect AI systems from security threats specific to machine learning and LLM deployments, including prompt injection, jailbreaking, data exfiltration, and adversarial manipulation.

## When to Activate
- Building user-facing AI features
- Deploying LLMs that process untrusted input
- Evaluating AI system security posture
- Implementing content safety filters

## When NOT to Activate
- Internal-only AI tools with trusted users
- Non-AI security concerns (use Security skills)

## Workflow
1. **Threat model** — Identify AI-specific attack vectors
2. **Input sanitization** — Filter and validate all user inputs
3. **Output filtering** — Scan outputs for harmful/sensitive content
4. **Guardrails** — Implement behavior boundaries
5. **Testing** — Red team the AI system
6. **Monitor** — Track for anomalous behavior
7. **Respond** — Incident response for AI-specific attacks

## Checklist
- [ ] Prompt injection defenses implemented
- [ ] System prompt protected from extraction
- [ ] Output content filtering active
- [ ] PII detection and redaction in place
- [ ] Rate limiting on AI endpoints
- [ ] Model API keys secured
- [ ] Adversarial input testing completed
- [ ] Logging and monitoring for abuse

## Key Threats
| Threat | Description | Mitigation |
|---|---|---|
| Prompt Injection | User manipulates system behavior via input | Input/output separation, validation |
| Jailbreaking | Bypassing safety guidelines | Multi-layer guardrails, monitoring |
| Data Exfiltration | Extracting training data or system prompts | Output filtering, prompt protection |
| Data Poisoning | Corrupting training/retrieval data | Data validation, provenance tracking |
| Model Denial of Service | Expensive queries to exhaust budget | Rate limiting, cost caps |

## Edge Cases
- **Indirect prompt injection**: Malicious content in retrieved documents (RAG poisoning)
- **Multi-turn attacks**: Gradual escalation across conversation turns
- **Multilingual attacks**: Security bypasses via non-English prompts

## References
- Security Engineer Agent (`Agents/Engineering/security-engineer.md`)
- OWASP skill (`Skills/Security/owasp/SKILL.md`)
