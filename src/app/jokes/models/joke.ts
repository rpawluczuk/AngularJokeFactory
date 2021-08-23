import {Structure} from '../../structures/models/structure';
import {Author} from '../../authors/models/author';
import {Origin} from '../../origins/models/origin';

export interface Joke {
  id: number;
  structures: Structure[];
  author: Author;
  origin: Origin;
  comedyOrigin: Origin;
  ostensibleOrigin: Origin;
  title: string;
  content: string;
  lastUpdated: string;
  dateCreated: string;
}
