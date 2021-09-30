import {Author} from '../../authors/models/author';
import {OriginItemDto} from '../../origins/models/originItemDto';
import {StructureItemDto} from '../../structures/models/structureItemDto';
import {JokeBlockDto} from '../../blocks/joke-blocks/models/joke-block-dto';

export class JokeCreator {
  id: number;
  jokeBlockDtoList: JokeBlockDto[] = [];
  structureItemList: StructureItemDto[];
  author: Author;
  origin: OriginItemDto;
  comedyOrigin: OriginItemDto;
  ostensibleOrigin: OriginItemDto;
  title: string;
  content: string;
  dateCreated: string;
}
