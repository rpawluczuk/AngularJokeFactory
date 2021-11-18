import {TopicCreatorChildDto} from './topicCreatorChildDto';
import {TopicPaginationDto} from './topicPaginationDto';

export class TopicCreatorChildRowResponseDto {

  parentId: number;
  topicCreatorChildList: TopicCreatorChildDto[] = [];
  topicPagination: TopicPaginationDto;
}
