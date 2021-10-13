import {TopicItemDto} from '../../topics/models/topicItemDto';

export class CategorizationCreatorDto {

  id: number;
  name: string;
  baseCategory: TopicItemDto;
  questions: string;
  linkedCategory: TopicItemDto;
}
