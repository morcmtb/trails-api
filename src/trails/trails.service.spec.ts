import { Test, TestingModule } from '@nestjs/testing';
import { TrailsService } from './trails.service';

describe('TrailsService', () => {
  let service: TrailsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TrailsService],
    }).compile();

    service = module.get<TrailsService>(TrailsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
