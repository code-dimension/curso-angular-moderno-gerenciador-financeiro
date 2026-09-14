import { TransactionType } from '../enums/transaction-type';

export interface GetTransactionsFilter {
  type: TransactionType | 'all';
  search: string;
}
