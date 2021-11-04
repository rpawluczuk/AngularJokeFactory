import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {StructurePagination} from './structurePagination';

@Component({
  selector: 'app-structure-pagination',
  templateUrl: './structure-pagination.component.html',
  styleUrls: ['./structure-pagination.component.css']
})
export class StructurePaginationComponent implements OnInit {

  @Input()
  structurePagination: StructurePagination;

  @Output()
  changedPagination: EventEmitter<StructurePagination> = new EventEmitter<StructurePagination>();

  previousPage: any;

  constructor() { }

  ngOnInit(): void {
  }

  loadPage(page: number) {
    if (page !== this.previousPage) {
      this.previousPage = this.structurePagination.currentPage;
      this.structurePagination.currentPage = page;
      this.structurePagination.currentPage -= 1;   // difference between backend and fronted
      this.changedPagination.emit(this.structurePagination);
    }
  }

  updatePageSize(pageSize: number) {
    this.structurePagination.pageSize = pageSize;
    this.structurePagination.currentPage = 0;
    this.changedPagination.emit(this.structurePagination);
  }
}
