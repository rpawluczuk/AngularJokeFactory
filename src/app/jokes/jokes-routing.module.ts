import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {JokeEditionComponent} from './joke-edition/joke-edition.component';
import {JokeResolveService} from './joke-resolve.service';

const jokesRoutes: Routes = [
  {
    path: 'jokes/:id',
    component: JokeEditionComponent,
    resolve: { joke: JokeResolveService }
  }
];

@NgModule({
  imports: [RouterModule.forChild(jokesRoutes)],
  exports: [RouterModule]
})
export class JokesRoutingModule { }
