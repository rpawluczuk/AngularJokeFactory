import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TopicGroupCreatorComponent} from './topic-group-creator/topic-group-creator.component';
import {ReactiveFormsModule} from '@angular/forms';
import {CategorizationModule} from '../categorization/categorization.module';
import {TopicModule} from '../topics/topic.module';
import {NgMultiSelectDropDownModule} from 'ng-multiselect-dropdown';
import { TopicGroupBlockCreatorComponent } from './blocks/topic-group-block-creator/topic-group-block-creator.component';
import { StartingJokeTopicBlockComponent } from './blocks/starting-joke-topic-block/starting-joke-topic-block.component';
import { ConnectedJokeTopicBlockComponent } from './blocks/connected-joke-topic-block/connected-joke-topic-block.component';
import { ConnectedJokeTopicRowComponent } from './topic-group-creator/connected-joke-topic-row/connected-joke-topic-row.component';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {NgbDropdownModule} from "@ng-bootstrap/ng-bootstrap";



@NgModule({
  declarations: [
    TopicGroupCreatorComponent,
    TopicGroupBlockCreatorComponent,
    StartingJokeTopicBlockComponent,
    ConnectedJokeTopicBlockComponent,
    ConnectedJokeTopicRowComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CategorizationModule,
    TopicModule,
    NgMultiSelectDropDownModule,
    FontAwesomeModule,
    NgbDropdownModule
  ],
  exports: [
    TopicGroupCreatorComponent
  ]
})
export class TopicGroupModule { }
