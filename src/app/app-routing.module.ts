import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {JokesListComponent} from './jokes/jokes-main-view/jokes-list/jokes-list.component';
import {StructuresListComponent} from './structures/structures-list/structures-list.component';
import {AuthorsListComponent} from './authors/authors-list/authors-list.component';
import {JokeCreationComponent} from './jokes/joke-creation/joke-creation.component';
import {StructureCreationComponent} from './structures/structure-creation/structure-creation.component';
import {AuthorCreationComponent} from './authors/author-creation/author-creation.component';
import {OriginListComponent} from './origins/origin-list/origin-list.component';
import {OriginCreationComponent} from './origins/origin-creation/origin-creation.component';
import {JokesMainViewComponent} from './jokes/jokes-main-view/jokes-main-view.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'jokes' },
  { path: 'jokes', component: JokesMainViewComponent },
  { path: 'joke-creation', component: JokeCreationComponent },
  { path: 'structures', component: StructuresListComponent },
  { path: 'structure-creation', component: StructureCreationComponent },
  { path: 'authors', component: AuthorsListComponent },
  { path: 'author-creation', component: AuthorCreationComponent },
  { path: 'origins', component: OriginListComponent },
  { path: 'origin-creation', component: OriginCreationComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
