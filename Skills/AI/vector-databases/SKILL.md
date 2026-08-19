---
name: Vector Databases
description: Select, configure, and optimize vector databases for storing and querying high-dimensional embeddings at scale.
---

# Vector Databases

## Purpose
Implement vector storage and similarity search infrastructure for AI applications including RAG, semantic search, and recommendation systems.

## When to Activate
- Storing and querying embeddings at scale
- Building RAG systems that need persistent vector storage
- Implementing semantic search features
- Choosing between vector DB options

## When NOT to Activate
- Small datasets (<10K vectors) where in-memory search suffices
- Exact match queries (use traditional databases)

## Workflow
1. **Assess requirements** — Scale, latency, features needed
2. **Select database** — Choose based on requirements
3. **Design schema** — Collections, metadata, indexes
4. **Configure** — Set up infrastructure and connections
5. **Load data** — Batch upsert with metadata
6. **Optimize** — Tune index parameters for query performance
7. **Monitor** — Track latency, recall, and costs

## Checklist
- [ ] Vector DB selected based on requirements
- [ ] Collection schema designed with metadata
- [ ] Index type configured (HNSW, IVF, etc.)
- [ ] Batch ingestion pipeline built
- [ ] Query performance benchmarked
- [ ] Metadata filtering working
- [ ] Backup strategy in place

## Database Comparison

| Feature | Pinecone | Weaviate | Chroma | pgvector |
|---|---|---|---|---|
| Managed | ✅ | ✅/Self | ❌ | ❌ |
| Scale | Billions | Millions | Thousands | Millions |
| Metadata Filter | ✅ | ✅ | ✅ | ✅ |
| Hybrid Search | ✅ | ✅ | ❌ | ❌ |
| Free Tier | ✅ | ✅ | ✅ (local) | ✅ (self) |
| Best For | Production | Full-featured | Prototyping | Existing PG |

## Edge Cases
- **Index rebuild**: Changing distance metrics requires re-indexing
- **Dimensionality changes**: Switching embedding models invalidates stored vectors
- **Metadata bloat**: Keep metadata lean; store full documents elsewhere
- **Multi-tenancy**: Use namespaces or metadata filtering for tenant isolation

## References
- Embeddings skill (`Skills/AI/embeddings/SKILL.md`)
- RAG skill (`Skills/AI/rag/SKILL.md`)
