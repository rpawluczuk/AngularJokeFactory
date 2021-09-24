import {JokeBlockDto} from './joke-block-dto';
import {StructureItemDto} from '../../../structures/models/StructureItemDto';

export class JokeBlocksWithStructureDto {

  structureItemDto: StructureItemDto = new StructureItemDto();
  jokeBlocksDto: JokeBlockDto[] = [];

}
