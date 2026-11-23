import { envSchema } from './env.js';

const DATABASE_URL = 'postgres://shelf:shelf@localhost:5432/shelf';
const NOTION = { NOTION_TOKEN: 'token', NOTION_DATA_SOURCE_ID: 'source' };

describe('envSchema', () => {
  it('defaults PORT to 3000', () => {
    expect(envSchema.parse({ DATABASE_URL, ...NOTION }).PORT).toBe(3000);
  });

  it('coerces PORT to a number', () => {
    expect(
      envSchema.parse({ DATABASE_URL, ...NOTION, PORT: '8080' }).PORT,
    ).toBe(8080);
  });

  it('rejects a missing DATABASE_URL', () => {
    expect(envSchema.safeParse(NOTION).success).toBe(false);
  });

  it('rejects a missing NOTION_TOKEN', () => {
    expect(
      envSchema.safeParse({ DATABASE_URL, NOTION_DATA_SOURCE_ID: 'source' })
        .success,
    ).toBe(false);
  });

  it('rejects a DATABASE_URL that is not postgres', () => {
    expect(
      envSchema.safeParse({
        ...NOTION,
        DATABASE_URL: 'mysql://localhost/shelf',
      }).success,
    ).toBe(false);
  });
});
