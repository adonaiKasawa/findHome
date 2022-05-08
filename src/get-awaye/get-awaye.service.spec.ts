import { Test, TestingModule } from '@nestjs/testing';
import { GetAwayeService } from './get-awaye.service';

describe('GetAwayeService', () => {
  let service: GetAwayeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GetAwayeService],
    }).compile();

    service = module.get<GetAwayeService>(GetAwayeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
