import { Test, TestingModule } from '@nestjs/testing';
import { AuctionBidsService } from './auction-bids.service';

describe('AuctionBidsService', () => {
  let service: AuctionBidsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuctionBidsService],
    }).compile();

    service = module.get<AuctionBidsService>(AuctionBidsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
