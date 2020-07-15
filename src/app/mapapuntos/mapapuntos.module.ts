import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MapapuntosPageRoutingModule } from './mapapuntos-routing.module';

import { MapapuntosPage } from './mapapuntos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MapapuntosPageRoutingModule
  ],
  declarations: [MapapuntosPage]
})
export class MapapuntosPageModule {}
