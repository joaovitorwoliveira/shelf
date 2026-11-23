import { Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import {
  ReadingsSyncService,
  type SyncResult,
} from './readings-sync.service.js';

@Controller('readings')
export class ReadingsController {
  constructor(private readonly syncService: ReadingsSyncService) {}

  @Post('sync')
  @HttpCode(HttpStatus.OK)
  sync(): Promise<SyncResult> {
    return this.syncService.sync();
  }
}
