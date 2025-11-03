import { Component, input } from '@angular/core';
import { Balance } from './components/balance/balance';
import { Transaction } from '@shared/transaction/interfaces/transaction';
import { PieChartComponent } from './components/pie-chart/pie-chart.component';

@Component({
  selector: 'app-home',
  imports: [Balance, PieChartComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  transactions = input.required<Transaction[]>();
}
