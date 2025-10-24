import { Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { getTransactionsResolver } from './resolvers/get-transactions-resolver';

export default [
  {
    path: '',
    component: HomeComponent,
    resolve: {
      transactions: getTransactionsResolver,
    },
  },
] as Routes;
