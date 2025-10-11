import { Component, computed, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { LogoutFacadeService } from '../../../auth/facades/logout-facade.service';
import { Router } from '@angular/router';
import { LoggedInUserStoreService } from '../../../auth/stores/logged-in-user-store';

@Component({
  selector: 'app-header',
  imports: [MatToolbarModule, MatButtonModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {}
