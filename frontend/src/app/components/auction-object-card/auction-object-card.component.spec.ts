import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuctionObjectCardComponent } from './auction-object-card.component';

describe('AuctionObjectCardComponent', () => {
  let component: AuctionObjectCardComponent;
  let fixture: ComponentFixture<AuctionObjectCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuctionObjectCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuctionObjectCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
