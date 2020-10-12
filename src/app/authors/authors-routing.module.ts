import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthorDetailsComponent} from './author-details/author-details.component';
import {AuthorResolveService} from './author-resolve.service';

const authorsRoutes: Routes = [
  {
    path: 'authors/:id',
    component: AuthorDetailsComponent,
    resolve: { author: AuthorResolveService }
  }
];

@NgModule({
  imports: [RouterModule.forChild(authorsRoutes)],
  exports: [RouterModule]
})
export class AuthorsRoutingModule { }
