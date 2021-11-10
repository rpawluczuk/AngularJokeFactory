import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TopicPaginationDto} from '../../models/topicPaginationDto';

@Component({
  selector: 'app-topic-pagination',
  templateUrl: './topic-pagination.component.html',
  styleUrls: ['./topic-pagination.component.css']
})
export class TopicPaginationComponent implements OnInit {

  @Input()
  topicPagination: TopicPaginationDto;

  @Output()
  changedPagination: EventEmitter<TopicPaginationDto> = new EventEmitter<TopicPaginationDto>();

  previousPage: any;

  constructor() {
  }

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