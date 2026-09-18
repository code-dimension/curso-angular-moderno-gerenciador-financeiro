import { Routes } from '@angular/router';
import { CreateOrEditComponent } from './pages/create-or-edit/create-or-edit.component';
import { getTransactionByIdResolver } from './pages/create-or-edit/resolvers/get-transaction-by-id-resolver';
import { ListComponent } from './pages/list/list.component';
import { ActionLogService } from './store/action-log.service';

export default [
  {
    path: '',
    providers: [ActionLogService],
    children: [
      {
        path: '',
        component: ListComponent,
      },
      {
        path: 'create/new',
        component: CreateOrEditComponent,
      },
      {
        path: 'edit/:id',
        component: CreateOrEditComponent,
        resolve: {
          transaction: getTransactionByIdResolver,
        },
      },
    ],
  },
] as Routes;
