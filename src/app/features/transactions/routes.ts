import { Routes } from "@angular/router";
import { CreateOrEditComponent } from "./pages/create-or-edit/create-or-edit.component";
import { getTransactionByIdResolver } from "./pages/create-or-edit/resolvers/get-transaction-by-id-resolver";
import { ListComponent } from "./pages/list/list.component";
import { getTransactionsResolver } from "./pages/list/resolvers/get-transactions-resolver";

export default [
  {
    path: '',
    component: ListComponent,
    resolve: {
      transactions: getTransactionsResolver
    }
  },
  {
    path: 'create/new',
    component: CreateOrEditComponent
  },
  {
    path: 'edit/:id',
    component: CreateOrEditComponent,
    resolve: {
      transaction: getTransactionByIdResolver
    }
  }
] as Routes;
