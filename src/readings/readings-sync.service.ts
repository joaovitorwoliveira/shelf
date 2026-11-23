import { Injectable, Logger } from '@nestjs/common';
import { InjectDrizzle } from '@nestjs/drizzle';
import { notInArray, sql } from 'drizzle-orm';
import type { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { readings, type NewReading } from '../db/schema.js';
import { NotionReadingList } from './notion-reading-list.js';
import { parseNotionPage } from './notion-page.js';

export type SyncResult = {
  created: number;
  updated: number;
  deleted: number;
  skipped: number;
};

@Injectable()
export class ReadingsSyncService {
  private readonly logger = new Logger(ReadingsSyncService.name);

  constructor(
    private readonly readingList: NotionReadingList,
    @InjectDrizzle() private readonly db: NodePgDatabase,
  ) {}

  async sync(): Promise<SyncResult> {
    const pages = await this.readingList.fetchPages();
    const parsed: NewReading[] = [];
    for (const page of pages) {
      const reading = parseNotionPage(page);
      if (reading) parsed.push(reading);
      else
        this.logger.warn('Skipped a Notion row with no title', {
          notionPageId: page.id,
        });
    }

    return this.db.transaction(async (tx) => {
      const upserted = parsed.length
        ? await tx
            .insert(readings)
            .values(parsed)
            .onConflictDoUpdate({
              target: readings.notionPageId,
              set: {
                title: sql`excluded.title`,
                author: sql`excluded.author`,
                rating: sql`excluded.rating`,
                status: sql`excluded.status`,
                yearRead: sql`excluded.year_read`,
                updatedAt: sql`now()`,
              },
            })
            // xmax is 0 only on a freshly inserted row.
            .returning({ inserted: sql<boolean>`xmax = 0` })
        : [];

      const keptIds = parsed.map((reading) => reading.notionPageId);
      const deleted = await tx
        .delete(readings)
        .where(
          keptIds.length
            ? notInArray(readings.notionPageId, keptIds)
            : undefined,
        )
        .returning({ id: readings.id });

      const created = upserted.filter((row) => row.inserted).length;
      return {
        created,
        updated: upserted.length - created,
        deleted: deleted.length,
        skipped: pages.length - parsed.length,
      };
    });
  }
}
