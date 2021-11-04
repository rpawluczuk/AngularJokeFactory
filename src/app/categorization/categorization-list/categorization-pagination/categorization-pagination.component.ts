import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CategorizationPagination} from './categorizationPagination';

@Component({
  selector: 'app-categorization-pagination',
  templateUrl: './categorization-pagination.component.html',
  styleUrls: ['./categorization-pagination.component.css']
})
export class CategorizationPaginationComponent implements OnInit {

  @Input()
  categorizationPagination: CategorizationPagination;

  @Output()
  changedPagination: EventEmitter<CategorizationPagination> = new EventEmitter<CategorizationPagination>();

  previousPage: any;

  constructor() { }

  ngOnInit(): void {
  }

  loadPage(page: number) {
    if (page !== this.previousPage) {
      this.previousPage = this.categorizationPagination.currentPage;
      this.categorizationPagination.currentPage = page;
      this.categorizationPagination.currentPage -= 1;   // difference between backend and fronted
      this.changedPagination.emit(this.categorizationPagination);
    }
  }

  updatePageSize(pageSize: number) {
    this.categorizationPagination.pageSize = pageSize;
    this.categorizationPagination.currentPage = 0;
    this.changedPagination.emit(this.categorizationPagination);
  }
}
