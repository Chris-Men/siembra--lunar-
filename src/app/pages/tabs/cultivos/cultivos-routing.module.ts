import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CultivosPage } from './cultivos.page';

const routes: Routes = [
  {
    path: '',
    component: CultivosPage
  },
  {
    path: 'frutos',
    loadChildren: () => import('./frutos/frutos.module').then( m => m.FrutosPageModule)
  },
  {
    path: 'hortalizas',
    loadChildren: () => import('./hortalizas/hortalizas.module').then( m => m.HortalizasPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CultivosPageRoutingModule {}
