import { Module } from '@nestjs/common';
import { NotionReadingList } from './notion-reading-list.js';
import { ReadingsController } from './readings.controller.js';
import { ReadingsSyncService } from './readings-sync.service.js';

@Module({
  controllers: [ReadingsController],
  providers: [NotionReadingList, ReadingsSyncService],
})
export class ReadingsModule {}
