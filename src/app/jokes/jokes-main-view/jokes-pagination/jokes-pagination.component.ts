import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Pagination} from '../../../utils/pagination';

@Component({
  selector: 'app-jokes-pagination',
  templateUrl: './jokes-pagination.component.html',
  styleUrls: ['./jokes-pagination.component.css']
})
export class JokesPaginationComponent implements OnInit {
  @Input() pagination: Pagination;
  @Output() changedPagination: EventEmitter<Pagination> = new EventEmitter<Pagination>();

  previousPage: any;

  constructor() {
  }

  ngOnInit(): void {}

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
