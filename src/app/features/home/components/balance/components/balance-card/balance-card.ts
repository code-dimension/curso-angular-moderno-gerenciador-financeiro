import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { HumanizeCurrencyPipe } from './pipes/humanize-currency-pipe';

type CardType = 'income' | 'outcome' | 'balance';

enum ValueCssClass {
  income = 'income',
  outcome = 'outcome',
  zero = 'zero',
}

@Component({
  selector: 'app-balance-card',
  imports: [MatCardModule, HumanizeCurrencyPipe],
  templateUrl: './balance-card.html',
  styleUrl: './balance-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class BalanceCard {
  type = input.required<CardType>();
  label = input.required<string>();
  value = input.required<number>();

  cssClass = computed<ValueCssClass>(() => {
    if (this.type() === 'income') {
      return ValueCssClass.income;
    }

    if (this.type() === 'outcome') {
      return ValueCssClass.outcome;
    }

    if (this.value() === 0) {
      return ValueCssClass.zero;
    }

    return this.value() > 0 ? ValueCssClass.income : ValueCssClass.outcome;
  });
}
