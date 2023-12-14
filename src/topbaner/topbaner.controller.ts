import { Controller, Get } from '@nestjs/common';
import { TopbanerService } from './topbaner.service';

@Controller('topbaner')
export class TopbanerController {
  constructor(private topbanerService: TopbanerService) {}
  @Get()
  getAll() {
    return this.topbanerService.getAll();
  }
}
