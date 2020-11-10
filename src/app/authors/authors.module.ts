import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthorDetailsComponent } from './author-details/author-details.component';
import { AuthorsListComponent } from './authors-list/authors-list.component';
import {SharedModule} from '../shared-module/shared.module';
import {RouterModule} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
import {AuthorResolveService} from './author-resolve.service';
import { AuthorCreationComponent } from './author-creation/author-creation.component';



@NgModule({
  declarations: [AuthorDetailsComponent, AuthorsListComponent,
    AuthorCreationComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    ReactiveFormsModule
  ],
  exports: [
    AuthorCreationComponent,
    AuthorsListComponent
  ],
  providers: [
    AuthorResolveService
  ]
})
export class AuthorsModule { }
