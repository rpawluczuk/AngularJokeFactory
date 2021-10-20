import {TopicItemDto} from '../../topics/models/topicItemDto';
import {CategorizationCreatorDto} from '../../categorization/models/CategorizationCreatorDto';

export class TopicGroupCreatorDto {

  id: number;
  categorization: CategorizationCreatorDto;
  connectingTopic: TopicItemDto;
  comedyTopic: TopicItemDto;
  ostensibleTopic: TopicItemDto;

  constructor(categorizationCreator: CategorizationCreatorDto) {
    this.categorization = categorizationCreator;
  }
}
