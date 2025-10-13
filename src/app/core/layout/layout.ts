import { Component, inject, signal } from '@angular/core';
import { Header } from './components/header/header';
import {
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-layout',
  imports: [
    Header,
    RouterOutlet,
    MatSidenavModule,
    MatListModule,
    RouterLink,
    RouterLinkActive,
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
