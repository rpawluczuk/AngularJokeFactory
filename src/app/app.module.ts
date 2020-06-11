import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { JokesModule } from './jokes/jokes.module';
import {JokesService} from './jokes/jokes.service';
import {HttpClientModule} from '@angular/common/http';
import {CoreModule} from './core-module/core.module';
import {JokesRoutingModule} from './jokes/jokes-routing.module';
import {StructuresService} from './structures/structures.service';
import {StructuresModule} from './structures/structures.module';
import {StructuresRoutingModule} from './structures/structures-routing.module';

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
    StructuresRoutingModule
  ],
  providers: [
    JokesService,
    StructuresService],
  bootstrap: [AppComponent]
})
export class AppModule { }
