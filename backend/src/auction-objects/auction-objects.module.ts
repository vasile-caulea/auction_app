import { Module } from '@nestjs/common';
import { AuctionObjectsController } from './auction-objects.controller';
import { AuctionObjectsService } from './auction-objects.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuctionObject, AuctionObjectSchema } from 'src/database/schemas/auction-object.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: AuctionObject.name, schema: AuctionObjectSchema }])],
  controllers: [AuctionObjectsController],
  providers: [AuctionObjectsService]
})
export class AuctionObjectsModule { }
