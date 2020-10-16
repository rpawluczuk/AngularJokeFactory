import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JokesListComponent } from './jokes-list/jokes-list.component';
import {SharedModule} from '../shared-module/shared.module';
import { JokeDetailsComponent } from './joke-details/joke-details.component';
import {RouterModule} from '@angular/router';
import {JokeResolveService} from './joke-resolve.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgMultiSelectDropDownModule} from 'ng-multiselect-dropdown';



@NgModule({
  declarations: [JokesListComponent, JokeDetailsComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    NgMultiSelectDropDownModule.forRoot()
  ],
  exports: [
    JokesListComponent
  ],
  providers: [
    JokeResolveService
  ]
})
export class JokesModule { }
