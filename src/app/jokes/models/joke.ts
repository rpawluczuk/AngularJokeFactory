import {Structure} from '../../structures/models/structure';
import {Author} from '../../authors/models/author';
import {Origin} from '../../origins/models/origin';
import {JokeBlockCreatorDto} from '../../blocks/joke-blocks/models/jokeBlockCreatorDto';

export class Joke {
  id: number;
  structures: Structure[] = [];
  jokeBlocks: JokeBlockCreatorDto[];
  author: Author;
  origin: Origin;
  comedyOrigin: Origin;
  ostensibleOrigin: Origin;
  title: string;
  content: string;
  lastUpdated: string;
  dateCreated: string;
}
