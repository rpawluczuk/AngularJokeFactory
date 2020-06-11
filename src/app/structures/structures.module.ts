import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from '../shared-module/shared.module';
import {RouterModule} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
import { StructuresListComponent } from './structures-list/structures-list.component';
import { StructureDetailsComponent } from './structure-details/structure-details.component';
import {StructureResolveService} from './structure-resolve.service';



@NgModule({
  declarations: [StructuresListComponent, StructureDetailsComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    ReactiveFormsModule
  ],
  exports: [
    StructuresListComponent
  ],
  providers: [
    StructureResolveService
  ]
})
export class StructuresModule { }
