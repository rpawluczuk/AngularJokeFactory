
export class RandomTopicIdRequestDto {

  parentId: number;
  pageSize: number;
  totalPages: number;

  constructor(randomTopicId: number, pageSize: number, totalPages: number) {
    this.parentId = randomTopicId;
    this.pageSize = pageSize;
    this.totalPages = totalPages;
  }
}
