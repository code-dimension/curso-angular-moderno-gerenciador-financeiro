import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IsUrlActivePipe } from './pipes/is-url-active-pipe';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-sidenav-items',
  imports: [RouterLink, IsUrlActivePipe, MatListModule],
  templateUrl: './sidenav-items.component.html',
  styleUrl: './sidenav-items.component.scss',
})
export class SidenavItemsComponent {
  links = signal([
    {
      label: 'Home',
      url: '/',
    },
  ]);
}
