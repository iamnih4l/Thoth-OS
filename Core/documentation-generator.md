# Documentation Generator

> **Module**: Core  
> **Version**: 1.0.0  
> **Status**: Active

---

## Purpose

The Documentation Generator automatically produces high-quality documentation for code, APIs, architectures, decisions, and processes. It eliminates the documentation gap that plagues most projects by generating docs as a natural byproduct of development rather than an afterthought.

Documentation is not optional. Undocumented code is unmaintainable code. The Documentation Generator ensures every significant artifact gets the documentation it deserves.

---

## Responsibilities

1. **Code Documentation** — Generate inline comments, docstrings, JSDoc/TSDoc, and function-level documentation for source code.

2. **API Documentation** — Produce OpenAPI/Swagger specs, endpoint references, request/response examples, and authentication guides.

3. **Architecture Documentation** — Create system diagrams (Mermaid), component overviews, data flow diagrams, and deployment topologies.

4. **README Generation** — Generate project READMEs with installation, usage, configuration, and contribution instructions.

5. **Decision Documentation** — Format Architecture Decision Records (ADRs) for the Decision Engine.

6. **Changelog Generation** — Produce changelogs from git history, organized by version and change type.

7. **Runbook Generation** — Create operational runbooks for deployment, incident response, and maintenance procedures.

---

## Invocation Rules

| Condition | Action |
|---|---|
| New file or module is created | Generate README and inline docs |
| API endpoint is implemented | Generate OpenAPI spec |
| Architecture decision is made | Generate ADR |
| Deployment process is defined | Generate runbook |
| Release is prepared | Generate changelog |
| User requests documentation | Generate specified doc type |
| Code review finds missing docs | Generate and attach docs |

---

## Inputs

| Input | Type | Description |
|---|---|---|
| `source` | String/Object | The artifact to document (code, API, architecture) |
| `doc_type` | Enum | `readme`, `api`, `architecture`, `adr`, `changelog`, `runbook`, `inline` |
| `audience` | Enum | `developer`, `user`, `operator`, `stakeholder` |
| `depth` | Enum | `summary`, `standard`, `comprehensive` |
| `existing_docs` | String | Any existing documentation to update rather than replace |
| `project_context` | Object | Tech stack, conventions, and project-specific terminology |

---

## Outputs

| Output | Type | Description |
|---|---|---|
| `documentation` | String | Generated documentation in markdown |
| `diagrams` | Array | Mermaid diagrams (architecture, flow, sequence, ERD) |
| `api_spec` | Object | OpenAPI 3.0 specification (if applicable) |
| `coverage_report` | Object | What's documented vs what's not |

---

## Documentation Templates

### README Template
```markdown
# Project Name

> One-line description.

## Overview
What this project does and why it exists.

## Features
- Feature 1
- Feature 2

## Quick Start
\`\`\`bash
# Installation
npm install

# Run
npm run dev
\`\`\`

## Architecture
[Mermaid diagram]

## API Reference
Link to API docs.

## Configuration
| Variable | Description | Default |
|---|---|---|

## Contributing
How to contribute.

## License
License info.
```

### API Endpoint Documentation
```markdown
### POST /api/v1/users

Create a new user account.

**Authentication**: Required (Bearer token)

**Request Body**:
\`\`\`json
{
  "email": "user@example.com",
  "name": "John Doe",
  "role": "member"
}
\`\`\`

**Response** (201 Created):
\`\`\`json
{
  "id": "usr_abc123",
  "email": "user@example.com",
  "name": "John Doe",
  "role": "member",
  "created_at": "2024-01-15T10:30:00Z"
}
\`\`\`

**Error Responses**:
| Code | Description |
|---|---|
| 400 | Invalid request body |
| 409 | Email already exists |
| 401 | Missing or invalid token |
```

---

## Example Usage

### Scenario: Documenting a new Express route module

```
Input:
  source: auth-routes.ts (file contents)
  doc_type: "api"
  audience: "developer"
  depth: "standard"

Output:
  1. JSDoc comments for each route handler
  2. OpenAPI spec for all endpoints in the file
  3. Authentication flow diagram (Mermaid sequence diagram)
  4. Error handling reference table
  5. Usage examples with curl commands
```

### Scenario: Generating project architecture docs

```
Input:
  source: Project file tree + key config files
  doc_type: "architecture"
  audience: "developer"
  depth: "comprehensive"

Output:
  1. System architecture diagram (Mermaid)
  2. Component interaction diagram
  3. Data flow diagram
  4. Database ERD
  5. Deployment topology
  6. Technology decisions summary
  7. Key abstractions and their purposes
```

---

## Best Practices

1. **Document the "why", not just the "what".** Code tells you what it does. Documentation should tell you why it exists, what decisions shaped it, and what trade-offs were accepted.

2. **Keep docs close to code.** Inline documentation that lives with the code gets updated with the code. Separate wiki pages rot.

3. **Use examples liberally.** A single well-chosen example is worth paragraphs of explanation. Show, don't just tell.

4. **Generate diagrams for architecture.** Text descriptions of architecture are necessary but insufficient. Always include visual diagrams.

5. **Version documentation.** Docs should be versioned with the code they describe. Document breaking changes prominently.

6. **Write for scanning.** Use headers, tables, code blocks, and bullet points. No one reads documentation sequentially — they scan for what they need.

7. **Include "Getting Started" in every README.** A developer should be able to go from zero to running in under 5 minutes by following the README.

8. **Document error codes comprehensively.** Every error a user might encounter should have a documented cause and solution.

---

## Integration Points

| Module | Interaction |
|---|---|
| Quality Checker | Validates documentation completeness and accuracy |
| Token Optimizer | Compresses docs for token-efficient context inclusion |
| Memory Manager | Stores documentation patterns and templates |
| Context Manager | Provides project context for accurate documentation |
| Decision Engine | Receives decision records for ADR generation |
