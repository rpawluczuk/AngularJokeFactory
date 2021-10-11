import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TopicCreatorDto} from '../../../models/topicCreatorDto';


@Component({
  selector: 'app-topic-block',
  templateUrl: './topic-block.component.html',
  styleUrls: ['./topic-block.component.css']
})
export class TopicBlockComponent implements OnInit {
  @Input() topicCreator: TopicCreatorDto;
  @Output() isTopicEditionDemanded: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  onEdit() {
    this.isTopicEditionDemanded.emit(true);
  }
}
