import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SidenavItemsComponent } from './components/sidenav-items/sidenav-items.component';
import { MobileLayoutService } from '@core/layout/services/mobile-layout.service';
import { SidenavVisibilityStore } from '@core/layout/stores/sidenav-visibility.store';

@Component({
  selector: 'app-sidenav',
  imports: [MatSidenavModule, SidenavItemsComponent],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class SidenavComponent {
  private readonly mobileLayoutService = inject(MobileLayoutService);
  private readonly sidenavVisibilityStore = inject(SidenavVisibilityStore);

  isMobile = this.mobileLayoutService.isMobile();

  sidenavMode = computed(() => (this.isMobile() ? 'over' : 'side'));

  isSidenavOpened = computed(() => {
    if (!this.isMobile()) {
      return true;
    }

    return this.sidenavVisibilityStore.isVisible();
  });

  onSidenavBackdropClick() {
    this.sidenavVisibilityStore.close();
  }
}
