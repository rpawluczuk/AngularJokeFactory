import {TopicCreatorChildDto} from './topicCreatorChildDto';

export class TopicCreatorChildRowAndPageDto {

  parentId: number;
  topicCreatorChildList: TopicCreatorChildDto[] = [];
  totalItems: number;
  totalPages: number;
}
