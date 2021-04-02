export class Pagination {
  totalItems: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;

  constructor() {
    this.currentPage = 0;
    this.pageSize = 5;
  }
}
