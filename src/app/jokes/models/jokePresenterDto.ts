import {Structure} from '../../structures/models/structure';
import {JokeBlock} from '../../blocks/joke-blocks/models/joke-block';

export interface JokePresenterDto {
  id: number;
  title: string;
  content: string;
  rate: number;
  structurePresenterList: Structure[];
  categorizationList: string[];
  jokeBlocks: JokeBlock[];
  author: string;
  connectingTopic: string;
  comedyTopic: string;
  ostensibleTopic: string;
  lastUpdated: string;
  dateCreated: string;
}