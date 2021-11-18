import {TopicPaginationDto} from './topicPaginationDto';

export class TopicCreatorChildRowRequestDto {

  parentId: number;
  topicPagination: TopicPaginationDto;

  constructor(parentId: number, page: TopicPaginationDto) {
    this.parentId = parentId;
    this.topicPagination = page;
  }
}
