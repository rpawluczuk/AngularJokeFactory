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
import {StandardBlockCreatorComponent} from '../blocks/structure-blocks/standard-block-creator/standard-block-creator.component';
import { SingleStructureComponent } from './structures-list/single-structure/single-structure.component';
import { StandardBlockComponent } from '../blocks/structure-blocks/standard-block/standard-block.component';


@NgModule({
    declarations: [
        StructuresListComponent,
        StructureEditionComponent,
        StructureCreationComponent,
        StandardBlockCreatorComponent,
        SingleStructureComponent,
        StandardBlockComponent
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
    StandardBlockComponent
  ],
    providers: [
        StructureResolveService
    ]
})
export class StructuresModule {
}
