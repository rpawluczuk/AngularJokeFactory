import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {StructureDetailsComponent} from './structure-details/structure-details.component';
import {StructureResolveService} from './structure-resolve.service';

const structuresRoutes: Routes = [
  {
    path: 'structures/:id',
    component: StructureDetailsComponent,
    resolve: { structure: StructureResolveService }
  }
];

@NgModule({
  imports: [RouterModule.forChild(structuresRoutes)],
  exports: [RouterModule]
})
export class StructuresRoutingModule { }
