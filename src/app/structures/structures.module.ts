import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../shared-module/shared.module';
import {RouterModule} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
import {StructuresListComponent} from './structures-list/structures-list.component';
import {StructureEditionComponent} from './structure-edition/structure-edition.component';
import {StructureResolveService} from './structure-resolve.service';
import {StructureCreationComponent} from './structure-creation/structure-creation.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {StructureBlockCreatorComponent} from '../blocks/structure-blocks/structure-block-creator/structure-block-creator.component';
import { SingleStructureComponent } from './structures-list/single-structure/single-structure.component';
import { StructureBlockComponent } from '../blocks/structure-blocks/structure-block/structure-block.component';
import { SingleStructureDetailsComponent } from './structures-list/single-structure/single-structure-details/single-structure-details.component';


@NgModule({
    declarations: [
        StructuresListComponent,
        StructureEditionComponent,
        StructureCreationComponent,
        StructureBlockCreatorComponent,
        SingleStructureComponent,
        StructureBlockComponent,
        SingleStructureDetailsComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        RouterModule,
        ReactiveFormsModule,
        FontAwesomeModule
    ],
  exports: [
    StructureCreationComponent,
    StructuresListComponent,
    StructureBlockComponent
  ],
    providers: [
        StructureResolveService
    ]
})
export class StructuresModule {
}
