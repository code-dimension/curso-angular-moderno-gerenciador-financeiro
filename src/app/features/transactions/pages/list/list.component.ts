import {
  ChangeDetectionStrategy,
  Component,
  computed,
  debounced,
  inject,
  injectAsync,
  linkedSignal,
  signal,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';
import { NoTransactions } from './components/no-transactions/no-transactions';
import { TransactionItem } from './components/transaction-item/transaction-item';
import { TransactionsContainerComponent } from './components/transactions-container/transactions-container.component';
import { ConfirmationDialogService } from '@shared/dialog/confirmation/services/confirmation-dialog.service';
import { FeedbackService } from '@shared/feedback/services/feedback.service';
import { Transaction } from '@shared/transaction/interfaces/transaction';
import { TransactionsService } from '@shared/transaction/services/transactions.service';
import { SearchComponent } from './components/search/search.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { TransactionType } from '../../../../shared/transaction/enums/transaction-type';
import { GetTransactionsFilter } from '../../../../shared/transaction/interfaces/get-transations-filter';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';

const typeFilterOptions = [
  { value: 'all', label: 'Todas' },
  { value: TransactionType.INCOME, label: 'Receitas' },
  { value: TransactionType.OUTCOME, label: 'Despesas' },
];

@Component({
  selector: 'app-list',
  imports: [
    TransactionItem,
    NoTransactions,
    MatButtonModule,
    RouterLink,
    TransactionsContainerComponent,
    SearchComponent,
    MatProgressBarModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    FormsModule,
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListComponent {
  private transactionsService = inject(TransactionsService);
  private feedbackService = inject(FeedbackService);
  private router = inject(Router);
  private confirmationDialogService = inject(ConfirmationDialogService);
  private activatedRoute = inject(ActivatedRoute);
  private reportsService = injectAsync(
    () => import('./../../../../shared/transaction/services/reports.service'),
  );

  typeFilterOptions = typeFilterOptions;

  filters = signal<GetTransactionsFilter>({
    search: '',
    type: 'all',
  });

  filtersWithDebounce = debounced(this.filters, 500);

  resourceRef = this.transactionsService.getAllWithHttpResource(
    this.filtersWithDebounce.value,
  );

  search = linkedSignal(() => this.filters().search, {
    set: (value) => {
      this.filters.update((filters) => {
        return {
          ...filters,
          search: value,
        };
      });
    },
  });

  type = linkedSignal(() => this.filters().type, {
    set: (value) => {
      this.filters.update((filters) => {
        return {
          ...filters,
          type: value,
        };
      });
    },
  });

  transactions = computed(() => this.resourceRef.value());

  isLoading = computed(() => this.resourceRef.isLoading());

  edit(transaction: Transaction) {
    this.router.navigate(['edit', transaction.id], {
      relativeTo: this.activatedRoute,
    });
  }

  remove(transaction: Transaction) {
    this.confirmationDialogService
      .open({
        title: 'Deletar transação',
        message: 'Você realmente quer deletar a transação?',
      })
      .subscribe({
        next: () => {
          this.transactionsService.delete(transaction.id).subscribe({
            next: () => {
              this.removeTransacationFromArray(transaction);
              this.feedbackService.success('Transação removida com sucesso!');
            },
          });
        },
      });
  }

  async export() {
    (await this.reportsService()).exportToCsv(this.transactions());
  }

  private removeTransacationFromArray(transaction: Transaction) {
    this.resourceRef.update((transations) =>
      transations.filter((item) => item.id !== transaction.id),
    );
  }
}
