import { inject, Service } from '@angular/core';
import { LocalStorageToken } from '../tokens/local-storage';

@Service()
export class AuthTokenStorageService {
  private readonly key: string = 'auth-token';

  localStorageToken = inject(LocalStorageToken);

  set(token: string) {
    this.localStorageToken.setItem(this.key, token);
  }

  has(): boolean {
    return Boolean(this.get());
  }

  get(): string | null {
    return this.localStorageToken.getItem(this.key);
  }

  remove(): void {
    return this.localStorageToken.removeItem(this.key);
  }
}
