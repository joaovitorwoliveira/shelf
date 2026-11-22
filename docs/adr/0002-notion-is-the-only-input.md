# Notion is the only input

The author keeps logging Readings in their Notion database, and Shelf reads it with the official Notion API (`@notionhq/client`), not through MCP. Shelf never writes to Notion and has no screen to edit Readings: a wrong title is fixed in Notion and synced again. This keeps one source of truth and the MVP free of an editing UI.
