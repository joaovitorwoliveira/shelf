# Shelf

A personal book app. It reads the books I log (title, author, 1-5 rating), enriches them with public catalog data, and recommends similar books.

Status: in development. This is a study and portfolio project.

## Stack

- NestJS 12 (TypeScript, ESM)
- Postgres + pgvector, Drizzle
- Vitest
- pnpm

## Running locally

```bash
cp .env.example .env
docker compose up -d
pnpm install
pnpm start:dev
```

Migrations run at startup. After a schema change in `src/db/schema.ts`, run `pnpm db:generate`.

## Tests

The e2e tests need the database from `docker compose up -d`.

```bash
pnpm test
pnpm test:e2e
```
