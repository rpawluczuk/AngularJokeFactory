import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {JokeDetailsComponent} from './joke-details/joke-details.component';
import {JokeResolveService} from './joke-resolve.service';

const jokesRoutes: Routes = [
  {
    path: 'jokes/:id',
    component: JokeDetailsComponent,
    resolve: { joke: JokeResolveService }
  }
];

@NgModule({
  imports: [RouterModule.forChild(jokesRoutes)],
  exports: [RouterModule]
})
export class JokesRoutingModule { }
