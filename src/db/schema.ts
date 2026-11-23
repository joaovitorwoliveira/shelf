import { sql } from 'drizzle-orm';
import {
  check,
  integer,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
} from 'drizzle-orm/pg-core';

export const readingStatus = pgEnum('reading_status', [
  'read',
  'paused',
  'abandoned',
]);

export const readings = pgTable(
  'readings',
  {
    id: uuid().primaryKey().defaultRandom(),
    notionPageId: text('notion_page_id').notNull().unique(),
    title: text().notNull(),
    author: text(),
    rating: integer(),
    status: readingStatus(),
    yearRead: integer('year_read'),
    createdAt: timestamp('created_at', { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (t) => [check('readings_rating_range', sql`${t.rating} between 1 and 5`)],
);

export type Reading = typeof readings.$inferSelect;
export type NewReading = typeof readings.$inferInsert;
export type ReadingStatus = (typeof readingStatus.enumValues)[number];
