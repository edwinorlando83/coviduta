import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MapapuntosPage } from './mapapuntos.page';

const routes: Routes = [
  {
    path: '',
    component: MapapuntosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MapapuntosPageRoutingModule {}
