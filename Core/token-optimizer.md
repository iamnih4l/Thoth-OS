# Token Optimizer

> **Module**: Core  
> **Version**: 1.0.0  
> **Status**: Active

---

## Purpose

The Token Optimizer manages the most constrained resource in AI-powered workflows: the context window. It compresses, prioritizes, and structures information to maximize the useful content within token limits while minimizing waste on redundant, irrelevant, or inefficiently formatted content.

Every wasted token is stolen capacity. The Token Optimizer ensures Thoth OS gets maximum value per token.

---

## Responsibilities

1. **Token Budgeting** — Allocate token budgets across system prompt, context, instructions, and response space for optimal results.

2. **Content Compression** — Reduce token usage without losing critical information through summarization, deduplication, and format optimization.

3. **Priority Ranking** — When content exceeds budget, rank by importance and trim the lowest-value items first.

4. **Format Optimization** — Choose the most token-efficient format for each content type (tables vs prose, abbreviations, structured vs natural language).

5. **Chunking Strategy** — Split large content across multiple interactions when single-pass processing exceeds context limits.

6. **Usage Monitoring** — Track token consumption patterns and identify optimization opportunities.

---

## Invocation Rules

| Condition | Action |
|---|---|
| Context exceeds 70% of window | Trigger compression |
| Large file or dataset needs processing | Apply chunking strategy |
| Multiple agents share context | Deduplicate shared information |
| Response is verbose without added value | Apply output compression |
| Token budget is set for a task | Enforce budget with priority-based trimming |
| Model switch occurs | Recalculate budgets for new context window |

---

## Inputs

| Input | Type | Description |
|---|---|---|
| `content` | String/Array | Content to optimize |
| `token_limit` | Integer | Maximum available tokens |
| `priority_map` | Object | Importance rankings for content sections |
| `compression_level` | Enum | `none`, `light`, `moderate`, `aggressive` |
| `preserve_list` | Array | Content that must not be compressed or removed |

---

## Outputs

| Output | Type | Description |
|---|---|---|
| `optimized_content` | String | Token-efficient version of input |
| `token_count` | Integer | Token count of optimized content |
| `savings` | Object | Tokens saved, percentage reduction |
| `removed_items` | Array | What was cut (for transparency) |
| `chunks` | Array | Content split into processable chunks (if chunking applied) |

---

## Token Budget Allocation

### Standard Task Distribution
```
Total Context Window: 100%

┌─────────────────────────────────────┐
│ System Prompt & Rules:     10-15%   │
│ Project Context:           25-30%   │
│ Task-Specific Context:     20-25%   │
│ Current Conversation:      15-20%   │
│ Reserved for Response:     20-25%   │
└─────────────────────────────────────┘
```

### Complex Task Distribution
```
Total Context Window: 100%

┌─────────────────────────────────────┐
│ System Prompt & Rules:      8-10%   │
│ Project Context:           15-20%   │
│ Task-Specific Context:     30-35%   │
│ Current Conversation:      10-15%   │
│ Examples/References:       10-15%   │
│ Reserved for Response:     15-20%   │
└─────────────────────────────────────┘
```

---

## Compression Techniques

### 1. Structural Compression
```
Before (42 tokens):
  "The user authentication system uses JSON Web Tokens 
   for session management. Each token contains the user's 
   ID, email address, and role. Tokens expire after 24 hours."

After (18 tokens):
  "Auth: JWT (userId, email, role), 24h expiry"
```

### 2. Deduplication
```
Before: Same file path referenced 5 times across context
After:  Referenced once with alias. "File A = src/auth/middleware.ts"
        Subsequent references use "File A"
```

### 3. Format Optimization
```
Before (prose):
  "The API has three endpoints. The first is GET /users which 
   returns a list of all users. The second is POST /users which 
   creates a new user. The third is DELETE /users/:id which 
   removes a specific user."

After (table — fewer tokens):
  | Method | Path | Action |
  |--------|------|--------|
  | GET | /users | List all |
  | POST | /users | Create |
  | DELETE | /users/:id | Remove |
```

### 4. Progressive Summarization
```
Level 0 (full): Complete file contents (500 tokens)
Level 1 (summary): Function signatures + docstrings (150 tokens)
Level 2 (outline): File purpose + export list (50 tokens)
Level 3 (tag): "auth middleware - JWT validation" (8 tokens)
```

---

## Chunking Strategies

### Sequential Chunking
For documents that need sequential processing:
```
Chunk 1: Pages 1-10 → Process → Store results
Chunk 2: Pages 11-20 + results from Chunk 1 → Process
...
Final: Consolidate all results
```

### Semantic Chunking
For documents with independent sections:
```
Chunk 1: Introduction + Methods → Process
Chunk 2: Results + Analysis → Process  (parallel)
Chunk 3: Conclusions + References → Process  (parallel)
Final: Merge outputs
```

### Sliding Window
For code analysis:
```
Window 1: Lines 1-200 + overlap → Analyze
Window 2: Lines 180-380 + overlap → Analyze
Window 3: Lines 360-500 + overlap → Analyze
Final: Merge with deduplication on overlap zones
```

---

## Example Usage

### Scenario: Optimizing context for a code review

```
Input:
  - Full file contents (3 files, ~2000 tokens)
  - Git diff (500 tokens)
  - Test results (300 tokens)
  - PR description (200 tokens)
  - Project guidelines (400 tokens)
  - Total: 3400 tokens
  - Budget: 2000 tokens

Token Optimizer applies:
  1. Replace full files with diff + surrounding context: -1200 tokens
  2. Compress test results to pass/fail summary: -200 tokens
  3. Summarize guidelines to relevant rules only: -250 tokens
  
Result:
  - Optimized context: 1750 tokens (within budget)
  - Savings: 1650 tokens (48.5% reduction)
  - Preserved: All diff content, all failures, relevant guidelines
  - Removed: Passing test details, unchanged file sections, 
             unrelated guidelines
```

---

## Best Practices

1. **Never compress instructions.** Cut context before cutting instructions. Vague instructions produce worse results than missing context.

2. **Preserve code over comments.** When compressing code files, remove comments before removing code. The code is the ground truth.

3. **Use hierarchical compression.** Start with the least aggressive compression. Only increase when budget is still exceeded.

4. **Keep error messages intact.** Error messages, stack traces, and failure logs should never be compressed — they contain critical debugging information.

5. **Prefer structured formats.** Tables, lists, and key-value pairs are almost always more token-efficient than prose for conveying structured data.

6. **Monitor compression quality.** After aggressive compression, run a quick check: "Does this compressed context contain enough information to complete the task?" If not, the compression was too aggressive.

7. **Cache token counts.** Don't re-tokenize unchanged content. Cache counts for stable content blocks.

---

## Integration Points

| Module | Interaction |
|---|---|
| Context Manager | Triggers compression when context exceeds budget |
| Prompt Optimizer | Receives optimized prompts for token counting |
| Memory Manager | Compresses memories for efficient storage |
| Task Orchestrator | Advises on task splitting when content exceeds limits |
| Documentation Generator | Optimizes generated docs for token efficiency |
