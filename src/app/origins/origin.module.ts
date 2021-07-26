import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from '../shared-module/shared.module';
import {RouterModule} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
import {OriginDetailsComponent} from './origin-details/origin-details.component';
import {OriginListComponent} from './origin-list/origin-list.component';
import {OriginCreationComponent} from './origin-creation/origin-creation.component';
import {OriginResolveService} from './origin-resolve.service';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";



@NgModule({
  declarations: [
    OriginDetailsComponent,
    OriginListComponent,
    OriginCreationComponent
  ],
    imports: [
        CommonModule,
        SharedModule,
        RouterModule,
        ReactiveFormsModule,
        FontAwesomeModule
    ],
  exports: [
    OriginCreationComponent,
    OriginListComponent
  ],
  providers: [
    OriginResolveService
  ]
})
export class OriginModule { }
