import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {CategorizationModule} from '../categorization/categorization.module';
import {TopicModule} from '../topics/topic.module';
import {NgMultiSelectDropDownModule} from 'ng-multiselect-dropdown';
import {TopicGroupBlockCreatorComponent} from './blocks/topic-group-block-creator/topic-group-block-creator.component';
import {StartingJokeTopicBlockComponent} from './blocks/starting-joke-topic-block/starting-joke-topic-block.component';
import {ConnectedJokeTopicBlockComponent} from './blocks/connected-joke-topic-block/connected-joke-topic-block.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {NgbDropdownModule} from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    TopicGroupBlockCreatorComponent,
    StartingJokeTopicBlockComponent,
    ConnectedJokeTopicBlockComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CategorizationModule,
    TopicModule,
    NgMultiSelectDropDownModule,
    FontAwesomeModule,
    NgbDropdownModule,
  ],
  exports: [
    TopicGroupBlockCreatorComponent,
    StartingJokeTopicBlockComponent,
    ConnectedJokeTopicBlockComponent
  ]
})
export class TopicGroupModule { }
