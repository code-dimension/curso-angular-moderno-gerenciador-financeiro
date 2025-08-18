import { Component, contentChild, input, TemplateRef } from '@angular/core';
import { Transaction } from '../../../../shared/transaction/interfaces/transaction';
import { NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'app-transactions-container',
  imports: [NgTemplateOutlet],
  templateUrl: './transactions-container.component.html',
  styleUrl: './transactions-container.component.scss',
})
export class TransactionsContainerComponent {
  transactions = input.required<Transaction[]>();

  itemTemplate = contentChild.required<TemplateRef<unknown>>('item');

  noItemsTemplate = contentChild.required<TemplateRef<unknown>>('noItems');
}
