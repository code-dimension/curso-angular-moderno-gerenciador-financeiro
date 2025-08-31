import { inject, Injectable } from '@angular/core';
import { UserCredentials } from '../interfaces/user-credentials';
import { AuthService } from '../services/auth.service';
import { tap, switchMap, pipe } from 'rxjs';
import { AuthTokenStorageService } from '../services/auth-token-storage.service';
import { LoggedInUserStoreService } from '../stores/logged-in-user-store';
import { AuthTokenResponse } from '../interfaces/auth-token-response';

@Injectable({
  providedIn: 'root',
})
export class LoginFacadeService {
  private readonly authService = inject(AuthService);
  private readonly authTokenStorageService = inject(AuthTokenStorageService);
  private readonly loggedInUserStoreService = inject(LoggedInUserStoreService);

  login(userCredentials: UserCredentials) {
    return this.authService
      .login(userCredentials)
      .pipe(this.createUserSession());
  }

  refreshToken(token: string) {
    return this.authService.refreshToken(token).pipe(this.createUserSession());
  }

  private createUserSession() {
    return pipe(
      tap((res: AuthTokenResponse) =>
        this.authTokenStorageService.set(res.token),
      ),
      switchMap((res) => this.authService.getCurrentUser(res.token)),
      tap((user) => this.loggedInUserStoreService.setUser(user)),
    );
  }
}
