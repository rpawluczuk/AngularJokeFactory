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
import {StandardBlockCreatorComponent} from './blocks/standard-block-creator/standard-block-creator.component';
import {ArrowBlockComponent} from './blocks/arrow-block/arrow-block.component';
import {ActionBlockComponent} from './blocks/action-block/action-block.component';
import { SingleStructureComponent } from './structures-list/single-structure/single-structure.component';
import { StandardBlockComponent } from './blocks/standard-block/standard-block.component';


@NgModule({
    declarations: [
        StructuresListComponent,
        StructureEditionComponent,
        StructureCreationComponent,
        StandardBlockCreatorComponent,
        ArrowBlockComponent,
        ActionBlockComponent,
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
        StructuresListComponent
    ],
    providers: [
        StructureResolveService
    ]
})
export class StructuresModule {
}
