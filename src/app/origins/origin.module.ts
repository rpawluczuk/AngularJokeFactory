import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from '../shared-module/shared.module';
import {RouterModule} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
import {OriginEditionComponent} from './origin-edition/origin-edition.component';
import {OriginListComponent} from './origin-list/origin-list.component';
import {OriginCreationComponent} from './origin-creation/origin-creation.component';
import {OriginResolveService} from './origin-resolve.service';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import { OriginBlockComponent } from './origin-edition/origin-blocks/origin-block/origin-block.component';
import { OriginBlockCreatorComponent } from './origin-edition/origin-blocks/origin-block-creator/origin-block-creator.component';
import { ConnectedOriginBlockComponent } from './origin-edition/origin-blocks/connected-origin-block/connected-origin-block.component';



@NgModule({
  declarations: [
    OriginEditionComponent,
    OriginListComponent,
    OriginCreationComponent,
    OriginBlockComponent,
    OriginBlockCreatorComponent,
    ConnectedOriginBlockComponent,
  ],
    imports: [
        CommonModule,
        SharedModule,
        RouterModule,
        ReactiveFormsModule,
        FontAwesomeModule,
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
