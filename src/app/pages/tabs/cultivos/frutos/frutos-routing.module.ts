import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FrutosPage } from './frutos.page';

const routes: Routes = [
  {
    path: '',
    component: FrutosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FrutosPageRoutingModule {}
