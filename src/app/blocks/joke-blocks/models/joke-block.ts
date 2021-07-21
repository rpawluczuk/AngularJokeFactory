import {Block} from '../../models/block';
import {StructureBlock} from '../../structure-blocks/models/structure-block';
import {BlockType} from '../../models/block-type';
import {Joke} from '../../../jokes/models/joke';

export class JokeBlock extends Block {

  jokeSnippet: string = null;
  structureBlock: StructureBlock = null;
  joke: Joke = null;

  constructor(structureBlock: StructureBlock) {
    super();
    this.blockType = BlockType.JOKE_BLOCK;
    this.structureBlock = structureBlock;
  }
}
