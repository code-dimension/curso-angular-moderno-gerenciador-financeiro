import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { LogoutFacadeService } from '../../../auth/facades/logout-facade.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [MatToolbarModule, MatButtonModule],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header {

  logoutFacadeService = inject(LogoutFacadeService);
  router = inject(Router);

  logout() {
    this.logoutFacadeService.logout()
      .subscribe({
        next: () => {
          this.router.navigate(['/auth/login']);
        }
      });
  }

}
