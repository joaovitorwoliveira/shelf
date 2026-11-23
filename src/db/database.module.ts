import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DrizzleModule } from '@nestjs/drizzle';
import { drizzle } from 'drizzle-orm/node-postgres';
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import type { Env } from '../config/env.js';

const MIGRATIONS_FOLDER = './drizzle';

@Module({
  imports: [
    DrizzleModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (config: ConfigService<Env, true>) => {
        const db = drizzle({
          connection: config.get('DATABASE_URL', { infer: true }),
        });
        await migrate(db, { migrationsFolder: MIGRATIONS_FOLDER });
        return { db };
      },
    }),
  ],
})
export class DatabaseModule {}
