import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { LoggedInUserStoreService } from '../stores/logged-in-user-store';
import { AuthTokenStorageService } from '../services/auth-token-storage.service';

export const setAuthTokenInterceptor: HttpInterceptorFn = (req, next) => {

  const loggedInUserStoreService = inject(LoggedInUserStoreService);

  if (!loggedInUserStoreService.isLoggedIn()) {
    return next(req);
  }

  const authTokenStorageService = inject(AuthTokenStorageService);

  const token = authTokenStorageService.get();

  const newReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`
    }
  })

  return next(newReq);
};
