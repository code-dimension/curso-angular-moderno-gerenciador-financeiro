import { inject, provideAppInitializer } from "@angular/core";
import { AuthService } from "../services/auth.service";
import { tap, switchMap, of } from "rxjs";
import { AuthTokenStorageService } from "../services/auth-token-storage.service";
import { LoggedInUserStoreService } from "../stores/logged-in-user-store";

export function provideLoggedInUser() {
  return provideAppInitializer(() => {
    const authTokenStorageService = inject(AuthTokenStorageService);

    if(!authTokenStorageService.has()) {
      return of();
    }

    const authService =  inject(AuthService);
    const loggedInUserStoreService = inject(LoggedInUserStoreService);

    const token = authTokenStorageService.get() as string;

    return authService.refreshToken(token).pipe(
      tap((res) => authTokenStorageService.set(res.token)),
      switchMap((res) => authService.getCurrentUser(res.token)),
      tap((user) => loggedInUserStoreService.setUser(user)),
    );
  });
}
