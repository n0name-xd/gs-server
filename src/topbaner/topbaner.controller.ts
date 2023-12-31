import {
  Controller,
  Get,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { TopbanerService } from './topbaner.service';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { SetBannersDto } from './dto/set-banner.dto';

@Controller('topbanner')
export class TopbanerController {
  constructor(private topbannerService: TopbanerService) {}

  @Get()
  async getAll() {
    try {
      const bannersList = await this.topbannerService.getAll();
      return bannersList;
    } catch (err) {
      console.log(err);
    }
  }

  @Post('set-banner')
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'bannerOne', maxCount: 1 },
        { name: 'bannerTwo', maxCount: 1 },
        { name: 'bannerThree', maxCount: 1 },
      ],
      {
        storage: diskStorage({
          destination: './files/top-banner',
          filename: (_, file, callback) => {
            const uniqueSuffix =
              Date.now() + '-' + Math.round(Math.random() * 1e9);
            const ext = extname(file.originalname);
            const filename = `${file.fieldname}-${uniqueSuffix}${ext}`;

            callback(null, filename);
          },
        }),
      },
    ),
  )
  setBanners(
    @UploadedFiles()
    files: SetBannersDto,
  ) {
    return this.topbannerService.setBanners(files);
  }
}
