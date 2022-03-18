import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TopicPresenterDto} from '../../models/topicPresenterDto';
import {Router} from '@angular/router';
import {TopicService} from '../../topic.service';

@Component({
  selector: 'app-single-topic',
  templateUrl: './single-topic.component.html',
  styleUrls: ['./single-topic.component.css']
})
export class SingleTopicComponent implements OnInit {

  @Input()
  topicPresenter: TopicPresenterDto;

  @Output()
  loadTopicPresenterList: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private router: Router,
              private topicService: TopicService) {
  }

  ngOnInit(): void {
    console.log(this?.topicPresenter);
  }

  removeTopic(topicPresenter: TopicPresenterDto, event) {
    event.stopPropagation();
    this.topicService.removeTopic(topicPresenter.id).subscribe(() => {
      this.loadTopicPresenterList.emit(true);
    });
  }

  goToTopicEdition(topicPresenter: TopicPresenterDto) {
    this.router.navigate(['/topics', topicPresenter.id]);
  }

  goToQuestionManagement(topicPresenter: TopicPresenterDto) {
    this.router.navigate(['/topics', topicPresenter.id, 'questions']);
  }

  changeCategoryStatus() {
    this.topicService.changeCategoryStatus(this.topicPresenter.id).subscribe(() => {
      this.topicPresenter.category = !this.topicPresenter.category;
    });
  }
}
