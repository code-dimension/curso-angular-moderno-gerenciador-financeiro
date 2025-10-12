import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { SidenavVisibilityStore } from '@core/layout/stores/sidenav-visibility.store';
import { MobileLayoutService } from '@core/layout/services/mobile-layout.service';

@Component({
  selector: 'app-header',
  imports: [MatToolbarModule, MatButtonModule, MatIconModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  private readonly sidenavVisibilityStore = inject(SidenavVisibilityStore);
  private readonly mobileLayoutService = inject(MobileLayoutService);

  isMobile = this.mobileLayoutService.isMobile();

  toggleSidenavVisibility() {
    this.sidenavVisibilityStore.toggle();
  }
}
