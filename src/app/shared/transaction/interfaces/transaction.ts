import { TransactionType } from "../enums/transaction-type";

export interface Transaction {
  title: string;
  value: number;
  type: TransactionType;
}
