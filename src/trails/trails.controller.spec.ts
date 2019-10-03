import { Test, TestingModule } from '@nestjs/testing';
import { TrailsController } from './trails.controller';

describe('Trails Controller', () => {
  let controller: TrailsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TrailsController],
    }).compile();

    controller = module.get<TrailsController>(TrailsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
