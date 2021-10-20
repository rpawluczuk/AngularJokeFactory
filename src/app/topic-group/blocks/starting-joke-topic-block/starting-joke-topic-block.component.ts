import {Component, Input, OnInit} from '@angular/core';
import {TopicCreatorDto} from '../../../topics/models/topicCreatorDto';

@Component({
  selector: 'app-connecting-category-block',
  templateUrl: './starting-joke-topic-block.component.html',
  styleUrls: ['./starting-joke-topic-block.component.css']
})
export class StartingJokeTopicBlockComponent implements OnInit {
  @Input() topicCreator: TopicCreatorDto;

  constructor() { }

  ngOnInit(): void {
  }

}
