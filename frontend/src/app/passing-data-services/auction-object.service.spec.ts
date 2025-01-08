import { TestBed } from '@angular/core/testing';

import { AuctionObjectService } from './auction-object.service';

describe('AuctionObjectService', () => {
  let service: AuctionObjectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuctionObjectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
