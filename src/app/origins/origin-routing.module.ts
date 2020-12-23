import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {OriginDetailsComponent} from './origin-details/origin-details.component';
import {OriginResolveService} from './origin-resolve.service';

const originRoutes: Routes = [
  {
    path: 'origins/:id',
    component: OriginDetailsComponent,
    resolve: { origin: OriginResolveService }
  }
];

@NgModule({
  imports: [RouterModule.forChild(originRoutes)],
  exports: [RouterModule]
})
export class OriginRoutingModule { }
