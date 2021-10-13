import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CategorizationCreationComponent} from './categorization-creation/categorization-creation.component';
import {CategorizationListComponent} from './categorization-list/categorization-list.component';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import { SingleCategorizationComponent } from './categorization-list/single-categorization/single-categorization.component';


@NgModule({
  declarations: [
    CategorizationCreationComponent,
    CategorizationListComponent,
    SingleCategorizationComponent],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule
  ],
  exports: [
    CategorizationCreationComponent,
    CategorizationListComponent
  ]
})
export class CategorizationModule {
}
