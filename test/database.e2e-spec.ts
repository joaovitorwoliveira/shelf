import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { getDrizzleToken } from '@nestjs/drizzle';
import { sql } from 'drizzle-orm';
import type { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { AppModule } from './../src/app.module.js';

describe('Database (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('enables the vector extension at startup', async () => {
    const db = app.get<NodePgDatabase>(getDrizzleToken());
    const result = await db.execute(
      sql`select 1 from pg_extension where extname = 'vector'`,
    );
    expect(result.rows).toHaveLength(1);
  });

  afterEach(async () => {
    await app.close();
  });
});
