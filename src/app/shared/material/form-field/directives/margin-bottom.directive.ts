import {
  Directive,
  effect,
  ElementRef,
  inject,
  input,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appMarginBottom]',
})
export class MarginBottomDirective {
  private readonly elementRef = inject(ElementRef);
  private readonly renderer2 = inject(Renderer2);

  marginBottom = input('', {
    transform: (value: string) => value || '24px',
    alias: 'appMarginBottom',
  });

  constructor() {
    effect(() => {
      if (this.marginBottom()) {
        this.renderer2.setStyle(
          this.elementRef.nativeElement,
          'margin-bottom',
          this.marginBottom(),
        );
      }
    });
  }
}
