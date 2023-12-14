import { Test, TestingModule } from '@nestjs/testing';
import { TopbanerController } from './topbaner.controller';

describe('TopbanerController', () => {
  let controller: TopbanerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TopbanerController],
    }).compile();

    controller = module.get<TopbanerController>(TopbanerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
