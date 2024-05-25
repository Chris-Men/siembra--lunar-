import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HortalizasPageRoutingModule } from './hortalizas-routing.module';

import { HortalizasPage } from './hortalizas.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HortalizasPageRoutingModule,
    SharedModule
  ],
  declarations: [HortalizasPage]
})
export class HortalizasPageModule {}
