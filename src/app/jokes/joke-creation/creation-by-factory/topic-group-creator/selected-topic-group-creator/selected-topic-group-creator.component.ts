import {Component, Input, OnInit} from '@angular/core';
import {TopicGroupCreatorDto} from '../../../../../topic-group/models/TopicGroupCreatorDto';
import {faLongArrowAltRight} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-selected-topic-group-creator',
  templateUrl: './selected-topic-group-creator.component.html',
  styleUrls: ['./selected-topic-group-creator.component.css']
})
export class SelectedTopicGroupCreatorComponent implements OnInit {

  @Input()
  selectedTopicGroupCreator: TopicGroupCreatorDto;

  faLongArrowAltRight = faLongArrowAltRight;

  constructor() { }

  ngOnInit(): void {
  }

}
