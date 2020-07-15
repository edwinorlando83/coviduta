import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormularioPageRoutingModule } from './formulario-routing.module';

import { FormularioPage } from './formulario.page';
import { MasinfoPageModule } from '../masinfo/masinfo.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormularioPageRoutingModule
    ,MasinfoPageModule
  ],
  declarations: [FormularioPage]
})
export class FormularioPageModule {}
