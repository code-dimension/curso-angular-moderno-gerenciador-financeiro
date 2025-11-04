import { Component, computed, input, signal } from '@angular/core';
import { Balance } from './components/balance/balance';
import { Transaction } from '@shared/transaction/interfaces/transaction';
import { PieChartComponent } from './components/pie-chart/pie-chart.component';
import { PieChartConfig } from './components/pie-chart/pie-chart-config.interface';
import { TransactionType } from '@shared/transaction/enums/transaction-type';
import { sumTransactions } from '@shared/transaction/functions/sum-transactions';

@Component({
  selector: 'app-home',
  imports: [Balance, PieChartComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  transactions = input.required<Transaction[]>();

  canLoadComponent = signal(false);

  totalIncomes = computed(() => {
    return sumTransactions(this.transactions(), TransactionType.INCOME);
  });

  totalOutcomes = computed(() => {
    return sumTransactions(this.transactions(), TransactionType.OUTCOME);
  });

  chartConfig = computed<PieChartConfig>(() => {
    return {
      labels: ['Ganhos', 'Gastos'],
      dataLabel: 'Valor total',
      data: [this.totalIncomes(), this.totalOutcomes()],
    };
  });
}
