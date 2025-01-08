import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuctionObjectComponent } from './auction-object.component';

describe('AuctionObjectComponent', () => {
  let component: AuctionObjectComponent;
  let fixture: ComponentFixture<AuctionObjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuctionObjectComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuctionObjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
