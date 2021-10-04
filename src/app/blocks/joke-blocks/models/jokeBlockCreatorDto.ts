import {StructureBlockPresenterDto} from '../../structure-blocks/models/structureBlockPresenterDto';

export class JokeBlockCreatorDto {

  id: number;
  jokeSnippet: string;
  structureBlockPresenterDto: StructureBlockPresenterDto;
  position: number;
  structureId: number;
}

