import { assertInInjectionContext, inject, DestroyRef } from "@angular/core";

export function createMouseNear() {
  assertInInjectionContext(createMouseNear);

  const destroyRef = inject(DestroyRef);

  function isMouseNear(target: Element, threshold = 25) {
    return new Promise<void>((resolve) => {
      const cleanup = () => {
        document.removeEventListener('mousemove', handler);
      };

      const handler = (event: MouseEvent) => {
        const rect = target.getBoundingClientRect();
        const mouseX = event.clientX;
        const mouseY = event.clientY;

        const isNearX =
          mouseX >= rect.left - threshold && mouseX <= rect.right + threshold;

        const isNearY =
          mouseY >= rect.top - threshold && mouseY <= rect.bottom + threshold;

        if (isNearX && isNearY) {
          resolve();
          cleanup();
        }
      };

      document.addEventListener('mousemove', handler);

      destroyRef.onDestroy(cleanup);
    });
  }

  return isMouseNear;
}
