
import {StructureBlock} from '../../structure-blocks/models/structure-block';
import {Joke} from '../../../jokes/models/joke';

export class JokeBlock {

  id: number = null;
  jokeSnippet: string = null;
  structureBlock: StructureBlock = null;
  joke: Joke = null;

  constructor(structureBlock: StructureBlock) {
    this.structureBlock = structureBlock;
  }
}
