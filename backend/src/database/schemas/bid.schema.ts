
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { User } from "./users.schema";
import { Types } from 'mongoose';
import { AuctionObject } from "./auction-object.schema";

@Schema({ versionKey: false })
class Bid {
    name: string;// this is the name of class Bid

    @Prop({ required: true })
    amount: number;

    @Prop({ default: Date.now })
    bidTime: Date;

    @Prop({ type: Types.ObjectId, ref: User.name, required: true })
    bidBy: Types.ObjectId;

    @Prop({ type: Types.ObjectId, ref: AuctionObject.name, required: true })
    auctionObject: Types.ObjectId;
}

const BidSchema = SchemaFactory.createForClass(Bid);
export { Bid, BidSchema };