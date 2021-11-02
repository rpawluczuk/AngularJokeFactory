import { Component, OnInit } from '@angular/core';
import {Topic} from '../models/topic';
import {TopicService} from '../topic.service';
import {Router} from '@angular/router';
import {TopicPresenterDto} from '../models/topicPresenterDto';

@Component({
  selector: 'app-topic-list',
  templateUrl: './topic-list.component.html',
  styleUrls: ['./topic-list.component.css']
})
export class TopicListComponent implements OnInit {

  topicPresenterList: TopicPresenterDto[];

  constructor(private topicService: TopicService,
              private  router: Router) { }

  ngOnInit(): void {
    this.loadTopicPresenterList();
  }

  private loadTopicPresenterList() {
    this.topicService.getTopicPresenterList().subscribe(topicPresenterList => {
      this.topicPresenterList = topicPresenterList;
    });
  }

  removeTopic(topicPresenter: TopicPresenterDto, event){
    event.stopPropagation();
    this.topicService.removeTopic(topicPresenter.id).subscribe(() => {
      this.loadTopicPresenterList();
    });
  }

  goToTopicEdition(topicPresenter: TopicPresenterDto) {
    this.router.navigate(['/topics', topicPresenter.id]);
  }

  onSearchRequest(name: string) {
    this.topicService.getTopicPresenterListByName(name).subscribe(topicPresenterList => {
      this.topicPresenterList = topicPresenterList;
    });
  }
}
