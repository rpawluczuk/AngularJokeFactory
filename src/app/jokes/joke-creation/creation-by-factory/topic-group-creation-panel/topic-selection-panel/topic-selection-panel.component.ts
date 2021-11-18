import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {TopicCreatorChildRowResponseDto} from '../../../../../topics/models/topicCreatorChildRowResponseDto';
import {TopicGroupCreatorDto} from '../../../../../topic-group/models/TopicGroupCreatorDto';
import {TopicService} from '../../../../../topics/topic.service';
import {TopicCreatorChildDto} from '../../../../../topics/models/topicCreatorChildDto';
import {TopicItemDto} from '../../../../../topics/models/topicItemDto';
import {TopicCreatorChildRowRequestDto} from '../../../../../topics/models/topicCreatorChildRowRequestDto';
import {TopicPaginationDto} from '../../../../../topics/models/topicPaginationDto';

@Component({
  selector: 'app-topic-selection-panel',
  templateUrl: './topic-selection-panel.component.html',
  styleUrls: ['./topic-selection-panel.component.css']
})
export class TopicSelectionPanelComponent implements OnChanges {

  @Input()
  topicGroupCreator: TopicGroupCreatorDto;

  topicCreatorChildRowAndPageList: TopicCreatorChildRowResponseDto[] = [];

  constructor(private topicService: TopicService) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.topicGroupCreator?.currentValue) {
      const connectingCategory = this.topicGroupCreator?.categorizationCreator?.connectingCategory;
      this.topicCreatorChildRowAndPageList = [];
      if (connectingCategory !== null) {
        const topicCreatorChildRowRequest = new TopicCreatorChildRowRequestDto(connectingCategory.id, new TopicPaginationDto());
        this.topicService.getTopicCreatorChildPage(topicCreatorChildRowRequest)
          .subscribe(topicCreatorChildRowAndPage => {
            this.topicCreatorChildRowAndPageList.push(topicCreatorChildRowAndPage);
          });
      } else {
        const topicCreatorChildRowRequest = new TopicCreatorChildRowRequestDto(null, new TopicPaginationDto());
        this.topicService.getTopicCreatorChildPage(topicCreatorChildRowRequest)
          .subscribe(topicCreatorChildRowAndPage => {
            this.topicCreatorChildRowAndPageList.push(topicCreatorChildRowAndPage);
          });
      }
    }
  }

  onShowChildrenOfChildRequest(topicCreatorChild: TopicCreatorChildDto) {
    const topicCreatorChildRowRequest = new TopicCreatorChildRowRequestDto(topicCreatorChild.id, new TopicPaginationDto());
    this.topicService.getTopicCreatorChildPage(topicCreatorChildRowRequest)
      .subscribe(topicCreatorChildRowAndPage => {
        this.topicCreatorChildRowAndPageList.push(topicCreatorChildRowAndPage);
      });
  }

  onRemoveSomeRowsRequest(branchIndex: number) {
    if (branchIndex + 1 < this.topicCreatorChildRowAndPageList.length) {
      this.topicCreatorChildRowAndPageList.splice(branchIndex + 1);
    }
  }

  onSetAsConnectingTopicRequest(topicCreatorChildDto: TopicCreatorChildDto) {
    const connectingTopic = new TopicItemDto();
    connectingTopic.id = topicCreatorChildDto.id;
    connectingTopic.text = topicCreatorChildDto.name;
    this.topicGroupCreator.connectingTopicItem = connectingTopic;
  }

  onSetAsOstensibleTopicRequest(topicCreatorChildDto: TopicCreatorChildDto) {
    const ostensibleTopic = new TopicItemDto();
    ostensibleTopic.id = topicCreatorChildDto.id;
    ostensibleTopic.text = topicCreatorChildDto.name;
    this.topicGroupCreator.ostensibleTopicItem = ostensibleTopic;
  }

  onSetAsComedyTopicRequest(topicCreatorChildDto: TopicCreatorChildDto) {
    const comedyTopic = new TopicItemDto();
    comedyTopic.id = topicCreatorChildDto.id;
    comedyTopic.text = topicCreatorChildDto.name;
    this.topicGroupCreator.comedyTopicItem = comedyTopic;
  }
}
