import {TopicItemDto} from '../../topics/models/topicItemDto';
import {CategorizationCreatorDto} from '../../categorization/models/CategorizationCreatorDto';

export class TopicGroupCreatorDto {

  id: number;
  categorizationCreator: CategorizationCreatorDto;
  connectingTopicItem: TopicItemDto;
  comedyTopicItem: TopicItemDto;
  ostensibleTopicItem: TopicItemDto;

  constructor(categorizationCreator: CategorizationCreatorDto) {
    this.categorizationCreator = categorizationCreator;
  }
}
