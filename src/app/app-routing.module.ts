import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {StructuresListComponent} from './structures/structures-list/structures-list.component';
import {AuthorsListComponent} from './authors/authors-list/authors-list.component';
import {JokeCreationComponent} from './jokes/joke-creation/joke-creation.component';
import {StructureCreationComponent} from './structures/structure-creation/structure-creation.component';
import {AuthorCreationComponent} from './authors/author-creation/author-creation.component';
import {TopicListComponent} from './topics/topic-list/topic-list.component';
import {TopicCreationComponent} from './topics/topic-creation/topic-creation.component';
import {JokesMainViewComponent} from './jokes/jokes-main-view/jokes-main-view.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'jokes' },
  { path: 'jokes', component: JokesMainViewComponent },
  { path: 'joke-creation', component: JokeCreationComponent },
  { path: 'structures', component: StructuresListComponent },
  { path: 'structure-creation', component: StructureCreationComponent },
  { path: 'authors', component: AuthorsListComponent },
  { path: 'author-creation', component: AuthorCreationComponent },
  { path: 'topics', component: TopicListComponent },
  { path: 'topic-creation', component: TopicCreationComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
