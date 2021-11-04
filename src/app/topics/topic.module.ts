import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from '../shared-module/shared.module';
import {RouterModule} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
import {TopicEditionComponent} from './topic-edition/topic-edition.component';
import {TopicListComponent} from './topic-list/topic-list.component';
import {TopicCreationComponent} from './topic-creation/topic-creation.component';
import {TopicResolveService} from './topic-resolve.service';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import { TopicBlockComponent } from './topic-edition/topic-blocks/topic-block/topic-block.component';
import { TopicBlockCreatorComponent } from './topic-edition/topic-blocks/topic-block-creator/topic-block-creator.component';
import { ConnectedTopicBlockComponent } from './topic-edition/topic-blocks/connected-topic-block/connected-topic-block.component';
import { ChildTopicBlockCreatorComponent } from './topic-edition/topic-blocks/child-topic-block-creator/child-topic-block-creator.component';
import { TopicChildCreatorRowComponent } from './topic-edition/topic-child-creator-row/topic-child-creator-row.component';
import { TopicSearchComponent } from './topic-list/topic-search/topic-search.component';
import { TopicPaginationComponent } from './topic-list/topic-pagination/topic-pagination.component';
import {NgbPaginationModule} from "@ng-bootstrap/ng-bootstrap";



@NgModule({
  declarations: [
    TopicEditionComponent,
    TopicListComponent,
    TopicCreationComponent,
    TopicBlockComponent,
    TopicBlockCreatorComponent,
    ConnectedTopicBlockComponent,
    ChildTopicBlockCreatorComponent,
    TopicChildCreatorRowComponent,
    TopicSearchComponent,
    TopicPaginationComponent,
  ],
    imports: [
        CommonModule,
        SharedModule,
        RouterModule,
        ReactiveFormsModule,
        FontAwesomeModule,
        NgbPaginationModule,
    ],
    exports: [
        TopicCreationComponent,
        TopicListComponent,
        TopicBlockComponent,
        TopicChildCreatorRowComponent,
        ChildTopicBlockCreatorComponent
    ],
  providers: [
    TopicResolveService
  ]
})
export class TopicModule { }
