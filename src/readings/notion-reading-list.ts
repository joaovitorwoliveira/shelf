import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Client, collectAllDataSourceRows, isFullPage } from '@notionhq/client';
import type { Env } from '../config/env.js';
import type { NotionPage } from './notion-page.js';

@Injectable()
export class NotionReadingList {
  private readonly client: Client;
  private readonly dataSourceId: string;

  constructor(config: ConfigService<Env, true>) {
    this.client = new Client({
      auth: config.get('NOTION_TOKEN', { infer: true }),
    });
    this.dataSourceId = config.get('NOTION_DATA_SOURCE_ID', { infer: true });
  }

  async fetchPages(): Promise<NotionPage[]> {
    const rows = await collectAllDataSourceRows(this.client, {
      data_source_id: this.dataSourceId,
      result_type: 'page',
    });
    return rows.map((row) => {
      // A partial row has no properties; dropping it would delete its Reading.
      if (row.object !== 'page' || !isFullPage(row)) {
        throw new Error(
          `Notion returned a partial row (${row.id}); check that the integration can read the whole reading list`,
        );
      }
      return row;
    });
  }
}
