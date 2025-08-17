import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Injector,
  OnInit,
  signal,
} from '@angular/core';
import { Balance } from './components/balance/balance';
import { TransactionItem } from './components/transaction-item/transaction-item';
import { Transaction } from '../../shared/transaction/interfaces/transaction';
import { TransactionType } from '../../shared/transaction/enums/transaction-type';
import { NoTransactions } from './components/no-transactions/no-transactions';
import { HttpClient } from '@angular/common/http';
import { TransactionsService } from '../../shared/transaction/services/transactions.service';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import { FeedbackService } from '../../shared/feedback/services/feedback.service';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { filter } from 'rxjs';
import { ConfirmationDialogService } from '../../shared/dialog/confirmation/services/confirmation-dialog.service';

@Component({
  selector: 'app-home',
  imports: [
    Balance,
    TransactionItem,
    NoTransactions,
    MatButtonModule,
    RouterLink,
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit {
  private transactionsService = inject(TransactionsService);
  private feedbackService = inject(FeedbackService);
  private router = inject(Router);
  private confirmationDialogService = inject(ConfirmationDialogService);

  transactions = signal<Transaction[]>([]);

  ngOnInit(): void {
    this.getTransactions();
  }

  edit(transaction: Transaction) {
    this.router.navigate(['edit', transaction.id]);
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
    this.transactions.update((transations) =>
      transations.filter((item) => item.id !== transaction.id),
    );
  }

  private getTransactions() {
    this.transactionsService.getAll().subscribe({
      next: (transactions) => {
        this.transactions.set(transactions);
      },
    });
  }
}
