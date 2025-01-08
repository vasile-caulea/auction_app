import {Component, inject, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {AuctionObjectService} from '../../passing-data-services/auction-object.service';
import {AuctionObjectInterface} from '../../interfaces/auction-object.interface';
import {
  MatExpansionPanel,
  MatExpansionPanelContent,
  MatExpansionPanelHeader,
  MatExpansionPanelTitle
} from '@angular/material/expansion';
import {NgIf} from '@angular/common';
import {Router, RouterLink} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {MatButton} from '@angular/material/button';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {BaseChartDirective} from 'ng2-charts';
import {ChartOptions} from 'chart.js';
import {BidsService} from '../../services/bids.service';
import {Subscription} from 'rxjs';
import {MatSnackBar} from '@angular/material/snack-bar';
import {
  MatCell,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderRow, MatRow, MatTable, MatTableModule
} from '@angular/material/table';

@Component({
  selector: 'app-auction-object-details',
  imports: [
    MatExpansionPanel,
    MatExpansionPanelTitle,
    MatExpansionPanelHeader,
    MatExpansionPanelContent,
    NgIf,
    FormsModule,
    MatButton,
    MatFormField,
    MatInput,
    MatLabel,
    BaseChartDirective,
    RouterLink,
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatHeaderRow,
    MatRow,
    MatTableModule
  ],
  templateUrl: './auction-object-details.component.html',
  styleUrl: './auction-object-details.component.css'
})
export class AuctionObjectDetailsComponent implements OnInit, OnDestroy {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  displayedColumns: string[] = ['name', 'amount', 'bidTime'];

  private _snackBar = inject(MatSnackBar);

  objectDetails: AuctionObjectInterface | any;
  bidValue: number = 0.0;

  hasBids: boolean = false;
  bids: any[] = [];
  bidSubscription!: Subscription;
  currentBid: any = {};

  labels: string[] = [];
  datasetBids: number[] = [];
  datasetBckgColors: string[] = [];
  datasetBorderColors: string[] = [];

  barChartData = {
    labels: this.labels,
    datasets: [
      {
        data: this.datasetBids,
        backgroundColor: this.datasetBckgColors,
        borderColor: this.datasetBorderColors,
        borderWidth: 1
      }
    ]
  };
  barChartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          label: (context) => {
            const dataset = context.dataset;
            const index = context.dataIndex;
            const userLabel = this.bids[index]?.bidBy.firstName + " " + this.bids[index]?.bidBy.lastName;
            const bidAmount = dataset.data[index];
            return `${userLabel} - ${bidAmount} RON`;
          }
        }
      },
      title: {
        display: true,
        text: '',
      },
      legend: {
        display: false
      },
    },
  };


  constructor(private router: Router, private passAuctionObjectService: AuctionObjectService,
              private bidsService: BidsService) {
  }

  async ngOnInit() {
    this.objectDetails = this.passAuctionObjectService.getAuctionObjectDetails();
    if (!this.objectDetails) {
      await this.router.navigate(['/auction']);
      return;
    }

    this.bidsService.getAllBids(this.objectDetails.id).subscribe({
      next: (value: any) => {
        if (value.length) {
          console.log("All bids", value)
          this.hasBids = true;

          let maxBid = Math.max(...value.map((bid: any) => bid.amount));
          this.bidValue = maxBid;
          value = value.map((bid: any) => {
            return {...bid, bidTime: new Date(bid.bidTime)}
          });
          this.currentBid = value.find((bid: any) => bid.amount === maxBid);
          value.sort((a: any, b: any) => a.bidTime.getTime() - b.bidTime.getTime());
          value.forEach((bid: any) => {
            this.addBidToView(bid);
          })
        }
      },
      error: (err: any) => {
        console.log(err);
        this._snackBar.open(err.message || 'Something went wrong...', 'Ok');
      }
    });

    this.bidSubscription = this.bidsService.getBids(this.objectDetails.id).subscribe((bid) => {
      console.log("Received bid by socket", bid)
      this.hasBids = true;
      bid = {...bid, bidTime: new Date(bid.bidTime)}
      this.currentBid = bid;
      this.bidValue = bid.amount;
      this.addBidToView(bid);
    });
  }

  private addBidToView(bid: any) {
    this.bids.push(bid);
    let color = this.getRandomColor();
    this.labels.push(bid.bidTime.toLocaleString('ro-RO', {timeZone: 'EET'}));
    this.datasetBids.push(bid.amount);
    this.datasetBckgColors.push(color[0]);
    this.datasetBorderColors.push(color[1]);
    this.chart?.update();
  }

  bid() {
    const auctionId = this.objectDetails?.id;
    if (auctionId && this.bidValue > 0) {
      this.bidsService.placeBid(auctionId, this.bidValue).subscribe({
        next: (newBid: any) => {
          console.log('Bid placed successfully:', newBid);
          this._snackBar.open('Bid placed successfully', 'Ok');
        },
        error: (err) => {
          // console.error('Error placing bid:', err);
          this._snackBar.open(err.error.message || 'Something went wrong...', 'Ok');
        },
      });
    }
  }

  ngOnDestroy() {
    if (this.bidSubscription) {
      this.bidSubscription.unsubscribe();
    }
  }

  private getRandomColor() {
    let red, blue, green;
    red = Math.random() * 255;
    green = Math.random() * 255;
    blue = Math.random() * 255;
    return [`rgba(${red}, ${green}, ${blue}, 0.5)`, `rgba(${red}, ${green}, ${blue}, 1)`]
  };

  protected getCurrentBidder() {
    return this.currentBid.bidBy.firstName + " " + this.currentBid.bidBy.lastName;
  }

  protected getCurrentBidTime() {
    return this.currentBid.bidTime.toLocaleString('ro-RO', {timeZone: 'EET'});
  }

  protected getCurrentBidderId() {
    return this.currentBid.bidBy._id;
  }
}
