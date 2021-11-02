import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TopicCreatorChildrenWithParentId} from '../../../../../topics/models/topicCreatorChildrenWithParentId';
import {TopicCreatorChildDto} from '../../../../../topics/models/topicCreatorChildDto';
import {faPlus} from '@fortawesome/free-solid-svg-icons';
import {TopicService} from "../../../../../topics/topic.service";

@Component({
  selector: 'app-connected-joke-topic-row',
  templateUrl: './connected-joke-topic-row.component.html',
  styleUrls: ['./connected-joke-topic-row.component.css']
})
export class ConnectedJokeTopicRowComponent implements OnInit {

  @Input()
  topicCreatorChildrenWithParent: TopicCreatorChildrenWithParentId;

  @Input()
  parentIndex: number;

  @Output()
  showChildrenOfChildRequest: EventEmitter<TopicCreatorChildDto> = new EventEmitter<TopicCreatorChildDto>();

  @Output()
  setAsConnectingTopicRequest: EventEmitter<TopicCreatorChildDto> = new EventEmitter<TopicCreatorChildDto>();

  @Output()
  setAsOstensibleTopicRequest: EventEmitter<TopicCreatorChildDto> = new EventEmitter<TopicCreatorChildDto>();

  @Output()
  setAsComedyTopicRequest: EventEmitter<TopicCreatorChildDto> = new EventEmitter<TopicCreatorChildDto>();

  @Output()
  removeSomeRowsRequest: EventEmitter<number> = new EventEmitter<number>();

  isChildTopicCreationDemanded = false;
  chosenTopicCreatorChildId: number;
  faPlus = faPlus;

  constructor(private topicService: TopicService) {
  }

  ngOnInit(): void {
  }

  onShowChildrenOfChildRequest(topicCreatorChildDto: TopicCreatorChildDto) {
    this.chosenTopicCreatorChildId = topicCreatorChildDto.id;
    this.removeSomeRowsRequest.emit(this.parentIndex);
    this.showChildrenOfChildRequest.emit(topicCreatorChildDto);
  }

  onShowTopicCreationFormRequest() {
    this.isChildTopicCreationDemanded = true;
  }

  onRemoveTopicRelationRequest(topicCreatorChild: TopicCreatorChildDto) {
    this.topicService.removeTopicRelation(topicCreatorChild.parentId, topicCreatorChild?.id).subscribe(() => {
      this.reloadChildrenOfTopicCreator();
    });
  }

  onChildTopicCreationRequest(isChildTopicCreationDemanded: boolean) {
    this.isChildTopicCreationDemanded = isChildTopicCreationDemanded;
    this.reloadChildrenOfTopicCreator();
  }

  reloadChildrenOfTopicCreator() {
    this.topicService.getTopicCreatorChildList(this.topicCreatorChildrenWithParent.parentId).subscribe(topicCreatorChildren => {
      this.topicCreatorChildrenWithParent.topicCreatorChildren = topicCreatorChildren;
    });
  }

  onSetAsConnectingTopicRequest(topicCreatorChildDto: TopicCreatorChildDto) {
    this.setAsConnectingTopicRequest.emit(topicCreatorChildDto);
  }

  onSetAsOstensibleTopicRequest(topicCreatorChildDto: TopicCreatorChildDto) {
    this.setAsOstensibleTopicRequest.emit(topicCreatorChildDto);
  }

  onSetAsComedyTopicRequest(topicCreatorChildDto: TopicCreatorChildDto) {
    this.setAsComedyTopicRequest.emit(topicCreatorChildDto);
  }
}
