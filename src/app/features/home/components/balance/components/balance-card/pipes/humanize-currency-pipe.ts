import { formatCurrency } from '@angular/common';
import {
  DEFAULT_CURRENCY_CODE,
  inject,
  LOCALE_ID,
  Pipe,
  PipeTransform,
} from '@angular/core';

const suffixes = ['K', 'M', 'B', 'T'];

@Pipe({
  name: 'humanizeCurrency',
})
export class HumanizeCurrencyPipe implements PipeTransform {
  private readonly currencyCode = inject(DEFAULT_CURRENCY_CODE);
  private readonly localeId = inject(LOCALE_ID);

  transform(value: number): string {
    const formattedValue = formatCurrency(
      value,
      this.localeId,
      this.getCurrencySymbol(),
    );

    const splittedValue = formattedValue.split('.');

    if (splittedValue.length === 1) {
      return splittedValue[0];
    }

    return this.formatValueWithSuffix(splittedValue);
  }

  private formatValueWithSuffix(splittedValue: string[]) {
    const suffix = this.getSuffix(splittedValue)

    const [firstValue, secondValue] = splittedValue;

    const firstCharOfSecondValue = secondValue.charAt(0);

    if (firstCharOfSecondValue === '0') {
      return `${firstValue}${suffix}`;
    } else {
      return `${firstValue}.${firstCharOfSecondValue}${suffix}`;
    }
  }

  private getSuffix(splittedValue: string[]) {
   return suffixes[splittedValue.length - 2];
  }

  private getCurrencySymbol() {
    const { value } = new Intl.NumberFormat(this.localeId, {
      style: 'currency',
      currency: this.currencyCode,
    })
      .formatToParts()
      .find((part) => part.type === 'currency')!;

    return value;
  }
}
