import {Structure} from '../../structures/models/structure';
import {Author} from '../../authors/models/author';
import {Origin} from '../../origins/models/origin';
import {JokeBlockDto} from '../../blocks/joke-blocks/models/joke-block-dto';

export class Joke {
  id: number;
  structures: Structure[] = [];
  jokeBlocks: JokeBlockDto[];
  author: Author;
  origin: Origin;
  comedyOrigin: Origin;
  ostensibleOrigin: Origin;
  title: string;
  content: string;
  lastUpdated: string;
  dateCreated: string;
}
