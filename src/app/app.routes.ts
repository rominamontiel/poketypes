import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'tipo-enemigo',
        pathMatch: 'full',
      },
      {
        path: 'tipo-enemigo',
        loadComponent: () =>
          import('./pages/enemy-view/enemy-view.component').then(
            (m) => m.EnemyViewComponent
          ),
      },
      {
        path: 'mi-tipo',
        loadComponent: () =>
          import('./pages/my-type-view/my-type-view.component').then(
            (m) => m.MyTypeViewComponent
          ),
      },
      {
        path: 'busqueda',
        loadComponent: () =>
          import('./pages/search-view/search-view.component').then(
            (m) => m.SearchViewComponent
          ),
      },
      {
        path: '**',
        loadComponent: () =>
          import('./pages/enemy-view/enemy-view.component').then(
            (m) => m.EnemyViewComponent
          ),
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
