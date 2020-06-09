import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { JokesModule } from './jokes/jokes.module';
import {JokesService} from './jokes/jokes.service';
import {HttpClientModule} from '@angular/common/http';
import {CoreModule} from './core-module/core.module';
import {JokesRoutingModule} from './jokes/jokes-routing.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    JokesRoutingModule,
    JokesModule,
    HttpClientModule,
    CoreModule
  ],
  providers: [JokesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
