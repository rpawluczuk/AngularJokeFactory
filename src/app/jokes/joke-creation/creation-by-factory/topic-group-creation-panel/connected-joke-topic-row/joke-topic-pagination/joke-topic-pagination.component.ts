import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TopicPaginationDto} from '../../../../../../topics/models/topicPaginationDto';

@Component({
  selector: 'app-joke-topic-pagination',
  templateUrl: './joke-topic-pagination.component.html',
  styleUrls: ['./joke-topic-pagination.component.css']
})
export class JokeTopicPaginationComponent implements OnInit {

  @Input()
  topicPagination: TopicPaginationDto;

  @Output()
  changedPagination: EventEmitter<TopicPaginationDto> = new EventEmitter<TopicPaginationDto>();

  previousPage: any;

  constructor() { }

  ngOnInit(): void {
  }

  loadPage(page: number) {
    if (page !== this.previousPage) {
      this.previousPage = this.topicPagination.currentPage;
      this.topicPagination.currentPage = page;
      this.topicPagination.currentPage -= 1;   // difference between backend and fronted
      this.changedPagination.emit(this.topicPagination);
    }
  }

  updatePageSize(pageSize: number) {
    this.topicPagination.pageSize = pageSize;
    this.topicPagination.currentPage = 0;
    this.changedPagination.emit(this.topicPagination);
  }
}
