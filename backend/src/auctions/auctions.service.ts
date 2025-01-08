import { Body, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Auction } from 'src/database/schemas/auction.schema';
import { Model, Types } from 'mongoose';
import { CreateAuctionDto } from './dto/create-auction.dto/create-auction.dto';

@Injectable()
export class AuctionsService {
    constructor(@InjectModel(Auction.name) private auctionModel: Model<Auction>) { }

    async createAuction(data: CreateAuctionDto, userId: string) {
        const auction = new this.auctionModel({ ...data });
        auction.createdBy = new Types.ObjectId(userId);
        let result = await auction.save();
        return result._id;
    }

    async getAllAuctions(): Promise<Auction[]> {
        return this.auctionModel.find().populate('createdBy', 'firstName lastName').exec();
    }


    async getAllPaged(page: number, size: number) {
        return this.auctionModel.find().skip(page * size).limit(size).populate('createdBy', 'firstName lastName').exec();
    }

    async getAuctionsCount() {
        return this.auctionModel.countDocuments().exec();
    }

    async getUserAuctionsCount(userId: any) {
        return this.auctionModel.countDocuments({ createdBy: new Types.ObjectId(userId) }).exec();
    }

    async getUserAuctions(userId: any, page: number, size: number): Promise<Auction[]> {
        return this.auctionModel.find({ createdBy: new Types.ObjectId(userId) }).skip(page * size).limit(size).populate('createdBy', 'firstName lastName').exec();
    }

}
