import { Controller, Get, Param, Res } from '@nestjs/common';
import type { Response } from 'express';
import { createReadStream } from 'fs';
import { FileService } from './file.service';

@Controller('images')
export class FileController {
  constructor(private fileService: FileService) {}

  @Get('/top-banner/:filePath')
  async getAll(@Res() res: Response, @Param('filePath') filePath: string) {
    try {
      const filePathFromService = await this.fileService.getAll(filePath);
      const file = createReadStream(filePathFromService);

      file.pipe(res);
    } catch (err) {
      console.log(err);
    }
  }
}
