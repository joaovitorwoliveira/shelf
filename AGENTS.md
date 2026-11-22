# Shelf

Personal book app. The user logs the books they read (title, author, 1-5 rating) in a Notion database. Shelf enriches each book with public catalog data and recommends similar books.

It is also a portfolio project: the goal is to exercise applied AI end to end in one product (embeddings, RAG, MCP, evals, cost and latency, security, production). Start with the simplest usable MVP and grow it block by block.

## Docs

- [ROADMAP.md](ROADMAP.md): what we build, in order.
- [docs/workflow.md](docs/workflow.md): branches, commits, PRs, CI. Read before any git operation.
- [docs/nestjs.md](docs/nestjs.md): NestJS 12 notes (ESM, Vitest, first-party packages, Observe).

## Agent skills

### Issue tracker

Issues live in GitHub Issues (`joaovitorwoliveira/shelf`), managed with the `gh` CLI. See `docs/agents/issue-tracker.md`.

### Triage labels

Default vocabulary: `needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human`, `wontfix`. See `docs/agents/triage-labels.md`.

### Domain docs

Single-context: one `GLOSSARY.md` and `docs/adr/` at the repo root. See `docs/agents/domain.md`.
