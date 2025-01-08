import { WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server } from 'socket.io';
import { Types } from 'mongoose';

@WebSocketGateway({
    cors: {
        origin: 'http://localhost:4200',
        methods: ['GET'],
        credentials: true
    }
})
export class BidsGateway {

    @WebSocketServer() server: Server;

    broadcastNewBid(auctionObjectId: string, bid: any) {
        console.log(bid);
        this.server.emit(`bids/${auctionObjectId}`, bid);
    }
}
