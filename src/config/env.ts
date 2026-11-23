import { z } from 'zod';

export const envSchema = z.object({
  PORT: z.coerce.number().int().positive().default(3000),
  DATABASE_URL: z.url({ protocol: /^postgres(ql)?$/ }),
  NOTION_TOKEN: z.string().min(1),
  NOTION_DATA_SOURCE_ID: z.string().min(1),
});

export type Env = z.infer<typeof envSchema>;
