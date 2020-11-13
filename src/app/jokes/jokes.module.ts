import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JokesListComponent } from './jokes-list/jokes-list.component';
import {SharedModule} from '../shared-module/shared.module';
import { JokeEditionComponent } from './joke-edition/joke-edition.component';
import {RouterModule} from '@angular/router';
import {JokeResolveService} from './joke-resolve.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgMultiSelectDropDownModule} from 'ng-multiselect-dropdown';
import {JokeCreationComponent} from './joke-creation/joke-creation.component';



@NgModule({
  declarations: [JokesListComponent, JokeCreationComponent,
    JokeEditionComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    NgMultiSelectDropDownModule.forRoot()
  ],
  exports: [
    JokeCreationComponent,
    JokesListComponent
  ],
  providers: [
    JokeResolveService
  ]
})
export class JokesModule { }
