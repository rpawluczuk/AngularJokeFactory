import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategorizationRoutingModule } from './categorization-routing.module';
import { CategorizationCreationComponent } from './categorization-creation/categorization-creation.component';
import { CategorizationListComponent } from './categorization-list/categorization-list.component';


@NgModule({
  declarations: [CategorizationCreationComponent, CategorizationListComponent],
  imports: [
    CommonModule,
    CategorizationRoutingModule
  ]
})
export class CategorizationModule { }
