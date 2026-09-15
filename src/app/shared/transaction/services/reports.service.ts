import { Service } from '@angular/core';
import { Transaction } from '../interfaces/transaction';
import * as XLSX from 'xlsx';

@Service()
export class ReportsService {
  exportToCsv(transactions: Transaction[], fileName = 'transacoes.csv'): void {
    const worksheet = XLSX.utils.json_to_sheet(transactions);
    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, 'Transações');
    XLSX.writeFile(workbook, fileName, { bookType: 'csv' });
  }
}
