import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {faWindowClose, faSortAmountUpAlt, faGripHorizontal} from '@fortawesome/free-solid-svg-icons';
import {TopicCreatorChildDto} from '../../../models/topicCreatorChildDto';


@Component({
  selector: 'app-connected-topic-block',
  templateUrl: './connected-topic-block.component.html',
  styleUrls: ['./connected-topic-block.component.css']
})
export class ConnectedTopicBlockComponent implements OnInit {
  @Input() topicCreatorChild: TopicCreatorChildDto;
  @Input() chosenTopicCreatorChildId: number;
  @Output() removeTopicRelationRequest: EventEmitter<TopicCreatorChildDto> = new EventEmitter<TopicCreatorChildDto>();
  @Output() setAsMainRequest: EventEmitter<TopicCreatorChildDto> = new EventEmitter<TopicCreatorChildDto>();
  @Output() showChildrenOfChildRequest: EventEmitter<TopicCreatorChildDto> = new EventEmitter<TopicCreatorChildDto>();

  faWindowClose = faWindowClose;
  faSortAmountUpAlt = faSortAmountUpAlt;
  faGripHorizontal = faGripHorizontal;

  constructor() {
  }

  ngOnInit(): void {
  }

  deleteConnectionRequest() {
    this.removeTopicRelationRequest.emit(this.topicCreatorChild);
  }

  onSetAsMainRequest() {
    this.setAsMainRequest.emit(this.topicCreatorChild);
  }

  onShowChildrenOfChildRequest() {
    this.showChildrenOfChildRequest.emit(this.topicCreatorChild);
  }
}
