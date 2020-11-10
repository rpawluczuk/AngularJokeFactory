import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../shared-module/shared.module';
import {RouterModule} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
import {StructuresListComponent} from './structures-list/structures-list.component';
import {StructureDetailsComponent} from './structure-details/structure-details.component';
import {StructureResolveService} from './structure-resolve.service';
import {StructureCreationComponent} from './structure-creation/structure-creation.component';


@NgModule({
  declarations: [StructuresListComponent, StructureDetailsComponent,
    StructureCreationComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    ReactiveFormsModule
  ],
  exports: [
    StructureCreationComponent,
    StructuresListComponent
  ],
  providers: [
    StructureResolveService
  ]
})
export class StructuresModule {
}
