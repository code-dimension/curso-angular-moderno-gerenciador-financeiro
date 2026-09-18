import { effect, Service, signal } from '@angular/core';

@Service({ autoProvided: false })
export class ActionLogService {
  private log = signal<string[]>([]);

  constructor() {
    console.log(ActionLogService.name, 'Instância criada!');

    effect(() => {
      console.log(ActionLogService.name, this.log());
    });
  }

  add(action: string) {
    this.log.update((logs) => {
      return [...logs, action];
    });
  }
}
