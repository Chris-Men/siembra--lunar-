import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FrutosPageRoutingModule } from './frutos-routing.module';

import { FrutosPage } from './frutos.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FrutosPageRoutingModule,
    SharedModule
  ],
  declarations: [FrutosPage]
})
export class FrutosPageModule {}
