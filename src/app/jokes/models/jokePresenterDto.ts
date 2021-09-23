import {Structure} from '../../structures/models/structure';
import {JokeBlock} from '../../blocks/joke-blocks/models/joke-block';

export interface JokePresenterDto {
  id: number;
  title: string;
  content: string;
  structures: Structure[];
  jokeBlocks: JokeBlock[];
  author: string;
  connectingOrigin: string;
  comedyOrigin: string;
  ostensibleOrigin: string;
  lastUpdated: string;
  dateCreated: string;
}
