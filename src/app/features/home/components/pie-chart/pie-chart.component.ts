import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  effect,
  ElementRef,
  inject,
  input,
  viewChild,
} from '@angular/core';
import Chart from 'chart.js/auto';
import { PieChartConfig } from './pie-chart-config.interface';

@Component({
  selector: 'app-pie-chart',
  imports: [],
  template: ` <canvas #canvas></canvas> `,
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class PieChartComponent {
  canvasEl = viewChild.required<ElementRef>('canvas');

  config = input.required<PieChartConfig>();

  private destroyRef = inject(DestroyRef);

  private chartInstance: Chart | null = null;

  constructor() {
    effect(() => {
      this.destroyChartInstance();
      this.chartInstance = this.createChartInstance();
    });

    this.destroyRef.onDestroy(() => {
      this.destroyChartInstance();
    });
  }

  private createChartInstance() {
    return new Chart(this.canvasEl().nativeElement, {
      type: 'pie',
      data: {
        labels: this.config().labels,
        datasets: [
          {
            label: this.config().dataLabel,
            data: this.config().data,
          },
        ],
      },
    });
  }

  private destroyChartInstance() {
    this.chartInstance?.destroy();
  }
}
