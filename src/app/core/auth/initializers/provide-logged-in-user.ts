import { inject, provideAppInitializer } from "@angular/core";
import { of } from "rxjs";
import { AuthTokenStorageService } from "../services/auth-token-storage.service";
import { LoginFacadeService } from "../facades/login-facade.service";

export function provideLoggedInUser() {
  return provideAppInitializer(() => {
    const authTokenStorageService = inject(AuthTokenStorageService);

    if(!authTokenStorageService.has()) {
      return of();
    }

    const loginFacadeService = inject(LoginFacadeService);
    const token = authTokenStorageService.get() as string;

    return loginFacadeService.refreshToken(token);
  });
}
