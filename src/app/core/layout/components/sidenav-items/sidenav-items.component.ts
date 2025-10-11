import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IsUrlActivePipe } from './pipes/is-url-active-pipe';
import { MatListModule } from '@angular/material/list';
import { LoggedInUserStoreService } from '../../../auth/stores/logged-in-user-store';
import { LogoutDirective } from './directives/logout.directive';

@Component({
  selector: 'app-sidenav-items',
  imports: [RouterLink, IsUrlActivePipe, MatListModule, LogoutDirective],
  templateUrl: './sidenav-items.component.html',
  styleUrl: './sidenav-items.component.scss',
})
export class SidenavItemsComponent {
  private readonly loggedInUserStoreService = inject(LoggedInUserStoreService);

  links = signal([
    {
      label: 'Home',
      url: '/',
    },
  ]);

  isLoggedIn = computed(() => this.loggedInUserStoreService.isLoggedIn());
}
