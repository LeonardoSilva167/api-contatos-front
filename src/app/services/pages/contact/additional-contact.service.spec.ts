import { TestBed } from '@angular/core/testing';

import { AdditionalContactService } from './additional-contact.service';

describe('AdditionalContactService', () => {
  let service: AdditionalContactService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdditionalContactService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
