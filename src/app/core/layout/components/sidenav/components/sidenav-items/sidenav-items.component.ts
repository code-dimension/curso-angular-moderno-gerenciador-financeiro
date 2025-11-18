import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { LogoutDirective } from './directives/logout.directive';
import { LoggedInUserStoreService } from '@core/auth/stores/logged-in-user-store';
import { SidenavVisibilityStore } from '@core/layout/stores/sidenav-visibility.store';

@Component({
  selector: 'app-sidenav-items',
  imports: [RouterLink, RouterLinkActive, MatListModule, LogoutDirective],
  templateUrl: './sidenav-items.component.html',
  styleUrl: './sidenav-items.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class SidenavItemsComponent {
  private readonly loggedInUserStoreService = inject(LoggedInUserStoreService);
  private readonly sidenavVisibilityStore = inject(SidenavVisibilityStore);

  links = signal([
    {
      label: 'Home',
      url: '/',
    },
     {
      label: 'Transações',
      url: '/transactions',
    },
  ]);

  isLoggedIn = computed(() => this.loggedInUserStoreService.isLoggedIn());

  closeSidenav() {
    this.sidenavVisibilityStore.close();
  }
}
