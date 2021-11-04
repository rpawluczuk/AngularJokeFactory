import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TopicPagination} from './topicPagination';

@Component({
  selector: 'app-topic-pagination',
  templateUrl: './topic-pagination.component.html',
  styleUrls: ['./topic-pagination.component.css']
})
export class TopicPaginationComponent implements OnInit {

  @Input()
  topicPagination: TopicPagination;

  @Output()
  changedPagination: EventEmitter<TopicPagination> = new EventEmitter<TopicPagination>();

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
