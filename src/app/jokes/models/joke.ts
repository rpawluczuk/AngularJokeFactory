import {Structure} from '../../structures/models/structure';
import {Author} from '../../authors/models/author';
import {Topic} from '../../topics/models/topic';
import {JokeBlockCreatorDto} from '../../blocks/joke-blocks/models/jokeBlockCreatorDto';

export class Joke {
  id: number;
  structures: Structure[] = [];
  jokeBlocks: JokeBlockCreatorDto[];
  author: Author;
  connectingTopic: Topic;
  comedyTopic: Topic;
  ostensibleTopic: Topic;
  title: string;
  content: string;
  lastUpdated: string;
  dateCreated: string;
}
