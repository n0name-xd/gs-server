import {
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { TopbanerService } from './topbaner.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('topbanner')
export class TopbanerController {
  constructor(private topbanerService: TopbanerService) {}
  @Get()
  getAll() {
    return this.topbanerService.getAll();
  }

  @Post('set-banner')
  @UseInterceptors(
    FileInterceptor('files', {
      storage: diskStorage({
        destination: './files',
        filename: (_, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          const filename = `${file.originalname}-${uniqueSuffix}${ext}`;

          callback(null, filename);
        },
      }),
    }),
  )
  setBanners(@UploadedFile() files: Array<Express.Multer.File>) {
    console.log('file', files);
    return this.topbanerService.setBanners();
  }
}
