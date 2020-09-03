import {Structure} from '../../structures/models/Structure';

export interface Joke {
  id: number;
  structure: Structure;
  title: string;
  content: string;
  lastUpdated: string;
  dateCreated: string;
}
