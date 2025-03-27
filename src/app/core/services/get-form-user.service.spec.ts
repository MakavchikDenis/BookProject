import { TestBed } from '@angular/core/testing';

import { GetFormUserService } from './get-form-user.service';

describe('GetFormUserService', () => {
  let service: GetFormUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetFormUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
