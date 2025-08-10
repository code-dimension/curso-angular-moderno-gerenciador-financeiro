import { inject, Injectable } from '@angular/core';
import { Transaction, TransactionPayload } from '../interfaces/transaction';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TransactionsService {
  private httpClient = inject(HttpClient);

  getAll() {
    return this.httpClient.get<Transaction[]>(
      'http://localhost:3000/transactions',
    );
  }

  post(payload: TransactionPayload) {
    return this.httpClient.post<Transaction>(
      'http://localhost:3000/transactions',
      payload
    );
  }
}
