import { Service, DOCUMENT, inject, InjectionToken, Injectable } from '@angular/core';

const CRYPTO_SUPPORTED = new InjectionToken('crypto.supported', {
  factory: () => typeof inject(DOCUMENT).defaultView?.crypto !== 'undefined',
});

@Service({
  factory: () =>
    inject(CRYPTO_SUPPORTED)
      ? new CryptoGenerateToken()
      : new MathRandomGenerateToken(),
})
export abstract class GenerateTokenService {
  abstract create(): string;
}

class CryptoGenerateToken extends GenerateTokenService {
  override create(): string {
    return window.crypto.randomUUID();
  }
}

class MathRandomGenerateToken extends GenerateTokenService {
  override create(): string {
    let token = '';
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 20; i++) {
      token += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return token;
  }
}
