import { inject, Pipe, PipeTransform } from '@angular/core';
import { Router } from '@angular/router';

@Pipe({
  name: 'isUrlActive'
})
export class IsUrlActivePipe implements PipeTransform {
  router = inject(Router);

  transform(url: string): boolean {
    return this.isActive(url);
  }

  private isActive(url: string) {
    return this.router.isActive(url, {
      fragment: 'ignored',
      matrixParams: 'ignored',
      queryParams: 'ignored',
      paths: 'exact'
    });
  }

}
