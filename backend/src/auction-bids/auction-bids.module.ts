import { Module } from '@nestjs/common';
import { AuctionBidsController } from './auction-bids.controller';
import { AuctionBidsService } from './auction-bids.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Bid, BidSchema } from 'src/database/schemas/bid.schema';
import { BidsGateway } from './bids-gateway/bids-gateway';

@Module({
  imports: [MongooseModule.forFeature([{ name: Bid.name, schema: BidSchema }])],
  controllers: [AuctionBidsController],
  providers: [AuctionBidsService, BidsGateway]
})
export class AuctionBidsModule { }
