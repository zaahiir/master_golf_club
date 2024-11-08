import { Routes } from '@angular/router';

export const routes: Routes = [    
  {
    path: '',
    loadChildren: () => import('./main/routes').then(m => m.mainRoutes)
  },
];
