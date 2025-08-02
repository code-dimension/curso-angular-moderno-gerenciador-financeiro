import { Component, computed, input } from '@angular/core';
import { Transaction } from '../../../../../../shared/transaction/interfaces/transaction';
import { TransactionType } from '../../../../../../shared/transaction/enums/transaction-type';

const CssClasses = {
  [TransactionType.INCOME]: 'income',
  [TransactionType.OUTCOME]: 'outcome'
}

@Component({
  selector: 'app-transaction-value',
  imports: [],
  styleUrl: './transaction-value.scss',
  host: {
    '[class]': 'cssClass()',
  },
  template: `
    {{ transaction().value }}
  `,
})
export class TransactionValue {
  transaction = input.required<Transaction>();

  cssClass = computed(() => CssClasses[this.transaction().type]);
}
