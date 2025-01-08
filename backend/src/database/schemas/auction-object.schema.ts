
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from 'mongoose';
import { Auction } from "./auction.schema";

@Schema({ versionKey: false })
class AuctionObject {
    name: string;// this is the name of class Auction

    @Prop()
    title: string;

    @Prop()
    description: string;

    @Prop({ required: true })
    price: number;

    @Prop()
    imagePath: string;

    @Prop({ type: Types.ObjectId, ref: Auction.name, required: true })
    idAuction: Types.ObjectId;
}

const AuctionObjectSchema = SchemaFactory.createForClass(AuctionObject);
export { AuctionObject, AuctionObjectSchema };