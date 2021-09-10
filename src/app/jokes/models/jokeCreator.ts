import {Author} from '../../authors/models/author';
import {Origin} from '../../origins/models/origin';
import {JokeBlocksWithStructureDto} from '../../blocks/joke-blocks/models/joke-blocks-wtih-structure-dto';

export interface JokeCreator {
  id: number;
  jokeBlocksWithStructureDtoList: JokeBlocksWithStructureDto[];
  author: Author;
  origin: Origin;
  comedyOrigin: Origin;
  ostensibleOrigin: Origin;
  title: string;
  content: string;
  lastUpdated: string;
  dateCreated: string;
}
