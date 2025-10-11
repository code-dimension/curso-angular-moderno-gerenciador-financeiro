import { Component, inject, signal } from '@angular/core';
import { Header } from './components/header/header';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { IsUrlActivePipe } from './pipes/is-url-active-pipe';

@Component({
  selector: 'app-layout',
  imports: [
    Header,
    RouterOutlet,
    MatSidenavModule,
    MatListModule,
    RouterLink,
    IsUrlActivePipe,
  ],
  templateUrl: './layout.html',
  styleUrl: './layout.scss',
})
export class Layout {
  links = signal([
    {
      label: 'Home',
      url: '/',
    },
  ]);
}
