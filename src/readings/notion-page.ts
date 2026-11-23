import type { PageObjectResponse } from '@notionhq/client';
import type { NewReading, ReadingStatus } from '../db/schema.js';

export type NotionPage = Pick<PageObjectResponse, 'id' | 'properties'>;
type PropertyValue = PageObjectResponse['properties'][string];

const TITLE = 'Título';
const AUTHOR = 'Autor';
const RATING = 'Nota';
const STATUS = 'Status';
const YEAR = 'Ano';

const MIN_RATING = 1;
const MAX_RATING = 5;

const STATUS_BY_NOTION_NAME: Record<string, ReadingStatus> = {
  Lido: 'read',
  Pausado: 'paused',
  Abandonado: 'abandoned',
};

/** Returns null for a row with no title: it is not a Reading. */
export function parseNotionPage(page: NotionPage): NewReading | null {
  const title = readText(page.properties[TITLE]);
  if (!title) return null;

  const rating = readNumber(page.properties[RATING]);
  const statusName = readSelect(page.properties[STATUS]);

  return {
    notionPageId: page.id,
    title,
    author: readText(page.properties[AUTHOR]),
    rating: isValidRating(rating) ? rating : null,
    status: statusName ? (STATUS_BY_NOTION_NAME[statusName] ?? null) : null,
    yearRead: readInteger(page.properties[YEAR]),
  };
}

function readText(value: PropertyValue | undefined): string | null {
  if (value?.type === 'title') return joinPlainText(value.title);
  if (value?.type === 'rich_text') return joinPlainText(value.rich_text);
  return null;
}

function joinPlainText(parts: { plain_text: string }[]): string | null {
  const text = parts
    .map((part) => part.plain_text)
    .join('')
    .trim();
  return text || null;
}

function readNumber(value: PropertyValue | undefined): number | null {
  return value?.type === 'number' ? value.number : null;
}

function readInteger(value: PropertyValue | undefined): number | null {
  const number = readNumber(value);
  return number !== null && Number.isInteger(number) ? number : null;
}

function readSelect(value: PropertyValue | undefined): string | null {
  return value?.type === 'select' ? (value.select?.name ?? null) : null;
}

function isValidRating(rating: number | null): rating is number {
  return (
    rating !== null &&
    Number.isInteger(rating) &&
    rating >= MIN_RATING &&
    rating <= MAX_RATING
  );
}
