import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {JokesModule} from './jokes/jokes.module';
import {JokesService} from './jokes/jokes.service';
import {HttpClientModule} from '@angular/common/http';
import {CoreModule} from './core-module/core.module';
import {JokesRoutingModule} from './jokes/jokes-routing.module';
import {StructuresService} from './structures/structures.service';
import {StructuresModule} from './structures/structures.module';
import {StructuresRoutingModule} from './structures/structures-routing.module';
import {AuthorsModule} from './authors/authors.module';
import {AuthorsRoutingModule} from './authors/authors-routing.module';
import {AuthorsService} from './authors/authors.service';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {TopicModule} from './topics/topic.module';
import {TopicRoutingModule} from './topics/topic-routing.module';
import {TopicService} from './topics/topic.service';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {PaginationService} from './utils/pagination.service';
import {CategorizationModule} from './categorization/categorization.module';
import {CategorizationService} from './categorization/categorization.service';
import {CategorizationRoutingModule} from './categorization/categorization-routing.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    AppRoutingModule,
    AuthorsModule,
    AuthorsRoutingModule,
    BrowserModule,
    CategorizationModule,
    CategorizationRoutingModule,
    CoreModule,
    FontAwesomeModule,
    HttpClientModule,
    JokesRoutingModule,
    JokesModule,
    NgbModule,
    StructuresModule,
    StructuresRoutingModule,
    TopicModule,
    TopicRoutingModule
  ],
  providers: [
    CategorizationService,
    JokesService,
    StructuresService,
    AuthorsService,
    TopicService,
    PaginationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
