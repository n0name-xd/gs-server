import { Injectable } from '@nestjs/common';

@Injectable()
export class TopbanerService {
  getAll() {
    return ['hi', 'ept'];
  }
}
