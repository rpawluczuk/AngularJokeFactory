import {Component, OnInit} from '@angular/core';
import {TopicService} from '../topic.service';
import {Router} from '@angular/router';
import {TopicPresenterDto} from '../models/topicPresenterDto';
import {TopicPagination} from './topic-pagination/topicPagination';

@Component({
  selector: 'app-topic-list',
  templateUrl: './topic-list.component.html',
  styleUrls: ['./topic-list.component.css']
})
export class TopicListComponent implements OnInit {

  topicPagination: TopicPagination = new TopicPagination();

  topicPresenterList: TopicPresenterDto[];
  searchingPhrase: string;

  constructor(private topicService: TopicService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.searchingPhrase = '';
    this.loadTopicPresenterList();
  }

  private loadTopicPresenterList() {
    if (this.searchingPhrase.length === 0){
      this.topicService.getTopicPresenterList().subscribe(topicPresenterList => {
        this.topicPresenterList = topicPresenterList;
        this.loadPagination();
      });
    } else {
      this.topicService.getTopicPresenterListByName(this.searchingPhrase).subscribe(topicPresenterList => {
        this.topicPresenterList = topicPresenterList;
        this.loadPagination();
      });
    }
  }

  loadPagination(): void {
    this.topicService.getTopicPagination()
      .subscribe(pagination => {
        this.topicPagination = pagination;
        this.topicPagination.currentPage += 1;   // difference between backend and fronted
      });
  }

  updatePagination() {
    this.topicService.updateTopicPagination(this.topicPagination)
      .subscribe(() => this.loadTopicPresenterList());
  }

  removeTopic(topicPresenter: TopicPresenterDto, event) {
    event.stopPropagation();
    this.topicService.removeTopic(topicPresenter.id).subscribe(() => {
      this.loadTopicPresenterList();
    });
  }

  goToTopicEdition(topicPresenter: TopicPresenterDto) {
    this.router.navigate(['/topics', topicPresenter.id]);
  }

  onSearchRequest(searchingPhrase: string) {
    this.searchingPhrase = searchingPhrase;
    this.loadTopicPresenterList();
  }

  onUpdatePaginationRequest(topicPagination: TopicPagination) {
    this.topicPagination = topicPagination;
    this.updatePagination();
  }
}
