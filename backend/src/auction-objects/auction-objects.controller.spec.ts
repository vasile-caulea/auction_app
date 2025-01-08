import { Test, TestingModule } from '@nestjs/testing';
import { AuctionObjectsController } from './auction-objects.controller';

describe('AuctionObjectsController', () => {
  let controller: AuctionObjectsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuctionObjectsController],
    }).compile();

    controller = module.get<AuctionObjectsController>(AuctionObjectsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
