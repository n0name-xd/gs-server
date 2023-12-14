import { Module } from '@nestjs/common';
import { TopbanerController } from './topbaner.controller';
import { TopbanerService } from './topbaner.service';

@Module({
  controllers: [TopbanerController],
  providers: [TopbanerService]
})
export class TopbanerModule {}
