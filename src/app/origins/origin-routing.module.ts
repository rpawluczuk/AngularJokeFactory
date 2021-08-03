import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {OriginEditionComponent} from './origin-edition/origin-edition.component';
import {OriginResolveService} from './origin-resolve.service';

const originRoutes: Routes = [
  {
    path: 'origins/:id',
    component: OriginEditionComponent,
    resolve: { origin: OriginResolveService }
  }
];

@NgModule({
  imports: [RouterModule.forChild(originRoutes)],
  exports: [RouterModule]
})
export class OriginRoutingModule { }
