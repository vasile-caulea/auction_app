import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { AuctionsModule } from './auctions/auctions.module';
import { DatabaseModule } from './database/database.module';
import { AuctionObjectsModule } from './auction-objects/auction-objects.module';
import { AuctionBidsModule } from './auction-bids/auction-bids.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), UsersModule, MongooseModule.forRoot('mongodb://localhost:27017/CharityAppDB'), AuthModule, AuctionsModule, DatabaseModule, AuctionObjectsModule, AuctionBidsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
