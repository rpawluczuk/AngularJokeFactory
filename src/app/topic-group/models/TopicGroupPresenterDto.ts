import {TopicItemDto} from '../../topics/models/topicItemDto';
import {CategorizationPresenterDto} from '../../categorization/models/CategorizationPresenterDto';

export class TopicGroupPresenterDto {

  id: number;
  categorizationPresenter: CategorizationPresenterDto;
  connectingTopicItem: TopicItemDto;
  comedyTopicItem: TopicItemDto;
  ostensibleTopicItem: TopicItemDto;

}
