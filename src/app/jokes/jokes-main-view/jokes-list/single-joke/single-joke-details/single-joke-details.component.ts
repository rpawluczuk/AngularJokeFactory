import {Component, Input, OnInit} from '@angular/core';
import {JokePresenterDto} from '../../../../models/jokePresenterDto';
import {TopicGroupService} from '../../../../../topic-group/topic-group.service';
import {TopicGroupPresenterDto} from '../../../../../topic-group/models/TopicGroupPresenterDto';
import {faLongArrowAltRight} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-single-joke-details',
  templateUrl: './single-joke-details.component.html',
  styleUrls: ['./single-joke-details.component.css']
})
export class SingleJokeDetailsComponent implements OnInit {
  @Input() jokePresenter: JokePresenterDto;

  topicGroupPresenterList: TopicGroupPresenterDto[];
  selectedTopicGroupPresenter: TopicGroupPresenterDto;
  faLongArrowAltRight = faLongArrowAltRight;

  constructor(private topicGroupService: TopicGroupService) {
  }

  ngOnInit(): void {
    this.loadTopicGroups();
  }

  loadTopicGroups(): void {
    this.topicGroupService.getTopicGroupPresenterList(this.jokePresenter?.id).subscribe(topicGroupPresenterList => {
      this.topicGroupPresenterList = topicGroupPresenterList;
    });
  }

  onTopicGroupClick(topicGroupPresenter: TopicGroupPresenterDto) {
    if (this.selectedTopicGroupPresenter === topicGroupPresenter) {
      this.selectedTopicGroupPresenter = null;
    } else {
      this.selectedTopicGroupPresenter = topicGroupPresenter;
    }
  }
}
