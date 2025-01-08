import { Body, Controller, Get, Param, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuctionObjectsService } from './auction-objects.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { CreateAuctionItemDto } from './dto/create-auction-item.dto/create-auction-item.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller()
export class AuctionObjectsController {

    constructor(private readonly auctionObjectsService: AuctionObjectsService) { }

    @UseGuards(JwtAuthGuard)
    @Post('/auctions/:id/items')
    @UseInterceptors(FileInterceptor('file'))
    async uploadItem(
        @Param('id') auctionId: string,
        @Body() itemData: CreateAuctionItemDto,
        @UploadedFile() file: Express.Multer.File,
    ) {
        const filePath = await this.auctionObjectsService.saveFile(file, auctionId);
        const id = await this.auctionObjectsService.saveItem(auctionId, itemData, filePath);
        return { message: 'Item saved successfully!', id: id };
    }

    @Get('/auctions/:id/items')
    async getItems(@Param('id') auctionId: string) {
        return this.auctionObjectsService.getItems(auctionId);
    }
}
