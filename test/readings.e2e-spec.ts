import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { getDrizzleToken } from '@nestjs/drizzle';
import type { NodePgDatabase } from 'drizzle-orm/node-postgres';
import request from 'supertest';
import { App } from 'supertest/types.js';
import { AppModule } from './../src/app.module.js';
import { readings } from './../src/db/schema.js';
import type { NotionPage } from './../src/readings/notion-page.js';
import { NotionReadingList } from './../src/readings/notion-reading-list.js';
import { notionPage } from './notion-pages.js';

describe('POST /readings/sync (e2e)', () => {
  let app: INestApplication<App>;
  let db: NodePgDatabase;
  const fetchPages = vi.fn<() => Promise<NotionPage[]>>();

  beforeEach(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(NotionReadingList)
      .useValue({ fetchPages })
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    db = app.get<NodePgDatabase>(getDrizzleToken());
    await db.delete(readings);
  });

  afterEach(async () => {
    await app.close();
  });

  const sync = () =>
    request(app.getHttpServer()).post('/readings/sync').expect(200);

  it('creates Readings and skips rows with no title', async () => {
    fetchPages.mockResolvedValue([
      notionPage('a', {
        title: 'Duna',
        author: 'Herbert',
        rating: 5,
        status: 'Lido',
        year: 2023,
      }),
      notionPage('b', { title: 'O Idiota', status: 'Pausado' }),
      notionPage('c', { title: '' }),
    ]);

    const response = await sync();

    expect(response.body).toEqual({
      created: 2,
      updated: 0,
      deleted: 0,
      skipped: 1,
    });
    const rows = await db.select().from(readings);
    expect(
      rows.map((row) => [row.notionPageId, row.title, row.status]),
    ).toEqual(
      expect.arrayContaining([
        ['a', 'Duna', 'read'],
        ['b', 'O Idiota', 'paused'],
      ]),
    );
  });

  it('updates changed rows and deletes rows removed from Notion', async () => {
    fetchPages.mockResolvedValue([
      notionPage('a', { title: 'Duna', rating: 4 }),
      notionPage('b', { title: 'O Idiota' }),
    ]);
    await sync();

    fetchPages.mockResolvedValue([
      notionPage('a', { title: 'Duna', rating: 5 }),
    ]);
    const response = await sync();

    expect(response.body).toEqual({
      created: 0,
      updated: 1,
      deleted: 1,
      skipped: 0,
    });
    const rows = await db.select().from(readings);
    expect(rows).toHaveLength(1);
    expect(rows[0]).toMatchObject({ notionPageId: 'a', rating: 5 });
  });

  it('deletes every Reading when the Notion list is empty', async () => {
    fetchPages.mockResolvedValue([notionPage('a', { title: 'Duna' })]);
    await sync();

    fetchPages.mockResolvedValue([]);
    const response = await sync();

    expect(response.body).toEqual({
      created: 0,
      updated: 0,
      deleted: 1,
      skipped: 0,
    });
  });
});
