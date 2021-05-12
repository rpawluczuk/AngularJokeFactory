import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {StructureEditionComponent} from './structure-edition/structure-edition.component';
import {StructureResolveService} from './structure-resolve.service';

const structuresRoutes: Routes = [
  {
    path: 'structures/:id',
    component: StructureEditionComponent,
    resolve: { structure: StructureResolveService }
  }
];

@NgModule({
  imports: [RouterModule.forChild(structuresRoutes)],
  exports: [RouterModule]
})
export class StructuresRoutingModule { }
