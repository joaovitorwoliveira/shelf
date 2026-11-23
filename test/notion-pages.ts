import type { NotionPage } from '../src/readings/notion-page.js';

type Row = {
  title?: string;
  author?: string;
  rating?: number | null;
  status?: string | null;
  year?: number | null;
};

const text = (value: string) => [{ plain_text: value }];

/** Builds a Notion page with only the fields the parser reads. */
export function notionPage(id: string, row: Row): NotionPage {
  return {
    id,
    properties: {
      Título: { type: 'title', title: text(row.title ?? '') },
      Autor: { type: 'rich_text', rich_text: text(row.author ?? '') },
      Nota: { type: 'number', number: row.rating ?? null },
      Status: {
        type: 'select',
        select: row.status ? { name: row.status } : null,
      },
      Ano: { type: 'number', number: row.year ?? null },
    },
  } as unknown as NotionPage;
}
