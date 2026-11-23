import { notionPage } from '../../test/notion-pages.js';
import { parseNotionPage } from './notion-page.js';

describe('parseNotionPage', () => {
  it('maps a full row to a Reading', () => {
    const page = notionPage('page-1', {
      title: ' Julio César ',
      author: 'Shakespeare',
      rating: 5,
      status: 'Lido',
      year: 2024,
    });

    expect(parseNotionPage(page)).toEqual({
      notionPageId: 'page-1',
      title: 'Julio César',
      author: 'Shakespeare',
      rating: 5,
      status: 'read',
      yearRead: 2024,
    });
  });

  it('returns null for a row with no title', () => {
    expect(parseNotionPage(notionPage('page-1', { title: '  ' }))).toBeNull();
  });

  it('keeps a row with only a title, leaving the rest empty', () => {
    expect(parseNotionPage(notionPage('page-1', { title: 'Duna' }))).toEqual({
      notionPageId: 'page-1',
      title: 'Duna',
      author: null,
      rating: null,
      status: null,
      yearRead: null,
    });
  });

  it.each([
    ['Pausado', 'paused'],
    ['Abandonado', 'abandoned'],
    ['Quero ler', null],
  ])('maps status %s to %s', (notionStatus, status) => {
    const page = notionPage('page-1', { title: 'Duna', status: notionStatus });
    expect(parseNotionPage(page)?.status).toBe(status);
  });

  it.each([0, 6, 4.5])('drops rating %s outside 1-5', (rating) => {
    const page = notionPage('page-1', { title: 'Duna', rating });
    expect(parseNotionPage(page)?.rating).toBeNull();
  });
});
