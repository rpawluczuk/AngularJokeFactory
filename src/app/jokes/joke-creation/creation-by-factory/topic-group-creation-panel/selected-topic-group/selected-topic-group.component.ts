import {Component, Input, OnInit} from '@angular/core';
import {TopicGroupCreatorDto} from '../../../../../topic-group/models/TopicGroupCreatorDto';
import {faLongArrowAltRight} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-selected-topic-group-creator',
  templateUrl: './selected-topic-group.component.html',
  styleUrls: ['./selected-topic-group.css']
})
export class SelectedTopicGroupComponent implements OnInit {

  @Input()
  selectedTopicGroupCreator: TopicGroupCreatorDto;

  faLongArrowAltRight = faLongArrowAltRight;

  constructor() { }

  ngOnInit(): void {
  }

}
