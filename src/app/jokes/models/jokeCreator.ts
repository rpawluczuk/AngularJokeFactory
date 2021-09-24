import {Author} from '../../authors/models/author';
import {JokeBlocksWithStructureDto} from '../../blocks/joke-blocks/models/joke-blocks-wtih-structure-dto';
import {OriginItemDto} from '../../origins/models/originItemDto';
import {StructureItemDto} from '../../structures/models/StructureItemDto';

export class JokeCreator {
  id: number;
  jokeBlocksWithStructureDtoList: JokeBlocksWithStructureDto[] = [];
  structureItemList: StructureItemDto[];
  author: Author;
  origin: OriginItemDto;
  comedyOrigin: OriginItemDto;
  ostensibleOrigin: OriginItemDto;
  title: string;
  content: string;
  lastUpdated: string;
  dateCreated: string;
}
