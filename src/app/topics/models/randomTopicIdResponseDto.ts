import {TopicCreatorChildDto} from './topicCreatorChildDto';

export class RandomTopicIdResponseDto {

  randomTopicId: number;
  randomPage: number;
  topicCreatorChildList: TopicCreatorChildDto[] = [];
}
