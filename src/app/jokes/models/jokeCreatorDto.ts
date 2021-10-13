import {Author} from '../../authors/models/author';
import {TopicItemDto} from '../../topics/models/topicItemDto';
import {StructureItemDto} from '../../structures/models/structureItemDto';
import {JokeBlockCreatorDto} from '../../blocks/joke-blocks/models/jokeBlockCreatorDto';

export class JokeCreatorDto {
  id: number;
  jokeBlockCreatorDtoList: JokeBlockCreatorDto[] = [];
  structureItemList: StructureItemDto[];
  author: Author;
  connectingTopic: TopicItemDto;
  comedyTopic: TopicItemDto;
  ostensibleTopic: TopicItemDto;
  title: string;
  content: string;
  dateCreated: string;
}