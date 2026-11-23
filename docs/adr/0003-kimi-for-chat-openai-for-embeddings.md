# Kimi for chat, OpenAI for embeddings

Chat calls (title resolution, natural-language requests) go to the Kimi API with `kimi-k3.1-pro`, through its OpenAI-compatible endpoint (`https://api.moonshot.ai/v1`). It covers strict JSON-schema structured output and automatic prompt caching, and the author already has credit on it. Kimi has no embeddings endpoint, so embeddings come from OpenAI `text-embedding-3-small`: the cheapest option with an official AI SDK provider and multilingual coverage for Portuguese requests over English catalog text.

## Consequences

- Two providers, two API keys. Both are reached through `@nestjs/ai` and AI SDK provider packages, so swapping either one is configuration, not code.
- The Kimi K2 series is retired at the end of December 2026; only the K3 series is used.
- The vector column's dimension follows the embedding model. Changing the model means a migration and re-embedding every Work, which the Evals phase may do on purpose to compare models.
