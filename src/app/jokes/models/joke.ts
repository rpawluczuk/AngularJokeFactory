import {Structure} from '../../structures/models/Structure';
import {Author} from '../../authors/models/author';

export interface Joke {
  id: number;
  structures: Structure[];
  author: Author;
  title: string;
  content: string;
  lastUpdated: string;
  dateCreated: string;
}
