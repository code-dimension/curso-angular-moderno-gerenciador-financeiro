import { computed, signal, Service } from '@angular/core';

@Service()
export class SidenavVisibilityStore {
  private state = signal(false);

  isVisible = computed(() => this.state());

  toggle() {
    this.state.update((state) => !state);
  }

  close() {
    this.state.set(false);
  }
}
