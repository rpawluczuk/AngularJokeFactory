import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CategorizationCreationComponent} from './categorization-creation/categorization-creation.component';
import {CategorizationListComponent} from './categorization-list/categorization-list.component';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import { SingleCategorizationComponent } from './categorization-list/single-categorization/single-categorization.component';
import { CategorizationEditionComponent } from './categorization-edition/categorization-edition.component';
import {CategorizationResolveService} from "./categorization-resolve.service";
import { CategorizationPaginationComponent } from './categorization-list/categorization-pagination/categorization-pagination.component';
import {NgbPaginationModule} from "@ng-bootstrap/ng-bootstrap";
import { CategorizationSearchComponent } from './categorization-list/categorization-search/categorization-search.component';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";


@NgModule({
  declarations: [
    CategorizationCreationComponent,
    CategorizationListComponent,
    SingleCategorizationComponent,
    CategorizationEditionComponent,
    CategorizationPaginationComponent,
    CategorizationSearchComponent],
    imports: [
        CommonModule,
        RouterModule,
        ReactiveFormsModule,
        NgbPaginationModule,
        FontAwesomeModule
    ],
  exports: [
    CategorizationCreationComponent,
    CategorizationListComponent
  ],
  providers: [
    CategorizationResolveService
  ]
})
export class CategorizationModule {
}
