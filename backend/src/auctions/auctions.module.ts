import { Module } from '@nestjs/common';
import { AuctionsController } from './auctions.controller';
import { AuctionsService } from './auctions.service';
import { Auction, AuctionSchema } from 'src/database/schemas/auction.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{ name: Auction.name, schema: AuctionSchema }])],
  controllers: [AuctionsController],
  providers: [AuctionsService]
})
export class AuctionsModule { }
