import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { isAuthenticathedGuard } from './is-authenticathed.guard';

describe('isAuthenticathedGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => isAuthenticathedGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
