import { Component, effect, ElementRef, viewChild } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-pie-chart',
  imports: [],
  template: ` <canvas #canvas></canvas> `,
})
export class PieChartComponent {
  canvasEl = viewChild.required<ElementRef>('canvas');

  constructor() {
    effect(() => {
      new Chart(this.canvasEl().nativeElement, {
        type: 'pie',
        data: {
          labels: ['Ganhos', 'Gastos'],
          datasets: [
            {
              label: 'Transação',
              data: [1000, 100],
            },
          ],
        },
      });
    });
  }
}
