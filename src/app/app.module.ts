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
import {OriginModule} from './origins/origin.module';
import {OriginRoutingModule} from './origins/origin-routing.module';
import {OriginService} from './origins/origin.service';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {PaginationService} from './utils/pagination.service';

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        CoreModule,
        JokesRoutingModule,
        JokesModule,
        StructuresModule,
        StructuresRoutingModule,
        AuthorsModule,
        AuthorsRoutingModule,
        OriginModule,
        OriginRoutingModule,
        NgbModule,
        FontAwesomeModule
    ],
    providers: [
        JokesService,
        StructuresService,
        AuthorsService,
        OriginService,
        PaginationService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
