---
name: RAG (Retrieval-Augmented Generation)
description: Design and implement RAG pipelines that combine document retrieval with LLM generation for accurate, grounded, and up-to-date AI responses.
---

# RAG (Retrieval-Augmented Generation)

## Purpose
Build production RAG systems that retrieve relevant documents from a knowledge base and use them as context for LLM generation, producing accurate responses grounded in source material.

## When to Activate
- Building AI features that need access to private/custom data
- LLM needs up-to-date information beyond training data
- Answering questions from documentation, codebases, or knowledge bases
- Reducing hallucinations by grounding responses in source material

## When NOT to Activate
- Task is within LLM's training knowledge and accuracy is sufficient
- Real-time data needed (use API calls instead)
- Simple prompt engineering suffices

## Workflow
1. **Document Ingestion** — Load, clean, and preprocess source documents
2. **Chunking** — Split documents into retrievable chunks (500-1000 tokens)
3. **Embedding** — Convert chunks to vector embeddings
4. **Indexing** — Store embeddings in vector database
5. **Retrieval** — Query vector DB for relevant chunks (top-k)
6. **Augmentation** — Insert retrieved context into prompt
7. **Generation** — LLM generates response using retrieved context
8. **Evaluation** — Measure retrieval quality and generation accuracy

## Checklist
- [ ] Documents preprocessed and cleaned
- [ ] Chunking strategy chosen (fixed-size, semantic, recursive)
- [ ] Chunk size optimized (not too small/large)
- [ ] Overlap between chunks configured (10-20%)
- [ ] Embedding model selected and tested
- [ ] Vector database provisioned and indexed
- [ ] Retrieval top-k tuned for recall vs precision
- [ ] Prompt template includes retrieved context properly
- [ ] Source attribution implemented
- [ ] Evaluation metrics defined and measured

## Input Format
```yaml
documents: "Path to document corpus"
embedding_model: "text-embedding-3-small | all-MiniLM-L6-v2"
vector_db: "Pinecone | Weaviate | Chroma | pgvector"
chunk_size: 512
chunk_overlap: 50
top_k: 5
```

## Output Format
```markdown
## RAG Pipeline Specification
### Ingestion Pipeline
[Document processing steps]
### Chunking Strategy
[Strategy with rationale]
### Retrieval Configuration
[Vector DB setup, embedding model, search parameters]
### Prompt Template
[Template showing where retrieved context is inserted]
### Evaluation Results
| Metric | Score |
|---|---|
| Retrieval Precision@k | X% |
| Answer Accuracy | X% |
| Groundedness | X% |
```

## Examples
### Basic RAG Pipeline (Python)
```python
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.embeddings import OpenAIEmbeddings
from langchain.vectorstores import Chroma

# 1. Chunk documents
splitter = RecursiveCharacterTextSplitter(chunk_size=512, chunk_overlap=50)
chunks = splitter.split_documents(documents)

# 2. Create embeddings and store
vectorstore = Chroma.from_documents(chunks, OpenAIEmbeddings())

# 3. Retrieve and generate
retriever = vectorstore.as_retriever(search_kwargs={"k": 5})
relevant_docs = retriever.get_relevant_documents(query)
```

## Edge Cases
- **Chunk boundary splits context**: Use overlapping chunks and semantic chunking
- **Irrelevant retrieval**: Implement re-ranking (Cohere Rerank, cross-encoder)
- **Too much context**: Summarize retrieved chunks before insertion
- **Stale documents**: Implement incremental indexing and document versioning
- **Multi-modal**: Handle tables, images, and code differently from prose

## References
- Vector Databases skill (`Skills/AI/vector-databases/SKILL.md`)
- Embeddings skill (`Skills/AI/embeddings/SKILL.md`)
- Context Engineering skill (`Skills/AI/context-engineering/SKILL.md`)
