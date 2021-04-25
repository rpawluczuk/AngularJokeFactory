import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../shared-module/shared.module';
import {RouterModule} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
import {StructuresListComponent} from './structures-list/structures-list.component';
import {StructureDetailsComponent} from './structure-details/structure-details.component';
import {StructureResolveService} from './structure-resolve.service';
import {StructureCreationComponent} from './structure-creation/structure-creation.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {StandardBlockComponent} from './structure-creation/standard-block/standard-block.component';
import {ArrowBlockComponent} from './structure-creation/arrow-block/arrow-block.component';
import {BlankBlockComponent} from './structure-creation/blank-block/blank-block.component';


@NgModule({
    declarations: [
        StructuresListComponent,
        StructureDetailsComponent,
        StructureCreationComponent,
        StandardBlockComponent,
        ArrowBlockComponent,
        BlankBlockComponent
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
