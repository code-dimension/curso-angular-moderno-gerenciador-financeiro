import { Component, effect, ElementRef, input, viewChild } from '@angular/core';
import Chart from 'chart.js/auto';
import { PieChartConfig } from './pie-chart-config.interface';

@Component({
  selector: 'app-pie-chart',
  imports: [],
  template: ` <canvas #canvas></canvas> `,
})
export class PieChartComponent {
  canvasEl = viewChild.required<ElementRef>('canvas');

  config = input.required<PieChartConfig>();

  constructor() {
    effect(() => {
      new Chart(this.canvasEl().nativeElement, {
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
    });
  }
}
