import {Structure} from '../../structures/models/Structure';
import {Author} from '../../authors/models/author';
import {Origin} from '../../origins/models/origin';

export interface Joke {
  id: number;
  structures: Structure[];
  author: Author;
  origin: Origin;
  title: string;
  content: string;
  lastUpdated: string;
  dateCreated: string;
}
