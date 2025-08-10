import { Component, inject, Injector, OnInit, signal } from '@angular/core';
import { Balance } from './components/balance/balance';
import { TransactionItem } from './components/transaction-item/transaction-item';
import { Transaction } from '../../shared/transaction/interfaces/transaction';
import { TransactionType } from '../../shared/transaction/enums/transaction-type';
import { NoTransactions } from './components/no-transactions/no-transactions';
import { HttpClient } from '@angular/common/http';
import { TransactionsService } from '../../shared/transaction/services/transactions.service';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';

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
  private router = inject(Router);

  transactions = signal<Transaction[]>([]);

  ngOnInit(): void {
    this.getTransactions();
  }

  edit(transaction : Transaction) {
    this.router.navigate(['edit', transaction.id])
  }

  private getTransactions() {
    this.transactionsService.getAll().subscribe({
      next: (transactions) => {
        this.transactions.set(transactions);
      },
    });
  }
}
