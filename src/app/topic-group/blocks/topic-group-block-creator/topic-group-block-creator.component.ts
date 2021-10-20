import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-topic-group-block-creator',
  templateUrl: './topic-group-block-creator.component.html',
  styleUrls: ['./topic-group-block-creator.component.css']
})
export class TopicGroupBlockCreatorComponent implements OnInit {

  @Input()
  categoryName: string;

  @Input()
  blockName: string;

  @Input()
  topicName: string;

  constructor() {
  }

  ngOnInit(): void {
  }

}
