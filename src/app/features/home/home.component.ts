import { Component, input } from '@angular/core';
import { Balance } from './components/balance/balance';
import { Transaction } from '@shared/transaction/interfaces/transaction';

@Component({
  selector: 'app-home',
  imports: [Balance],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  transactions = input.required<Transaction[]>();
}
