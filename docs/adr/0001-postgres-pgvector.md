# Postgres with pgvector for embeddings

Embeddings live in Postgres through pgvector, next to the relational data, instead of in a dedicated vector database. The catalog is a few thousand Works at most, one database keeps the setup and the deploy small, and studying vector database internals is not a goal of this project.
