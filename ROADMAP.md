# Roadmap

What we build, in order. Each item becomes a GitHub issue when work on it starts, and its spec is written then. Terms follow [GLOSSARY.md](GLOSSARY.md).

## Phase 0: Spike

- [x] Choose the LLM and embedding provider: check whether Kimi covers chat with structured output, prompt caching and embeddings; pick a separate embedding provider if not. Record the choice in an ADR.

## Phase 1: MVP

- [ ] Config and Postgres + pgvector with Drizzle, run locally with docker compose.
- [ ] Sync Readings from Notion, triggered by hand.
- [ ] Resolve Readings to Works: an LLM normalizes the typed title, Open Library confirms it, Google Books is the fallback. Unconfirmed Matches are flagged.
- [ ] Enrich Works: description, subjects, page count, year.
- [ ] Pull Candidates from the Open Library subjects of the Works read.
- [ ] Embed Works and Candidates with a multilingual model.
- [ ] "Similar to X" endpoint.
- [ ] Natural-language request: structured output extracts the reference Work and constraints, then vector search with metadata filters.
- [ ] Web UI served by the app: sync button, unconfirmed Matches, search.

## Phase 2: Evals

- [ ] Eval set for title resolution and Recommendations.
- [ ] Rating-aware ranking, measured against the eval set.

## Phase 3: RAG

- [ ] Answers with citations over Work descriptions and English Wikipedia articles.

## Phase 4: MCP and agents

- [ ] MCP server exposing the search.
- [ ] Agent flows on top of it.

## Phase 5: Cost and latency

- [ ] Prompt caching, embedding cache, tracing.

## Phase 6: Security

- [ ] Sign-in, rate limiting, prompt-injection guardrails.

## Phase 7: Production

- [ ] VPS deploy, health checks, deploy from CI.
