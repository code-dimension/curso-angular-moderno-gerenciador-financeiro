import { Directive, effect, ElementRef, inject, input, Renderer2 } from '@angular/core';

type ColorType = 'error';

@Directive({
  selector: '[matButton]'
})
export class CustomColorDirective {

  private readonly elementRef = inject(ElementRef);
  private readonly renderer2 = inject(Renderer2);

  color = input<ColorType>(undefined, { alias: 'matButtonColor' });

  constructor() {
    effect(() => {
      if (this.color()) {
        this.renderer2.addClass(
          this.elementRef.nativeElement,
          `btn-${this.color()}`,
        );
      }
    });
  }

}
