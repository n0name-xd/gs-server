import { Test, TestingModule } from '@nestjs/testing';
import { TopbanerService } from './topbaner.service';

describe('TopbanerService', () => {
  let service: TopbanerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TopbanerService],
    }).compile();

    service = module.get<TopbanerService>(TopbanerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
