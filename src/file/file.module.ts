import { Module } from '@nestjs/common';
import { FileController } from './file.controller';
import { FileService } from './file.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { TopBanner } from 'src/topbaner/models/top-banner.model';

@Module({
  controllers: [FileController],
  providers: [FileService],

  imports: [SequelizeModule.forFeature([TopBanner])],
  exports: [FileService, SequelizeModule],
})
export class FileModule {}
