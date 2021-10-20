import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TopicCreatorChildDto} from '../../../topics/models/topicCreatorChildDto';
import {faWindowClose, faCrosshairs, faGripHorizontal} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-connected-joke-topic-block',
  templateUrl: './connected-joke-topic-block.component.html',
  styleUrls: ['./connected-joke-topic-block.component.css']
})
export class ConnectedJokeTopicBlockComponent implements OnInit {
  @Input() topicCreatorChild: TopicCreatorChildDto;
  @Input() chosenTopicCreatorChildId: number;
  @Output() showChildrenOfChildRequest: EventEmitter<TopicCreatorChildDto> = new EventEmitter<TopicCreatorChildDto>();
  @Output() setAsConnectingTopicRequest: EventEmitter<TopicCreatorChildDto> = new EventEmitter<TopicCreatorChildDto>();
  @Output() setAsOstensibleTopicRequest: EventEmitter<TopicCreatorChildDto> = new EventEmitter<TopicCreatorChildDto>();
  @Output() setAsComedyTopicRequest: EventEmitter<TopicCreatorChildDto> = new EventEmitter<TopicCreatorChildDto>();

  faWindowClose = faWindowClose;
  faGripHorizontal = faGripHorizontal;
  faCrosshairs = faCrosshairs;

  constructor() { }

  ngOnInit(): void {
  }

  onShowChildrenOfChildRequest() {
    this.showChildrenOfChildRequest.emit(this.topicCreatorChild);
  }

  deleteConnectionRequest() {

  }

  onSetAsConnectingTopicRequest() {
    this.setAsConnectingTopicRequest.emit(this.topicCreatorChild);
  }

  onSetAsOstensibleTopicRequest() {
    this.setAsOstensibleTopicRequest.emit(this.topicCreatorChild);
  }

  onSetAsComedyTopicRequest() {
    this.setAsComedyTopicRequest.emit(this.topicCreatorChild);
  }
}
