import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {JokesListComponent} from './jokes/jokes-list/jokes-list.component';
import {StructuresListComponent} from './structures/structures-list/structures-list.component';
import {AuthorsListComponent} from './authors/authors-list/authors-list.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'jokes' },
  { path: 'jokes', component: JokesListComponent },
  { path: 'structures', component: StructuresListComponent },
  { path: 'authors', component: AuthorsListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
