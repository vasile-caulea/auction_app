import { Body, ConflictException, Controller, Get, HttpException, Param, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AuctionBidsService } from './auction-bids.service';
import { BidsGateway } from './bids-gateway/bids-gateway';

@Controller('bids')
export class AuctionBidsController {

    constructor(private readonly auctionBidsService: AuctionBidsService, private bidsGateway: BidsGateway) { }

    @Post()
    @UseGuards(JwtAuthGuard)
    async createBid(
        @Body() bidData: { auctionObjectId: string, amount: number },
        @Req() req: any,
    ) {
        let userId: string = req.user._id;
        let result = await this.auctionBidsService.createBid(bidData, userId);
        if (!result.success) {
            throw new ConflictException(result.message);
        }
        else {
            let bid = await result.bid.populate('bidBy', 'firstName lastName');
            this.bidsGateway.broadcastNewBid(bidData.auctionObjectId, bid);
        }
        return result;
    }

    @Get(':auctionObjectId') 
    async getAllBids(@Param('auctionObjectId') auctionObjectId: string) {
        return this.auctionBidsService.getBidsOf(auctionObjectId);
    }

}
