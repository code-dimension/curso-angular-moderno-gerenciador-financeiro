import { inject, Injectable, Signal } from '@angular/core';
import { Transaction, TransactionPayload } from '../interfaces/transaction';
import {
  HttpClient,
  HttpParams,
  httpResource,
  HttpResourceRequest,
} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TransactionsService {
  private httpClient = inject(HttpClient);

  getAll(searchTerm?: string) {
    let httpParams = new HttpParams();

    if (searchTerm) {
      httpParams = httpParams.append('q', searchTerm);
    }

    return this.httpClient.get<Transaction[]>('/api/transactions', {
      params: httpParams,
    });
  }

  getAllWithHttpResource(searchTerm: Signal<string>) {
    return httpResource<Transaction[]>(
      () => {
        let httpParams = new HttpParams();

        if (searchTerm()) {
          httpParams = httpParams.append('q', searchTerm());
        }

        return {
          url: '/api/transactions',
          params: httpParams,
        } as HttpResourceRequest;
      },
      {
        defaultValue: [],
      },
    );
  }

  getById(id: string) {
    return this.httpClient.get<Transaction>(`/api/transactions/${id}`);
  }

  post(payload: TransactionPayload) {
    return this.httpClient.post<Transaction>('/api/transactions', payload);
  }

  put(id: number, payload: TransactionPayload) {
    return this.httpClient.put<Transaction>(`/api/transactions/${id}`, payload);
  }

  delete(id: number) {
    return this.httpClient.delete<Transaction>(`/api/transactions/${id}`);
  }
}
