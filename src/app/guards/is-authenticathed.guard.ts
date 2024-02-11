import { CanActivateFn } from '@angular/router';

export const isAuthenticathedGuard: CanActivateFn = (route, state) => {
  if (localStorage.getItem('authenticatedUser'))
    return false;
  return true;
};
