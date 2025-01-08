import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { User } from "./users.schema";
import { Types } from 'mongoose';

@Schema({ versionKey: false })
class Auction {
    name: string;// this is the name of class Auction

    @Prop({ required: true })
    title: string;

    @Prop({ required: true })
    description: string;

    @Prop()
    coverImage: string;

    @Prop({ required: true })
    startDate: Date;

    @Prop({ required: true })
    endDate: Date;

    @Prop({ default: Date.now })
    createdAt: Date;

    @Prop({ type: Types.ObjectId, ref: User.name, required: true })
    createdBy: Types.ObjectId;
}

const AuctionSchema = SchemaFactory.createForClass(Auction);
export { Auction, AuctionSchema };