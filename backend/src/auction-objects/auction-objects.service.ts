import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AuctionObject } from 'src/database/schemas/auction-object.schema';
import { Model, Types } from 'mongoose';
import * as fs from 'fs';
import { CreateAuctionItemDto } from './dto/create-auction-item.dto/create-auction-item.dto';
import * as path from 'path';

@Injectable()
export class AuctionObjectsService {
    constructor(
        @InjectModel(AuctionObject.name) private readonly auctionItemModel: Model<AuctionObject>,
    ) { }

    async saveFile(file: Express.Multer.File, auctionId: string): Promise<string> {
        const uploadPath = path.join(__dirname, '..', '..', 'uploads', auctionId);
        await fs.promises.mkdir(uploadPath, { recursive: true });

        const fileName = `${Date.now()}-${file.originalname}`;
        const filePath = path.join(uploadPath, fileName);
        fs.writeFileSync(filePath, file.buffer);

        const relativeFilePath = path.relative(process.cwd(), filePath);
        return relativeFilePath;
    }

    async saveItem(auctionId: string, itemData: CreateAuctionItemDto, filePath: string): Promise<Types.ObjectId> {
        const newItem = new this.auctionItemModel({
            description: itemData.description,
            title: itemData.title,
            price: itemData.startPrice,
            imagePath: filePath,
            idAuction: new Types.ObjectId(auctionId)
        });
        let result = await newItem.save();
        return result._id;
    }

    async getItems(auctionId: string): Promise<AuctionObject[]> {
        return this.auctionItemModel.find({ idAuction: new Types.ObjectId(auctionId) }).exec();
    }
}
