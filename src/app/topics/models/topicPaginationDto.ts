export class TopicPaginationDto {
  totalItems: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;

  constructor() {
    this.currentPage = 0;
    this.pageSize = 20;
  }
}
