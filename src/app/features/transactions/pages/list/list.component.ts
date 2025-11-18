import { ChangeDetectionStrategy, Component, computed, inject, Signal, signal } from '@angular/core';
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
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { debounceTime } from 'rxjs';
import { MatProgressBarModule } from '@angular/material/progress-bar';

function typeDelay(signal: Signal<string>) {
  const observable = toObservable(signal).pipe(debounceTime(500));
  return toSignal(observable, { initialValue: '' });
}

@Component({
  selector: 'app-list',
  imports: [
    TransactionItem,
    NoTransactions,
    MatButtonModule,
    RouterLink,
    TransactionsContainerComponent,
    SearchComponent,
    MatProgressBarModule
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class ListComponent {
  private transactionsService = inject(TransactionsService);
  private feedbackService = inject(FeedbackService);
  private router = inject(Router);
  private confirmationDialogService = inject(ConfirmationDialogService);
  private activatedRoute = inject(ActivatedRoute);

  searchTerm = signal('');

  resourceRef = this.transactionsService.getAllWithHttpResource(
    typeDelay(this.searchTerm),
  );

  transactions = computed(() => this.resourceRef.value())

  isLoading = computed(() => this.resourceRef.isLoading())

  edit(transaction: Transaction) {
    this.router.navigate(['edit', transaction.id], { relativeTo: this.activatedRoute });
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

  private removeTransacationFromArray(transaction: Transaction) {
    this.resourceRef.update((transations) =>
      transations.filter((item) => item.id !== transaction.id),
    );
  }
}
