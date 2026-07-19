import { Module } from '@nestjs/common';
import { FlareService } from './flare.service';

@Module({
  providers: [FlareService],
  exports: [FlareService],
})
export class BlockchainModule {}
