import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {JokesListComponent} from './jokes-main-view/jokes-list/jokes-list.component';
import {SharedModule} from '../shared-module/shared.module';
import {JokeEditionComponent} from './joke-edition/joke-edition.component';
import {RouterModule} from '@angular/router';
import {JokeResolveService} from './joke-resolve.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgMultiSelectDropDownModule} from 'ng-multiselect-dropdown';
import {JokeCreationComponent} from './joke-creation/joke-creation.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { JokesMainViewComponent } from './jokes-main-view/jokes-main-view.component';
import { JokesPaginationComponent } from './jokes-main-view/jokes-pagination/jokes-pagination.component';
import { JokesFilteringComponent } from './jokes-main-view/jokes-filering/jokes-filtering.component';
import {StructuresModule} from '../structures/structures.module';
import {JokeBlockCreatorComponent} from '../blocks/joke-blocks/joke-block-creator/joke-block-creator.component';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";



@NgModule({
  declarations: [
    JokesListComponent,
    JokeCreationComponent,
    JokeEditionComponent,
    JokesMainViewComponent,
    JokesPaginationComponent,
    JokesFilteringComponent,
    JokeBlockCreatorComponent
  ],
    imports: [
        CommonModule,
        SharedModule,
        RouterModule,
        ReactiveFormsModule,
        FormsModule,
        NgMultiSelectDropDownModule.forRoot(),
        NgbModule,
        StructuresModule,
        FontAwesomeModule,
    ],
  exports: [
    JokeCreationComponent,
    JokesListComponent,
    JokesMainViewComponent,
  ],
  providers: [
    JokeResolveService
  ]
})
export class JokesModule {
}
