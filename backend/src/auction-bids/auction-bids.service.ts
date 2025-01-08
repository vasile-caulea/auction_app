import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Bid } from 'src/database/schemas/bid.schema';

@Injectable()
export class AuctionBidsService {

    constructor(@InjectModel(Bid.name) private bidModel: Model<Bid>) {
    }

    async createBid(bidData: { auctionObjectId: string, amount: number }, userId: string) {

        // get current bigger bid
        const currentBid = await this.bidModel.findOne({ auctionObject: new Types.ObjectId(bidData.auctionObjectId) }).sort({ amount: -1 });
        if (currentBid && currentBid.amount >= bidData.amount) {
            return { success: false, message: 'Bid amount should be greater than current bid amount' };
        }
        const bid = new this.bidModel({
            amount: bidData.amount,
            auctionObject: new Types.ObjectId(bidData.auctionObjectId),
            bidBy: new Types.ObjectId(userId)
        });
        let result = await bid.save();
        return {success: true, bid: result};
    }

    async getBidsOf(auctionObjectId: string) {
        return this.bidModel.find({ auctionObject: new Types.ObjectId(auctionObjectId) }).populate('bidBy', 'firstName lastName');
    }
}
