import {Author} from '../../authors/models/author';
import {OriginItemDto} from '../../origins/models/originItemDto';
import {StructureItemDto} from '../../structures/models/structureItemDto';
import {JokeBlockCreatorDto} from '../../blocks/joke-blocks/models/jokeBlockCreatorDto';

export class JokeCreator {
  id: number;
  jokeBlockCreatorDtoList: JokeBlockCreatorDto[] = [];
  structureItemList: StructureItemDto[];
  author: Author;
  origin: OriginItemDto;
  comedyOrigin: OriginItemDto;
  ostensibleOrigin: OriginItemDto;
  title: string;
  content: string;
  dateCreated: string;
}
