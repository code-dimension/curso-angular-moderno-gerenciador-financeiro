import { ChangeDetectionStrategy, Component, contentChild, input, TemplateRef } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { Transaction } from '@shared/transaction/interfaces/transaction';

@Component({
  selector: 'app-transactions-container',
  imports: [NgTemplateOutlet],
  templateUrl: './transactions-container.component.html',
  styleUrl: './transactions-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class TransactionsContainerComponent {
  transactions = input.required<Transaction[]>();

  itemTemplate = contentChild.required<TemplateRef<unknown>>('item');

  noItemsTemplate = contentChild.required<TemplateRef<unknown>>('noItems');
}
