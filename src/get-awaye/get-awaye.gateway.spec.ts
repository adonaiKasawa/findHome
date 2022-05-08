import { Test, TestingModule } from '@nestjs/testing';
import { GetAwayeGateway } from './get-awaye.gateway';
import { GetAwayeService } from './get-awaye.service';

describe('GetAwayeGateway', () => {
  let gateway: GetAwayeGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GetAwayeGateway, GetAwayeService],
    }).compile();

    gateway = module.get<GetAwayeGateway>(GetAwayeGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
