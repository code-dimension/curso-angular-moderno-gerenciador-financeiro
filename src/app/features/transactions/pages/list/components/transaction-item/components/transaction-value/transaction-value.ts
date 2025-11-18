import { CurrencyPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { TransactionType } from '@shared/transaction/enums/transaction-type';
import { Transaction } from '@shared/transaction/interfaces/transaction';

const CssClasses = {
  [TransactionType.INCOME]: 'income',
  [TransactionType.OUTCOME]: 'outcome'
}

@Component({
  selector: 'app-transaction-value',
  imports: [CurrencyPipe],
  styleUrl: './transaction-value.scss',
  host: {
    '[class]': 'cssClass()',
  },
  template: `
    {{ transaction().value | currency }}
  `,
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class TransactionValue {
  transaction = input.required<Transaction>();

  cssClass = computed(() => CssClasses[this.transaction().type]);
}
