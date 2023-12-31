import { Module } from '@nestjs/common';
import { TopbanerController } from './topbaner.controller';
import { TopbanerService } from './topbaner.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { TopBanner } from './models/top-banner.model';

@Module({
  controllers: [TopbanerController],
  providers: [TopbanerService],

  imports: [SequelizeModule.forFeature([TopBanner])],
  exports: [TopbanerService, SequelizeModule],
})
export class TopbanerModule {}
