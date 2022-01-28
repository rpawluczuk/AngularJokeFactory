import {Component, OnInit} from '@angular/core';
import {TopicService} from '../topic.service';
import {Router} from '@angular/router';
import {TopicPresenterDto} from '../models/topicPresenterDto';
import {TopicPaginationDto} from '../models/topicPaginationDto';

@Component({
  selector: 'app-topic-list',
  templateUrl: './topic-list.component.html',
  styleUrls: ['./topic-list.component.css']
})
export class TopicListComponent implements OnInit {

  topicPagination: TopicPaginationDto = new TopicPaginationDto();
  topicPresenterList: TopicPresenterDto[];
  searchingPhrase: string;

  constructor(private topicService: TopicService) {
  }

  ngOnInit(): void {
    this.searchingPhrase = '';
    this.loadTopicPresenterList();
  }

  loadTopicPresenterList() {
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

  onSearchRequest(searchingPhrase: string) {
    this.searchingPhrase = searchingPhrase;
    this.loadTopicPresenterList();
  }

  onUpdatePaginationRequest(topicPagination: TopicPaginationDto) {
    this.topicPagination = topicPagination;
    this.updatePagination();
  }
}
