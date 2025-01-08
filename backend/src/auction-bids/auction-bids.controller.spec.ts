import { Test, TestingModule } from '@nestjs/testing';
import { AuctionBidsController } from './auction-bids.controller';

describe('AuctionBidsController', () => {
  let controller: AuctionBidsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuctionBidsController],
    }).compile();

    controller = module.get<AuctionBidsController>(AuctionBidsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
