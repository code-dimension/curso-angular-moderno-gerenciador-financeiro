import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { BalanceCard } from "./components/balance-card/balance-card";
import { Transaction } from '@shared/transaction/interfaces/transaction';
import { TransactionType } from '@shared/transaction/enums/transaction-type';
import { sumTransactions } from '@shared/transaction/functions/sum-transactions';

@Component({
  selector: 'app-balance',
  imports: [BalanceCard],
  templateUrl: './balance.html',
  styleUrl: './balance.scss',
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class Balance {

  transactions = input.required<Transaction[]>();

  totalIncomes = computed(() => {
    return sumTransactions(this.transactions(), TransactionType.INCOME);
  });

  totalOutcomes = computed(() => {
    return sumTransactions(this.transactions(), TransactionType.OUTCOME);
  });

  balance = computed(() => {
    return this.totalIncomes() - this.totalOutcomes();
  });

}
