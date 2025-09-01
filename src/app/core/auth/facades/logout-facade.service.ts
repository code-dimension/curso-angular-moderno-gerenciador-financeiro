import { inject, Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AuthTokenStorageService } from '../services/auth-token-storage.service';
import { tap } from 'rxjs';
import { LoggedInUserStoreService } from '../stores/logged-in-user-store';

@Injectable({
  providedIn: 'root'
})
export class LogoutFacadeService {

  authService = inject(AuthService)
  authTokenStorageService = inject(AuthTokenStorageService);
  loggedInUserStoreService = inject(LoggedInUserStoreService);

  logout() {
    return this.authService.logout().pipe(
      tap(() => this.authTokenStorageService.remove()),
      tap(() => this.loggedInUserStoreService.logout()),
    );
  }

}
