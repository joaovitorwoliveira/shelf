import { envSchema } from './env.js';

const DATABASE_URL = 'postgres://shelf:shelf@localhost:5432/shelf';

describe('envSchema', () => {
  it('defaults PORT to 3000', () => {
    expect(envSchema.parse({ DATABASE_URL }).PORT).toBe(3000);
  });

  it('coerces PORT to a number', () => {
    expect(envSchema.parse({ DATABASE_URL, PORT: '8080' }).PORT).toBe(8080);
  });

  it('rejects a missing DATABASE_URL', () => {
    expect(envSchema.safeParse({}).success).toBe(false);
  });

  it('rejects a DATABASE_URL that is not postgres', () => {
    expect(
      envSchema.safeParse({ DATABASE_URL: 'mysql://localhost/shelf' }).success,
    ).toBe(false);
  });
});
