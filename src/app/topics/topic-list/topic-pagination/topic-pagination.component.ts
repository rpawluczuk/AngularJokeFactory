import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TopicPagination} from './topicPagination';

@Component({
  selector: 'app-topic-pagination',
  templateUrl: './topic-pagination.component.html',
  styleUrls: ['./topic-pagination.component.css']
})
export class TopicPaginationComponent implements OnInit {
  @Input() pagination: TopicPagination;
  @Output() changedPagination: EventEmitter<TopicPagination> = new EventEmitter<TopicPagination>();

  previousPage: any;

  constructor() {
  }

  ngOnInit(): void {
  }

  loadPage(page: number) {
    if (page !== this.previousPage) {
      this.previousPage = this.pagination.currentPage;
      this.pagination.currentPage = page;
      this.pagination.currentPage -= 1;   // difference between backend and fronted
      this.changedPagination.emit(this.pagination);
    }
  }

  updatePageSize(pageSize: number) {
    this.pagination.pageSize = pageSize;
    this.pagination.currentPage = 0;
    this.changedPagination.emit(this.pagination);
  }
}
