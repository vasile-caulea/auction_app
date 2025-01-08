import { Body, Controller, Get, HttpStatus, Post, Query, Req, Res, UseGuards } from '@nestjs/common';
import { CreateAuctionDto } from './dto/create-auction.dto/create-auction.dto';
import { Auction } from 'src/database/schemas/auction.schema';
import { AuctionsService } from './auctions.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Response } from 'express';

@Controller()
export class AuctionsController {

    constructor(private readonly auctionService: AuctionsService) { }

    @UseGuards(JwtAuthGuard)
    @Post('auctions')
    async createAuction(@Body() createAuctionDto: CreateAuctionDto, @Req() req: any, @Res() res: Response) {
        let id = await this.auctionService.createAuction(createAuctionDto, req.user._id);
        return res.status(HttpStatus.CREATED).json({
            id: id,
        });
    }

    @Get('auctions/count')
    async getAuctionsCount() {
        let result = await this.auctionService.getAuctionsCount();
        return {
            count: result
        };
    }
    
    @Get('/auctions/user/count')
    @UseGuards(JwtAuthGuard)
    async getUserAuctionsCount(@Req() req: any) {
        let result = await this.auctionService.getUserAuctionsCount(req.user._id);
        return {
            count: result
        };
    }

    @Get('auctions/user')
    @UseGuards(JwtAuthGuard)
    async getUserAuctions(@Query('page') page: number, @Query('page-size') size: number, @Req() req: any): Promise<Auction[]> {
        return this.auctionService.getUserAuctions(req.user._id, page, size);
    }

    @Get('auctions')
    async getAllPaged(@Query('page') page: number, @Query('page-size') size: number): Promise<Auction[]> {
        return this.auctionService.getAllPaged(page, size);
    }

    @Get('auctions')
    async getAllAuctions(): Promise<Auction[]> {
        return this.auctionService.getAllAuctions();
    }

}
