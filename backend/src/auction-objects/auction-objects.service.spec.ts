import { Test, TestingModule } from '@nestjs/testing';
import { AuctionObjectsService } from './auction-objects.service';

describe('AuctionObjectsService', () => {
  let service: AuctionObjectsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuctionObjectsService],
    }).compile();

    service = module.get<AuctionObjectsService>(AuctionObjectsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
