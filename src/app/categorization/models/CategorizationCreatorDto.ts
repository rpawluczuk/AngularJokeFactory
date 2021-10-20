import {TopicCreatorDto} from '../../topics/models/topicCreatorDto';

export class CategorizationCreatorDto {

  id: number;
  name: string;
  connectingCategory: TopicCreatorDto;
  questions: string;
  ostensibleCategory: TopicCreatorDto;
  comedyCategory: TopicCreatorDto;
}
