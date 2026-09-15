import { computed, signal, Service } from '@angular/core';
import { User } from '../interfaces/user';

@Service()
export class LoggedInUserStoreService {
  private readonly state = signal<User | null>(null);

  currentUser = computed(() => this.state());

  isLoggedIn = computed(() => this.state() !== null);

  setUser(user: User) {
    this.state.set(user);
  }

  logout() {
    this.state.set(null);
  }
}
