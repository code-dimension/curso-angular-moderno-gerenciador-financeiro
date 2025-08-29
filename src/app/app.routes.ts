import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./core/layout/layout').then((m) => m.Layout),
    children: [
      {
        path: '',
        loadChildren: () => import('./features/home/routes'),
      },
    ],
  },
  {
    path: 'auth',
    loadChildren: () => import('./core/auth/pages/routes'),
  },
];
