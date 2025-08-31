import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from "@angular/material/input";
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { UserCredentials } from '../../interfaces/user-credentials';
import { AuthTokenStorageService } from '../../services/auth-token-storage.service';
import { LoggedInUserStoreService } from '../../stores/logged-in-user-store';
import { switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-login',
  imports: [MatInputModule, ReactiveFormsModule, MatButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  authService = inject(AuthService);
  router = inject(Router);
  authTokenStorageService = inject(AuthTokenStorageService);
  loggedInUserStoreService = inject(LoggedInUserStoreService);

  form = new FormGroup({
    user: new FormControl('', {
      validators: [Validators.required],
    }),
    password: new FormControl('', {
      validators: [Validators.required],
    }),
  });

  submit() {
    if (this.form.invalid) {
      return;
    }

    const payload: UserCredentials = {
      user: this.form.controls.user.value as string,
      password: this.form.controls.password.value as string
    }

    this.authService
      .login(payload)
      .pipe(
        tap((res) => this.authTokenStorageService.set(res.token)),
        switchMap((res) => this.authService.getCurrentUser(res.token)),
        tap((user) => this.loggedInUserStoreService.setUser(user)),
      )
      .subscribe({
        next: (res) => {
          this.router.navigate(['']);
        },
        error: (response: HttpErrorResponse) => {
          if (response.status === 401) {
            this.form.setErrors({
              wrongCredentials: true,
            });
          }
        },
      });
  }
}
