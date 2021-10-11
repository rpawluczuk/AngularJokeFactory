import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TopicCreatorChildDto} from '../../models/topicCreatorChildDto';
import {faPlus} from '@fortawesome/free-solid-svg-icons';
import {TopicCreatorChildrenWithParentId} from '../../models/topicCreatorChildrenWithParentId';
import {TopicService} from '../../topic.service';

@Component({
  selector: 'app-topic-child-creator-branch',
  templateUrl: './topic-child-creator-row.component.html',
  styleUrls: ['./topic-child-creator-row.component.css']
})
export class TopicChildCreatorRowComponent implements OnInit {
  @Input() topicCreatorChildrenWithParent: TopicCreatorChildrenWithParentId;
  @Input() index: number;
  @Output() setAsMainRequest: EventEmitter<TopicCreatorChildDto> = new EventEmitter<TopicCreatorChildDto>();
  @Output() showChildrenOfChildRequest: EventEmitter<TopicCreatorChildDto> = new EventEmitter<TopicCreatorChildDto>();
  @Output() handleBranchIndex: EventEmitter<number> = new EventEmitter<number>();

  isChildTopicCreationDemanded = false;
  chosenTopicCreatorChildId: number;
  faPlus = faPlus;

  constructor(private topicService: TopicService) {
  }

  ngOnInit(): void {
  }

  onRemoveTopicRelationRequest(topicCreatorChild: TopicCreatorChildDto) {
    this.topicService.removeTopicRelation(topicCreatorChild.parentId, topicCreatorChild?.id).subscribe(() => {
      this.reloadTopicCreatorChildren();
    });
  }

  onSetAsMainRequest(topicCreatorChildDto: TopicCreatorChildDto) {
    this.setAsMainRequest.emit(topicCreatorChildDto);
  }

  onshowChildrenOfChildRequest(topicCreatorChildDto: TopicCreatorChildDto) {
    this.chosenTopicCreatorChildId = topicCreatorChildDto.id;
    this.handleBranchIndex.emit(this.index);
    this.showChildrenOfChildRequest.emit(topicCreatorChildDto);
  }

  onAddChildTopicDemand() {
    this.isChildTopicCreationDemanded = true;
  }

  onChildTopicCreationRequest(isChildTopicCreationDemanded: boolean) {
    this.isChildTopicCreationDemanded = isChildTopicCreationDemanded;
    this.reloadTopicCreatorChildren();
  }

  reloadTopicCreatorChildren(){
    this.topicService.getTopicCreatorChildList(this.topicCreatorChildrenWithParent.parentId).subscribe(topicCreatorChildren => {
      this.topicCreatorChildrenWithParent.topicCreatorChildren = topicCreatorChildren;
    });
  }
}
