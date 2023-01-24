import { TestBed } from '@angular/core/testing';

import { SearchAlgService } from './search-alg.service';

describe('SearchAlgService', () => {
  let service: SearchAlgService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchAlgService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
