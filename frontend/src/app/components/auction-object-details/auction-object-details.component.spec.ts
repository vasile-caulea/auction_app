import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuctionObjectDetailsComponent } from './auction-object-details.component';

describe('AuctionObjectDetailsComponent', () => {
  let component: AuctionObjectDetailsComponent;
  let fixture: ComponentFixture<AuctionObjectDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuctionObjectDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuctionObjectDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
