export class Pagination {
  totalItems: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;

  constructor() {
    this.currentPage = 1;
    this.pageSize = 5;
  }
}
