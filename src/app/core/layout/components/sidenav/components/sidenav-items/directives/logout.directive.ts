import { Directive, inject } from '@angular/core';
import { Router } from '@angular/router';
import { LogoutFacadeService } from '@core/auth/facades/logout-facade.service';

@Directive({
  selector: '[appLogout]',
  host: {
    '(click)': 'logout()',
  }
})
export class LogoutDirective {
  private readonly logoutFacadeService = inject(LogoutFacadeService);
  private readonly router = inject(Router);

  logout() {
    this.logoutFacadeService.logout().subscribe({
      next: () => {
        this.router.navigate(['/auth/login']);
      },
    });
  }
}
