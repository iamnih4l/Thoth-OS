---
name: Embeddings
description: Generate, store, and utilize vector embeddings for semantic search, similarity matching, clustering, and recommendation systems.
---

# Embeddings

## Purpose
Convert text, images, or other data into dense vector representations that capture semantic meaning, enabling similarity search, clustering, and retrieval operations.

## When to Activate
- Building semantic search features
- Implementing RAG pipelines (embedding step)
- Creating recommendation systems
- Clustering or categorizing content
- Deduplication based on semantic similarity

## When NOT to Activate
- Exact keyword matching suffices
- Data is purely numerical/structured
- No similarity or search requirement exists

## Workflow
1. **Choose embedding model** — Match model to data type and quality needs
2. **Preprocess data** — Clean and chunk text appropriately
3. **Generate embeddings** — Batch process for efficiency
4. **Store vectors** — Use appropriate vector storage
5. **Build search** — Implement similarity search with proper metrics
6. **Evaluate** — Test retrieval quality
7. **Optimize** — Tune for latency and cost

## Checklist
- [ ] Embedding model selected (size vs quality tradeoff)
- [ ] Data preprocessed and chunked
- [ ] Batch processing implemented for efficiency
- [ ] Vector storage chosen and configured
- [ ] Similarity metric selected (cosine, dot product, euclidean)
- [ ] Search performance tested
- [ ] Embedding caching implemented

## Input Format
```yaml
data_type: "text | image | code | multimodal"
model: "text-embedding-3-small | all-MiniLM-L6-v2 | voyage-code-2"
dimensions: 384 | 768 | 1536 | 3072
use_case: "search | clustering | classification | recommendation"
```

## Output Format
```markdown
## Embedding Pipeline
### Model Selection
| Model | Dimensions | Speed | Quality | Cost |
### Implementation
[Code for embedding generation and search]
### Performance
| Metric | Value |
| Embedding time (per doc) | Xms |
| Search latency (p50) | Xms |
| Retrieval accuracy | X% |
```

## Examples
### Text Embedding with OpenAI
```python
from openai import OpenAI
client = OpenAI()

response = client.embeddings.create(
    model="text-embedding-3-small",
    input="Your text here",
    dimensions=512  # Reduce dimensions for cost/speed
)
embedding = response.data[0].embedding
```

## Edge Cases
- **Dimension mismatch**: Ensure query and document embeddings use the same model and dimensions
- **Max token limits**: Chunk long documents before embedding
- **Model updates**: Re-embed when changing models (vectors aren't compatible)
- **Cold start**: Pre-compute embeddings for known corpus

## References
- RAG skill (`Skills/AI/rag/SKILL.md`)
- Vector Databases skill (`Skills/AI/vector-databases/SKILL.md`)
