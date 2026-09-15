import { HttpErrorResponse } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { UserCredentials } from '../interfaces/user-credentials';
import { AuthTokenResponse } from '../interfaces/auth-token-response';
import { User } from '../interfaces/user';
import { GenerateTokenService } from './generate-token.service';

@Service()
export class AuthService {
  private generateTokenService = inject(GenerateTokenService);

  login(payload: UserCredentials): Observable<AuthTokenResponse> {
    if (payload.user === 'admin' && payload.password === '123') {
      return of({ token: this.generateTokenService.create() });
    }

    return throwError(
      () =>
        new HttpErrorResponse({
          status: 401,
          statusText: 'Unauthorized',
        }),
    );
  }

  logout() {
    return of({});
  }

  getCurrentUser(token: string): Observable<User> {
    return of({
      username: 'admin',
    });
  }

  refreshToken(token: string) {
    return of({ token: this.generateTokenService.create() });
  }
}
