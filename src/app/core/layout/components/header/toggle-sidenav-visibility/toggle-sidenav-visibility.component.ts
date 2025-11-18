import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MobileLayoutService } from '@core/layout/services/mobile-layout.service';
import { SidenavVisibilityStore } from '@core/layout/stores/sidenav-visibility.store';

@Component({
  selector: 'app-toggle-sidenav-visibility',
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './toggle-sidenav-visibility.component.html',
  styleUrl: './toggle-sidenav-visibility.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class ToggleSidenavVisibilityComponent {
  private readonly sidenavVisibilityStore = inject(SidenavVisibilityStore);
  private readonly mobileLayoutService = inject(MobileLayoutService);

  isMobile = this.mobileLayoutService.isMobile();

  toggleSidenavVisibility() {
    this.sidenavVisibilityStore.toggle();
  }
}
